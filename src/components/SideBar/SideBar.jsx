import React, { useEffect, useContext } from "react";
import { ColorModeContext } from '../../utils/ToggleColorMode';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useGetGenresQuery } from "../../services/TMDB";
import IconImages from "../../assets/genres/IconImages";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/CurrentGenreOrCategory";
const blueLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const redLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

const SideBar = ({ setMobileOpen }) => {
  const { data, isFetching } = useGetGenresQuery();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext);
  const theme = colorMode.theme.palette.mode;
  const categories = [
    { label: "Upcoming", value: "upcoming" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Popular", value: "popular" },
  ];

  useEffect(()=> {
    setMobileOpen(false);
  },[genreIdOrCategoryName])

  return (
    <>
      <Link to="/" className="image-link"
      style={{backgroundColor: theme === "light" ? 'white' : '#020c1b' }}>
        <img
          src={theme === "dark" ? redLogo : blueLogo}
          alt="logo"
          className="image-logo"
        />
      </Link>
      <Divider style={{borderColor: theme === "dark" && '#ffffff1f'}} />
      <List>
        <ListSubheader style={{backgroundColor:theme === "dark" && '#04152d', color: theme === "dark" && '#ffffffb3'}}>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            className="links"
            to="/"
            style={{
              color:
                theme === "dark"
                  ? "#f2f2f2"
                  : "rgba(0, 0, 0, 0.87)",
            }}
          >
            <ListItem
              onClick={() => {
                dispatch(selectGenreOrCategory(value));
              }}
              button
            >
              <ListItemIcon>
                <img
                  src={IconImages[label.toLowerCase()]}
                  alt={name}
                  className="genre-images"
                  height={30}
                  style={{
                    filter:
                      theme === "light" ? "" : "invert(1)",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider style={{borderColor: theme === "dark" && '#ffffff1f'}} />
      <List>
        <ListSubheader style={{backgroundColor:theme === "dark" && '#04152d', color: theme === "dark" && '#ffffffb3'}}>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data?.genres.map(({ name, id }) => (
            <Link
              key={name}
              className="links"
              to="/"
              style={{
                color:
                  theme === "dark"
                    ? "#f2f2f2"
                    : "rgba(0, 0, 0, 0.87)",
              }}
            >
              <ListItem
                onClick={() => {
                  dispatch(selectGenreOrCategory(id))
                  setMobileOpen((prev)=> !prev)
                }}
                button
              >
                <ListItemIcon>
                  <img
                    src={IconImages[name.toLowerCase()]}
                    alt={name}
                    className="genre-images"
                    height={30}
                    style={{
                      filter:
                        theme === "light" ? "" : "invert(1)",
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default SideBar;
