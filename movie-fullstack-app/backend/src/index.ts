import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  res.send("init");
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on http://localhost:" + process.env.PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
