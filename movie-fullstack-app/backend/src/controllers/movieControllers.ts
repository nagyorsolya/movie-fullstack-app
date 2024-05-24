import { AppDataSource } from "../data-source";
import { SearchTerm } from "../entity/SearchTerm";

export const getFromCache = async (keyword: string) => {
  const searchTerm = await AppDataSource.createQueryBuilder()
    .select("searchTerm")
    .from(SearchTerm, "searchTerm")
    .where("searchTerm.keyword ILIKE :keyword", { keyword })
    .getOne();

  return searchTerm;
};

export const saveToCache = () => {};

export const getFromApi = () => {};
