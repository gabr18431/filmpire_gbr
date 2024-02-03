import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, useMediaQuery } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { searchMovie } from '../../features/CurrentGenreOrCategory';

const Search = () => {
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  }
  if (location.pathname !== '/' ) return null ;
  return (
    <div className='search-container'>
      <TextField onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        style={{marginBottom: isMobile && '10px', 
        marginTop: isMobile && '-10px',
        color: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.85)' : '#f2f2f2',
        filter: theme.palette.mode === 'light' && 'invert(1)',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' >
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </div>
  )
}

export default Search;