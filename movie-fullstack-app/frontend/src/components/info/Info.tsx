import { Typography } from '@mui/material';

type InfoProps = {
	style: { [key: string]: string };
	align: 'left' | 'center' | 'right';
	message: string;
};

function Info({ message, style, align = 'center' }: InfoProps) {
	return (
		<Typography variant="h6" align={align} style={style}>
			{message}
		</Typography>
	);
}

export default Info;
