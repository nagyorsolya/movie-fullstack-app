import { Box, Button, Grid, Pagination, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Info from './components/info/Info';
import MoviePoster from './components/movie-poster/MoviePoster';
import SearchField from './components/search/SearchField';
import { getError, getIsFetchedFromCache, getIsLoading, getMovies, getNumOfTotalPages } from './redux/selectors';
import { AppDispatch } from './redux/store';
import { fetchMovies } from './redux/thunks';

function App() {
	const dispatch = useDispatch<AppDispatch>();

	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);

	const movies = useSelector(getMovies);
	const isLoading = useSelector(getIsLoading);
	const error = useSelector(getError);
	const fetchedFromCache = useSelector(getIsFetchedFromCache);
	const totalPages = useSelector(getNumOfTotalPages);

	useEffect(() => {
		if (searchTerm.length >= 3) {
			dispatch(fetchMovies({ searchTerm, page }));
		}
	}, [searchTerm, dispatch, page]);
	return (
		<>
			{/* If i will have time, I will make the search bar sticky */}
			<Box display="flex" marginTop="20px" justifyContent="center">
				<Box flexGrow={2} maxWidth="400px">
					<SearchField setSearchTerm={setSearchTerm} />
				</Box>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						dispatch(fetchMovies({ searchTerm, page }));
					}}
				>
					Search
				</Button>
			</Box>
			{movies.length > 0 && (
				<Info
					message={`Results retrieved from ${fetchedFromCache ? 'cache' : 'API'}`}
					align="left"
					style={{ marginTop: '30px', marginLeft: '35px' }}
				/>
			)}
			<Grid
				container
				spacing={2}
				style={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}
				maxHeight={totalPages > 1 ? '75vh' : '90vh'}
				overflow="scroll"
			>
				{isLoading &&
					new Array(20).fill(20).map((el, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<Skeleton variant="rectangular" animation="pulse" width={220} height={330} />
							<Skeleton width={220} />
							<Skeleton width={220} />
							<Skeleton width={220} />
						</Grid>
					))}
				{movies.map((el) => {
					return (
						<Grid item xs={12} sm={6} md={4} lg={3} key={el.id}>
							<MoviePoster title={el.title} year={el.release_date} relativeFilePath={el.poster_path} />
						</Grid>
					);
				})}
			</Grid>
			{totalPages > 1 && (
				<Box display="flex" justifyContent="center">
					<Pagination count={totalPages} color="primary" onChange={(e, value) => setPage(value)} />
				</Box>
			)}
			{/* If I had more time, I would have implemented a toaster component for both the retrieved from api/cache and the error message */}
			{error && <Info message="error" align="center" style={{ marginTop: '30px', color: 'red' }} />}
		</>
	);
}

export default App;
