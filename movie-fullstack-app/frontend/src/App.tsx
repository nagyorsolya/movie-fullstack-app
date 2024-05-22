import { Box, Button } from '@mui/material';
import SearchField from './components/search/SearchField';

function App() {
	return (
		<Box display="flex" padding="20px">
			<Box flexGrow={2}>
				<SearchField />
			</Box>
			<Button variant="contained" color="primary">
				Search
			</Button>
		</Box>
	);
}

export default App;
