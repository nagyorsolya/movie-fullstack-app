import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './thunks';

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
}

interface MoviesState {
	movies: Movie[];
	error: string;
	isLoading: boolean;
	fetchedFromCache: boolean;
	total_pages: number;
}

const initialState: MoviesState = {
	movies: [],
	error: '',
	isLoading: false,
	fetchedFromCache: false,
	total_pages: 0,
};

export const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchMovies.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.movies = action.payload.results;
				state.fetchedFromCache = action.payload.fetchedFromCache;
				state.total_pages = action.payload.total_pages;
				state.isLoading = false;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.error = action.error.message || 'There was a problem fetching movies';
				state.isLoading = false;
			});
	},
});

export default moviesSlice.reducer;
