// src/theme.js
import { createTheme } from '@mui/material/styles';

// Import Cairo font from CDN
import '@fontsource/cairo';

const theme = createTheme({
  direction: 'rtl', // Ensure RTL direction
  palette: {
    primary: {
      main: '#be1e2f', // Fix hex value
    },
    secondary: {
      main: '#d13744', // Fix hex value
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    }
  },
  typography: {
    fontFamily: 'Cairo, sans-serif', // Customize font family if desired
    h3: {
      fontWeight: 700,
    },
    body1: {
      lineHeight: 1.8,
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          direction: 'rtl'
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          '& *': {
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Cairo, sans-serif',
        }
      }
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;
