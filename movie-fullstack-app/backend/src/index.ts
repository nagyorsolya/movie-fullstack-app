import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import url from "url";
import { getFromApi, getFromCache } from "./controllers/movieControllers";
import { AppDataSource } from "./data-source";
import { isDateWithinRange } from "./utils";

dotenv.config();

const app: Express = express();

// middlewares
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on http://localhost:" + process.env.PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

app.get("/movies", async (req: Request, res: Response) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const page = query?.page ? (query.page as string) : "1";
  const searchTerm = await getFromCache(query.query as string, page);

  if (searchTerm && isDateWithinRange(new Date(searchTerm.lastSearch))) {
    searchTerm.cacheHitCount += 1;
    await AppDataSource.manager.save(searchTerm);
    res.status(200).json({
      results: searchTerm.movies,
      fetchedFromCache: true,
      total_pages: searchTerm.total_pages,
    });
  } else {
    const result = await getFromApi(query.query as string, parseInt(page));
    console.log(result);
    res.status(200).json({
      results: result.results,
      fetchedFromCache: false,
      total_pages: result.total_pages,
    });
  }
});
