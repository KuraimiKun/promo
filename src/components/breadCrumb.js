import React from 'react';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import theme from '../theme';

const Breadcrumb = ({ links }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          borderRadius: '12px',
          padding: '16px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          margin: '16px 0',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <Breadcrumbs
          separator={
            <NavigateNextIcon 
              fontSize="small" 
              sx={{
                color: theme.palette.primary.main,
                opacity: 0.5,
                marginX: '8px',
                fontSize: '1.2rem'
              }}
            />
          }
          aria-label="breadcrumb"
          sx={{
            direction: 'rtl',
            '& .MuiBreadcrumbs-ol': {
              alignItems: 'center',
              flexWrap: 'nowrap',
            },
          }}
        >
          {links.map((link, index) => {
            if (index === links.length - 1) {
              return (
                <Typography
                  key={index}
                  sx={{
                    fontFamily: 'Cairo, sans-serif',
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    fontSize: '1rem',
                    letterSpacing: '0.2px',
                  }}
                >
                  {link.label}
                </Typography>
              );
            }

            return (
              <Typography
                key={index}
                onClick={() => handleNavigation(link.href)}
                sx={{
                  fontFamily: 'Cairo, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: `${theme.palette.primary.main}15`,
                    color: theme.palette.primary.main,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {link.label}
              </Typography>
            );
          })}
        </Breadcrumbs>
      </Box>
    </ThemeProvider>
  );
};

export default Breadcrumb;
