import { Movie } from "./Movie";

export interface ApiResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
