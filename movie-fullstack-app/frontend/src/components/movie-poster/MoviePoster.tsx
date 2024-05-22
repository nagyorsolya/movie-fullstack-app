import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';

type MoviePosterProps = {
	title: string;
	year: string;
	relativeFilePath: string;
};

function MoviePoster({ title, year, relativeFilePath }: MoviePosterProps) {
	return (
		<Card sx={{ maxWidth: 220 }}>
			<CardMedia
				loading="lazy"
				component="img"
				height="330"
				width="220"
				// NOTE: It seems that you cannot query the absolute path/CDN path of the image from the API response
				image={`https://media.themoviedb.org/t/p/w220_and_h330_face/${relativeFilePath}`}
				alt={`${title} movie poster`}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{moment(year).format('YYYY.MM.DD')}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default MoviePoster;
