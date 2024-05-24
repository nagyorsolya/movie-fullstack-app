import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import url from "url";
import { getFromApi, getFromCache } from "./controllers/movieControllers";
import { AppDataSource } from "./data-source";
import { Movie } from "./entity/Movie";
import { SearchTerm } from "./entity/SearchTerm";
import {
  isDateWithinRange,
  mapApiResultsToMovies,
  mapSearchTermToMovie,
} from "./utils";

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
    try {
      const result = await getFromApi(query.query as string, parseInt(page));
      const searchTermRepository = AppDataSource.getRepository(SearchTerm);

      const updatedSearchTerm = {
        total_pages: result.total_pages,
        page: parseInt(page),
        cacheHitCount: 0,
      };

      const movies = mapApiResultsToMovies(result.results);
      if (searchTerm) {
        await AppDataSource.createQueryBuilder()
          .delete()
          .from(Movie)
          .where("searchTermId = :id", { id: searchTerm.id })
          .execute();
        searchTerm.movies = mapSearchTermToMovie(searchTerm, movies);
        await searchTermRepository.save(searchTerm);
      } else {
        const newSearchTerm = searchTermRepository.create({
          ...updatedSearchTerm,
          keyword: query.query as string,
          lastSearch: new Date(),
        });
        const savedSearchTerm = await searchTermRepository.save(newSearchTerm);
        savedSearchTerm.movies = mapSearchTermToMovie(savedSearchTerm, movies);
        await searchTermRepository.save(savedSearchTerm);
      }

      res.status(200).json({
        results: result.results,
        fetchedFromCache: false,
        total_pages: result.total_pages,
      });
    } catch (error: any) {
      if ([401, 403].includes(error?.response?.status)) {
        res.status(error.response.status).json({
          message: "You are not allowed to view the requested resource.",
        });
      }
      if (error?.response?.status.startsWith(5)) {
        res.status(500).json({ message: "Failed to fetch." });
      }
      res.json({ message: "An unknown error occured." });
    }
  }
});
