import { Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { Movie } from "./entity/Movie";
import { SearchTerm } from "./entity/SearchTerm";
import { Movie as IMovie } from "./interfaces/Movie";

export const isDateWithinRange = (date: Date, range: number = 2 * 60 * 1000) =>
  Date.now() - new Date(date).getTime() <= range;

export const mapSearchTermToMovie = (
  searchTerm: SearchTerm,
  movies: Movie[]
) => {
  return movies.map((movie) => {
    movie.search_term = searchTerm;
    movie.searchTermId = searchTerm.id;
    return movie;
  });
};

export const mapApiResultsToMovies = (
  results: IMovie[],
  movieRepository: Repository<Movie>
) => {
  return results.map((resultMovie) => {
    const { title, release_date, poster_path } = resultMovie;
    const movie = movieRepository.create({
      title,
      release_date,
      poster_path,
    });
    return movie;
  });
};
