'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2'
        },
        secondary: {
            main: '#f50057'
        }
    },
    shape: {
        borderRadius: 12
    },
    typography: {
        fontFamily: "'Inter', sans-serif"
    }
});

export default theme;