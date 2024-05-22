import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		customShadows?: {
			defaultBoxShadow: string;
		};
	}
	interface ThemeOptions {
		customShadows?: {
			defaultBoxShadow: string;
		};
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
	},
	shape: {
		borderRadius: 4,
	},
	customShadows: {
		defaultBoxShadow:
			'0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
	},
	typography: {
		fontFamily: 'Roboto, Arial, sans-serif',
	},
});

export default theme;
