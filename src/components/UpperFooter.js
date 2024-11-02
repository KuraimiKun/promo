// MainFooter.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import theme from '../theme';

const MainFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:  `${theme.palette.secondary.main}`,
        color: '#fff',
        padding: '40px 0',
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4} justifyContent="center" sx={{ textAlign: 'right' }}>
        
        {/* Logo Section */}
        <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: '#fff',
              color: '#7e3ff2',
              width: 50,
              height: 50,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: 2,
            }}
          >
            t
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
            TATHEER
          </Typography>
          <Typography variant="body2">Media Production</Typography>
          <Typography variant="body2" sx={{ fontSize: '1.2em', marginTop: 1 }}>
            تأثير لإنتاج الإعلامي
          </Typography>
        </Grid>
        
        {/* Main Services */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            الخدمات الرئيسية
          </Typography>
          <Typography>الفعاليات والمؤتمرات</Typography>
          <Typography>الإنتاج التلفزيوني</Typography>
          <Typography>الإنتاج الوثائقي</Typography>
          <Typography>الإنتاج الرقمي</Typography>
          <Typography>الإنتاج السينمائي</Typography>
        </Grid>

        {/* Plus Services */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            تأثير بلس
          </Typography>
          <Typography>الاستوديوهات</Typography>
          <Typography>التسويق</Typography>
          <Typography>كتابة المحتوى</Typography>
          <Typography>الهوية والتصميم</Typography>
        </Grid>

        {/* About Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            عن تأثير
          </Typography>
          <Typography>عندما بدأنا</Typography>
          <Typography>تواصل معنا</Typography>
          <Typography>المدونة</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainFooter;
