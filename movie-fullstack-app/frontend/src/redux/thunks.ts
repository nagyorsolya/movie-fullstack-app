import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from './movieSlice';

export const fetchMovies = createAsyncThunk<
	{ results: Movie[]; total_pages: number; fetchedFromCache: boolean },
	{ searchTerm: string; page: number }
>('movies/fetchMovies', async ({ searchTerm, page }) => {
	const response = await axios.get(
		// If I had time I would get the language from the browser, and make include adult configurable
		`${process.env.REACT_APP_API_URL}?query=${searchTerm}&include_adult=false&language=hu-HU&page=${page}`
	);
	return response.data;
});
