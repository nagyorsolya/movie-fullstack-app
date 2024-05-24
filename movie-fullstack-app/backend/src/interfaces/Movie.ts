export interface Movie {
  title: string;
  release_date: string;
  backdrop_path: string;
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  genre_ids: number[];
}
