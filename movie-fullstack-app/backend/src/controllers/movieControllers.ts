import axios from "axios";
import dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { SearchTerm } from "../entity/SearchTerm";
import { ApiResult } from "../interfaces/ApiResult";

dotenv.config();

export const getFromCache = async (keyword: string, page: string) => {
  const searchTerm = await AppDataSource.createQueryBuilder()
    .select("searchTerm")
    .from(SearchTerm, "searchTerm")
    .where("searchTerm.keyword ILIKE :keyword", { keyword })
    .andWhere("searchTerm.page = :page", { page })
    .getOne();

  return searchTerm;
};

export const saveToCache = () => {};

export const getFromApi = async (
  searchTerm: string,
  page = 1
): Promise<ApiResult> => {
  const { data } = await axios.get(
    `${process.env.API_URL}?query=${searchTerm}&page=${page}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  );
  return data;
};
