import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Grid, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import './Actors.css';
import { useGetActorsDetailsQuery, useGetMoviesByActorsIdQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';
import posterImage from '../../assets/image/poster-image.png';
const Actors = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: actorMovies } = useGetMoviesByActorsIdQuery({id, page});
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' >
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  const goBack = () => {
    navigate(-1);
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' mt="20px">
        <Button startIcon={<ArrowBack />} onClick={goBack} color='primary' >
          Something has gone Wrong - Go back 
        </Button>
      </Box>
    );
  }
  
  
  return (
    <>
    <Grid container spacing={3}>
      <Grid item lg={5} xl={4}>
      <img className='profile-image' alt={data?.name} src={ data?.profile_path 
          ? `https://image.tmdb.org/t/p/w500/${data.profile_path}` 
          : posterImage } />
      </Grid>
      <Grid item className='actor-info' lg={7} xl={8} >
        <Typography variant='h2' gutterBottom>{data?.name}</Typography>
        <Typography variant='h5' gutterBottom>
        Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant='body1' align='justify' paragraph >
        {data?.biography || 'Sorry, no biography yet ...'}
        </Typography>
        <Box marginTop='2rem' display='flex' justifyContent='space-around' >
          <Button variant='contained' color='primary' target='_blank' href={`https://www.imdb.com/name/${data?.imdb_id}`} >
            IMDB Profile
          </Button>
          <Button startIcon={<ArrowBack />} onClick={goBack} color='primary' >
            Back 
          </Button>
        </Box>
      </Grid>
    </Grid>
    {actorMovies && (
      <Box marginTop='2rem 0' width='100%' gutterBottom align='center' >
        <Typography variant='h2' >Actor Movies</Typography>
        <MovieList movies={actorMovies} numberOfMovies={12} />
        <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages} />
      </Box>
    )}
    </>
  );
};

export default Actors;