import { RootState } from './store';

export const getMovies = (state: RootState) => state.movies.movies;
export const getIsLoading = (state: RootState) => state.movies.isLoading;
export const getError = (state: RootState) => state.movies.error;
export const getIsFetchedFromCache = (state: RootState) => state.movies.fetchedFromCache;
export const getNumOfTotalPages = (state: RootState) => state.movies.total_pages;
