import React, { useContext, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { MovieInformation, Movies, Actors, Profile, NavBar, PageNotFound } from ".";
import "./App.css";
import "../css-config/media.css";
import "../css-config/variables.css";
import { ColorModeContext } from "../utils/ToggleColorMode";

const App = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = colorMode.theme.palette.mode;
  useEffect(()=> {
    document.body.style.backgroundColor = theme === "dark" ? '#04152d' : '';
    document.body.classList.add(theme === "dark" ? 'dark-mode' : 'light-mode');
    document.body.classList.remove(theme === "light" ? 'dark-mode' : 'light-mode');
  },[theme])

  return (
    <div className="root">
      <CssBaseline />
      <NavBar />
      <main className="content" style={{backgroundColor:theme === "dark" && '#04152d', color: theme === "dark" && '#ffffffb3'}}>
        <div className="toolbar" />
        <Routes>
          <Route path="/movie/:id" element={<MovieInformation />} />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path='/' element={<Movies />} />
          <Route path='/approved' element={<Movies />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
};
export default App;
