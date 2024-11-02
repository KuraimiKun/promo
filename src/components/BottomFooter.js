// BottomFooter.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Instagram, Twitter, YouTube} from '@mui/icons-material';
import theme from '../theme';

const BottomFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.primary.main}`,
        color: '#fff',
        padding: '20px 0',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton sx={{ color: '#fff' }} aria-label="Twitter">
          <Twitter />
        </IconButton>
        <IconButton sx={{ color: '#fff' }} aria-label="YouTube">
          <YouTube />
        </IconButton>
        <IconButton sx={{ color: '#fff' }} aria-label="Instagram">
          <Instagram />
        </IconButton>
   
      </Box>
      <Typography variant="body2" sx={{ marginTop: 2, fontWeight: 'bold' }}>
        TatheerTV
      </Typography>
    </Box>
  );
};

export default BottomFooter;
