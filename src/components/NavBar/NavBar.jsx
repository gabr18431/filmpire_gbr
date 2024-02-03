import React, { useContext, useEffect, useState } from 'react';
import { AppBar, IconButton, Drawer, Button, Toolbar, useMediaQuery, Avatar, TextField } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { Search, SideBar } from '..';
import { fetchToken, moviesApi, createSessionId } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import avatarImage from '../../assets/image/avatar.png';

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext);
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');
  const theme = colorMode.theme.palette.mode;
  useEffect(()=> {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
          dispatch(setUser(userData));
        }
      }
    }
    logInUser();
  },[token])
  const avatarUser = user?.avatar?.tmdb?.avatar_path || null;
  return (
    <>
    <AppBar position='fixed' className='header' style={{backgroundColor: theme === 'dark' && 'rgba(0, 0, 0, 0.25)'}}>
      <Toolbar className='Toolbar' style={{marginLeft: isMobile ? 0 : '240px'}}>
        {isMobile && (
        <IconButton
        color='inherit'
        edge='start'
        className='menuButton'
        style={{ marginRight: '20px' }}
        onClick={()=> setMobileOpen((prev)=> !prev)}
        >
          <Menu />
        </IconButton>
        )}
        
        <IconButton
        color='inherit'
        sx={{ml: 1}}
        style={{ outline: 'none' }}
        onClick={colorMode.toggleColorMode}
        >
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isMobile && <Search /> }
        <div>
          {!isAuthenticated ? (
            <Button color='inherit' onClick={fetchToken}>
              Login <AccountCircle style={{marginLeft: '5px'}} />
            </Button>
          ) : (
            <Button color='inherit' component={Link} to={`/profile/${user.id}`} className='linkButton' >
              { !isMobile && <> {user.username} </>}
              <Avatar style={{width: 30, height: 30, marginLeft:!isMobile && '5px' }} 
              alt='profile' 
              src={ avatarUser ? `https://www.themoviedb.org/t/p/w64_and_h64_face/${avatarUser}` : avatarImage} />
            </Button>
          )}
        </div>
        {isMobile && <Search />}
      </Toolbar>
      
    </AppBar>
    <div>
      <nav className='drawer'
        style={{ flexShrink: !isMobile && '0' }}
      >
        
        { isMobile ? (
        <Drawer
          variant='temporary' 
          anchor='right' 
          open={mobileOpen}
          className='drawer-paper'
          ModalProps={{ keepMounted: true }}
          onClose={()=> setMobileOpen((prev)=> !prev)}
        >
          <SideBar setMobileOpen={setMobileOpen} />
        </Drawer>) : (
        <Drawer
          style={{ width: "240px", backgroundColor: theme === 'dark' ? '#04152d': 'white' }}
          className='drawer-paper'
          variant='persistent'
          open
        >
          <SideBar setMobileOpen={setMobileOpen} />
        </Drawer>)}
      </nav>
    </div>
    </>
  );
};
export default NavBar;