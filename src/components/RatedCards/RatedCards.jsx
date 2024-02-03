import React from 'react';
import { Typography, Box, useMediaQuery } from '@mui/material';
import { Movie } from '..';
import './RatedCards.css';

const RatedCards = ({title, data}) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  return (
    <Box marginBottom='2rem'>
      { data?.results?.length > 0 && <Typography variant='h5' gutterBottom >{title}</Typography>}
      <Box display='flex' flexWrap='wrap' justifyContent={ isMobile && 'center'} className='favorite-container' >
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} i={i} movie={movie} />
        ))}
      </Box>
    </Box>
  )
}

export default RatedCards