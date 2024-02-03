import React, { useContext } from 'react';
import { Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import './FeaturedMovie.css';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const FeaturedMovie = ({ movie }) => {
    const colorMode = useContext(ColorModeContext);
    const theme = colorMode.theme.palette.mode;
    if (!movie) return null;
  return (
    <Box component={Link} to={`/movie/${movie.id}`} className='featured-card-container' >
        <Card className='card'>
            <CardMedia 
                media="picture"
                alt={movie?.title}
                title={movie?.title}
                className='card-media'
                image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            />
            <Box padding='20px' >
                <CardContent className='card-content'>
                    <Typography variant='h5' gutterBottom >
                        {movie?.title}
                    </Typography>
                    <Typography variant='body2' >
                        {movie?.overview}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    </Box>
  )
}

export default FeaturedMovie