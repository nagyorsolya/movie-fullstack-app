import { Typography } from '@mui/material';

type InfoProps = {
	retrievedFromCache: boolean;
	style: { [key: string]: string };
	align: 'left' | 'center' | 'right';
};

function Info({ retrievedFromCache, style, align = 'center' }: InfoProps) {
	return (
		<Typography variant="h6" align={align} style={style}>
			{`Results retrieved from ${retrievedFromCache ? 'cache' : 'API'}`}
		</Typography>
	);
}

export default Info;
