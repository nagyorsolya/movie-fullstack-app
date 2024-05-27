import { DeepPartial, Repository } from "typeorm";
import { Movie } from "./entity/Movie";
import { SearchTerm } from "./entity/SearchTerm";
import { Movie as IMovie } from "./interfaces/Movie";
import {
  isDateWithinRange,
  mapApiResultsToMovies,
  mapSearchTermToMovie,
} from "./utils";

describe("isDateWithinRange", () => {
  const now = Date.now();

  beforeAll(() => {
    jest.spyOn(Date, "now").mockImplementation(() => now);
  });

  afterAll(() => {
    jest.spyOn(Date, "now").mockRestore();
  });

  it("should return true if the date is within the default range", () => {
    const dateWithinRange = new Date(now - 1 * 60 * 1000);
    expect(isDateWithinRange(dateWithinRange)).toBe(true);
  });

  it("should return false if the date is outside the default range", () => {
    const dateOutsideRange = new Date(now - 5 * 60 * 1000);
    expect(isDateWithinRange(dateOutsideRange)).toBe(false);
  });

  it("should return true if the date is within a custom range", () => {
    const customRange = 10 * 60 * 1000;
    const dateWithinCustomRange = new Date(now - 9 * 60 * 1000);
    expect(isDateWithinRange(dateWithinCustomRange, customRange)).toBe(true);
  });

  it("should return false if the date is outside a custom range", () => {
    const customRange = 10 * 60 * 1000;
    const dateOutsideCustomRange = new Date(now - 11 * 60 * 1000);
    expect(isDateWithinRange(dateOutsideCustomRange, customRange)).toBe(false);
  });
});

describe("mapSearchTermToMovie", () => {
  it("should correctly map the searchTerm properties to each movie", () => {
    const emptySearchTerm = {
      id: 0,
      keyword: "",
      lastSearch: new Date(),
      movies: [],
      cacheHitCount: 0,
      total_pages: 0,
      page: 0,
    };

    const searchTerm: SearchTerm = {
      id: 1,
      keyword: "test",
      lastSearch: new Date(),
      movies: [],
      cacheHitCount: 0,
      total_pages: 1,
      page: 1,
    };

    const movies: Movie[] = [
      {
        id: "movie1",
        title: "Movie 1",
        release_date: "2021-01-01",
        poster_path: "path/to/poster1",
        search_term: emptySearchTerm,
        searchTermId: 0,
      },
      {
        id: "movie2",
        title: "Movie 2",
        release_date: "2021-01-02",
        poster_path: "path/to/poster2",
        search_term: emptySearchTerm,
        searchTermId: 0,
      },
    ];

    const result = mapSearchTermToMovie(searchTerm, movies);

    expect(result).toEqual([
      {
        id: "movie1",
        title: "Movie 1",
        release_date: "2021-01-01",
        poster_path: "path/to/poster1",
        search_term: searchTerm,
        searchTermId: searchTerm.id,
      },
      {
        id: "movie2",
        title: "Movie 2",
        release_date: "2021-01-02",
        poster_path: "path/to/poster2",
        search_term: searchTerm,
        searchTermId: searchTerm.id,
      },
    ]);
  });
});

describe("mapApiResultsToMovies", () => {
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(() => {
    movieRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<Repository<Movie>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly map API results to Movie entities", () => {
    const apiResults: IMovie[] = [
      {
        title: "Movie 1",
        release_date: "2021-01-01",
        backdrop_path: "path/to/backdrop1",
        id: "id1",
        original_language: "en",
        original_title: "Original Movie 1",
        overview: "Overview 1",
        popularity: 1,
        poster_path: "path/to/poster1",
        video: false,
        vote_average: 8.0,
        vote_count: 100,
        adult: false,
        genre_ids: [1, 2],
      },
      {
        title: "Movie 2",
        release_date: "2021-02-01",
        backdrop_path: "path/to/backdrop2",
        id: "id2",
        original_language: "en",
        original_title: "Original Movie 2",
        overview: "Overview 2",
        popularity: 2,
        poster_path: "path/to/poster2",
        video: false,
        vote_average: 7.0,
        vote_count: 200,
        adult: false,
        genre_ids: [3, 4],
      },
    ];

    const expectedMovies = [
      {
        title: "Movie 1",
        release_date: "2021-01-01",
        poster_path: "path/to/poster1",
      },
      {
        title: "Movie 2",
        release_date: "2021-02-01",
        poster_path: "path/to/poster2",
      },
    ];

    movieRepository.create.mockImplementation(
      (movie: DeepPartial<Movie>) => movie as Movie
    );

    const result = mapApiResultsToMovies(apiResults, movieRepository);

    expect(result).toEqual(expectedMovies);
    expect(movieRepository.create).toHaveBeenCalledTimes(apiResults.length);
    expect(movieRepository.create).toHaveBeenCalledWith(expectedMovies[0]);
    expect(movieRepository.create).toHaveBeenCalledWith(expectedMovies[1]);
  });
});
