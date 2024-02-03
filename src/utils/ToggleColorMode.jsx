import React, { createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/system';

export const ColorModeContext = createContext();

const ToggleColorMode = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const theme = useMemo(()=> createTheme({
        palette: {
            mode,
        }
    }), [mode]);
    const toggleColorMode = () => {
        setMode((prev)=> prev === 'light' ? 'dark' : 'light');
    }
  return (
    <ColorModeContext.Provider value={{theme ,mode, setMode, toggleColorMode}}>
        { children }
    </ColorModeContext.Provider>
  )
}

export default ToggleColorMode