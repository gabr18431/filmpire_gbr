import React, { useEffect, useState, useContext } from 'react';
import './MovieInformation.css';
import { Box, Modal, Button, ButtonGroup, Typography, CircularProgress, useMediaQuery, Grid, Rating } from '@mui/material';
import { PlusOne, Movie as MovieIcon, Favorite, FavoriteBorderOutlined, Theaters, Language, Remove, ArrowBack, Mode } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import genreImages from '../../assets/genres/IconImages';
import { selectGenreOrCategory } from "../../features/CurrentGenreOrCategory";
import { MovieList } from '..';
import posterImage from '../../assets/image/poster-image.png';
import { userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const MovieInformation = () => {
  const { user } = useSelector(userSelector);
  const { id } = useParams();
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext);
  const theme = colorMode.theme.palette.mode;
  const [open, setOpen] = useState(false);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies} = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id});
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);
  useEffect(()=> {
    setIsMovieFavorite(!!favoriteMovies?.results?.find((movie) => movie.id === data?.id))
  },[favoriteMovies, data]);
  useEffect(()=> {
    setIsMovieWatchListed(!!watchlistMovies?.results?.find((movie) => movie.id === data?.id))
  },[watchlistMovies, data]);
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' >
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' >
        <CircularProgress size="6rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems='center' mt="20px">
        <Link to='/' >
          <Typography variant="h4">Something has gone Wrong - Go back </Typography> 
        </Link>
      </Box>
    );
  }
  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorite,
    });
    setIsMovieFavorite((prev) => !prev);
    console.log(isMovieFavorite);
  }
  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchListed,
    });
    setIsMovieWatchListed((prev) => !prev);
    console.log(isMovieWatchListed);
  }
  return (
    <Grid container className='container-space-around'>
      <Grid item sm={12} lg={4} >
      <img className='poster' alt={data?.title} src={ data?.poster_path 
          ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` 
          : posterImage } />
      </Grid>
      <Grid item container direction='column' lg={7} >
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} - ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className='container-space-around'>
          <Box display='flex' align='center' >
            <Rating readOnly value={data.vote_average / 2} precision={0.1} style={{
                    filter:
                      theme === "light" ? "" : "invert(1)",
                  }} />
            <Typography variant='subtitle1' style={{marginLeft: '10px'}} gutterBottom>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant='h6' align='center' gutterBottom>
            {data?.runtime}min | Language: { `${data?.spoken_languages[0].name}`}
          </Typography>
        </Grid>
        <Grid item className='genres-container'>
          {data?.genres?.map((genre)=> (
            <Link key={genre.name} className='links' to='/' onClick={()=> dispatch(selectGenreOrCategory(genre.id)) } >
              <img
                src={genreImages[genre.name.toLowerCase()]}
                alt={genre.name}
                className="genre-images"
                height={30}
                style={{
                  filter:
                    theme === "light" ? "dark" : "invert(1)",
                  marginRight: '10px',
                }} 
              /> 
              <Typography color={theme === 'dark' ? '#ffffffb3' :'textPrimary'} variant='subtitle1'>{genre.name}</Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' style={{ marginTop: '10px'}} gutterBottom>
          Overview :
        </Typography>
        <Typography style={{ marginBottom: '2rem'}} >
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2} className='cast-container' >
          {data?.credits?.cast?.map((character, i)=> (
            character.profile_path && (
            <Grid key={i} item sx={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}} >
              <img className='cast-image' src={ character.profile_path ? `https://image.tmdb.org/t/p/w500/${character.profile_path}`
                : posterImage } alt={character.name} />
              <Typography className='text-over' color={theme === 'dark' ? '#ffffffb3' :'textPrimary'} >{character.name}</Typography>
              <Typography className='text-over' color={theme === 'dark' ? '#ffffffb3' :'textSecondary'} >{character.character.split('/')[0]}</Typography>
            </Grid>)
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem'}} >
          <div className='buttons-container'>
            <Grid item sx={12} sm={6} className='buttons-container' >
              <ButtonGroup size='small' variant='outlined' >
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />} >Website</Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />} >IMDB</Button>
                <Button onClick={()=> setOpen(true)} href='#' endIcon={<Theaters />} >Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item sx={12} sm={6} className='buttons-container' >
              <ButtonGroup size='medium' variant='outlined' >
                <Button onClick={addToFavorites} endIcon={!isMovieFavorite ? <FavoriteBorderOutlined /> : <Favorite />} >
                  {!isMovieFavorite ? 'UnFavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchList} endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />} >
                WatchList
                </Button>
                <Button endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}} >
                  <Typography style={{ textDecoration: 'none' }} color='inherit' variant='subtitle2' component={Link} to='/'>Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {recommendations?.results?.length > 0 && (
      <Box marginTop='5rem' width='100%' gutterBottom align='center' >
          <Typography variant='h3' >You might also like</Typography>
          <MovieList movies={recommendations} />
      </Box>
      )}
      {data?.videos?.results?.length > 0 && (
        <Modal
          closeAfterTransition
          className='modal'
          open={open}
          onClose={()=> setOpen(false)}
        >
            <iframe
              autoFocus
              className='video'
              // frameBorder={0}
              title='Trailer'
              src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
              allow='autoplay'
            />
        </Modal>
      )}
      
    </Grid>
  );
};
export default MovieInformation;
