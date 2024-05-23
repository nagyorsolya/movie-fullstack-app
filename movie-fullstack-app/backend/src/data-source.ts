import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: process.env.DB_PW,
  database: "moviesdatabase",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
  migrations: [],
  subscribers: [],
});
