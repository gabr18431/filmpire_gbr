import React from 'react';
import { Grid } from '@mui/material';
import { Movie } from '..';
import './MovieList.css';

const MovieList = ({ movies, excludeFirst, endFrom }) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid container className='movies-container' >
      {movies?.results.slice(startFrom, endFrom).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </Grid>
  )
}

export default MovieList;