import React, { useContext } from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import './Movie.css';
import posterImage from '../../assets/image/poster-image.png';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import CircleRating from '../circleRating/CircleRating';
import dayjs from 'dayjs';

const Movie = ({ movie, i }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = colorMode.theme.palette.mode;
  return (
    <Grid item sx={12} sm={6} md={4} lg={3} xl={2} className='movie' key={i} >
      <Grow in timeout={(i + 1) * 350 } key={i} >
        <Link className='movie-links' to={`/movie/${movie.id}`} >
          <img className='movie-image' alt={movie.title} src={ movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
          : posterImage } />
          <CircleRating rating={movie.vote_average.toFixed(1)} />
          <Typography variant='h5' className='movie-title' 
            color={theme === 'dark' ? '#ffffffb3' : 'rgba(0, 0, 0, 0.87)'} 
          >
            {movie?.title}
          </Typography>
          <Typography variant='body2' className='date' 
            color={theme === 'dark' ? '#ffffffb3' : '#272727'}
          >
            {dayjs(movie.release_date || movie.first_air_date).format("MMM D, YYYY")}
          </Typography>
        </Link>
      </Grow>
    </Grid>
  )
}

export default Movie