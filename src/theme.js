// src/theme.js
import { createTheme } from '@mui/material/styles';

// Import Cairo font from CDN
import '@fontsource/cairo';

const theme = createTheme({
  direction: 'rtl', // Set RTL direction
  palette: {
    primary: {
      main: '#be1e2f', // Fix hex value
    },
    secondary: {
      main: '#d13744', // Fix hex value
    },
  },
  typography: {
    fontFamily: 'Cairo, sans-serif', // Customize font family if desired
  },
});

export default theme;
