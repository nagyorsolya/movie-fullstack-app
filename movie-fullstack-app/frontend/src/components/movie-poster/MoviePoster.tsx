import { Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import moment from 'moment';

type MoviePosterProps = {
	title: string;
	year: string;
	relativeFilePath?: string;
};

function MoviePoster({ title, year, relativeFilePath }: MoviePosterProps) {
	return (
		<Card sx={{ maxWidth: 220, maxHeight: 440 }}>
			<CardMedia
				loading="lazy"
				component="img"
				height="330"
				width="220"
				// NOTE: It seems that you cannot query the absolute path/CDN path of the image from the API response
				image={
					relativeFilePath
						? `https://media.themoviedb.org/t/p/w220_and_h330_face/${relativeFilePath}`
						: require('./placeholder-image.png')
				}
				alt={`${title} movie poster`}
			/>
			<CardContent>
				{/* This is not the best solution but in a short time I chose to go this way, if I had time I would have properly sized
				the images so the title could fit in two lines and use ellipsis on the third */}
				<Tooltip title={title} placement="top">
					<Typography
						gutterBottom
						variant="h6"
						component="div"
						style={{
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}
					>
						{title}
					</Typography>
				</Tooltip>
				<Typography variant="body2" color="text.secondary">
					{year ? moment(year).format('YYYY.MM.DD') : 'TBA'}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default MoviePoster;
