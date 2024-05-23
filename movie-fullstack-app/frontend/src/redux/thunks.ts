import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm: string) => {
	try {
		const response = await axios.get(
			// If I had time I would get the language from the browser, and make include adult configurable
			`${process.env.REACT_APP_API_URL}?query=${searchTerm}&include_adult=false&language=hu-HU`,
			{
				headers: {
					Accept: 'application/json',
					Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
				},
			}
		);
		return response.data;
	} catch (err: any) {
		return err.message;
	}
});
