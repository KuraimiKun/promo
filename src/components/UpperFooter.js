import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid, IconButton, Container, Divider, TextField, Button, useTheme } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube, Phone, Email, LocationOn, Send } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../theme';

const MainFooter = () => {
  const particlesRef = useRef(null);
  const theme = useTheme();

  // Particle animation effect
  useEffect(() => {
    const canvas = particlesRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          speedX: Math.random() * 3 - 1.5,
          speedY: Math.random() * 3 - 1.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fill();
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  const menuItemStyle = {
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    marginBottom: 2,
    position: 'relative',
    paddingRight: '24px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      paddingRight: '32px',
      color: theme.palette.secondary.light,
      transform: 'scale(1.02)',
      textShadow: '0 0 8px rgba(255,255,255,0.3)',
    },
    '&::before': {
      content: '"›"',
      position: 'absolute',
      right: 0,
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      opacity: 0,
    },
    '&:hover::before': {
      right: '12px',
      opacity: 1,
      color: theme.palette.secondary.light,
    },
  };

  const FloatingCard = ({ children }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {children}
    </motion.div>
  );

  const socialIcons = [
    { icon: <Facebook />, link: '#', color: '#1877f2' },
    { icon: <Twitter />, link: '#', color: '#1da1f2' },
    { icon: <Instagram />, link: '#', color: '#e4405f' },
    { icon: <LinkedIn />, link: '#', color: '#0077b5' },
    { icon: <YouTube />, link: '#', color: '#ff0000' },
  ];

  const contactInfo = [
    { icon: <Phone sx={{ ml: 1 }} />, text: '966-XX-XXXXXXX' },
    { icon: <Email sx={{ ml: 1 }} />, text: 'info@tatheer.com' },
    { icon: <LocationOn sx={{ ml: 1 }} />, text: 'الرياض، المملكة العربية السعودية' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #1a0736 100%)`,
        color: '#fff',
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b649)',
        },
      }}
    >
      <canvas
        ref={particlesRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        {/* Newsletter Section */}
        <Box sx={{ mb: 6 }}>
          <FloatingCard>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  اشترك في نشرتنا الإخبارية
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                  كن أول من يعلم عن أحدث مشاريعنا وأخبارنا
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    variant="outlined"
                    placeholder="بريدك الإلكتروني"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(90deg, #4ecdc4, #45b649)',
                      borderRadius: '8px',
                      minWidth: '120px',
                    }}
                    endIcon={<Send />}
                  >
                    اشتراك
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </FloatingCard>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo Section */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center', mb: { xs: 4, md: 0 } }}>
            <FloatingCard>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #7e3ff2 0%, #4a1b9d 100%)',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: -3,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.1)',
                  },
                }}
              >
                ت
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: 1.5 }}>
                تأثير
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
                للإنتاج الإعلامي المتميز
              </Typography>

              {/* Contact Info */}
              <Box sx={{ mt: 4 }}>
                {contactInfo.map((info, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    {info.icon}
                    <Typography variant="body1">{info.text}</Typography>
                  </Box>
                ))}
              </Box>
            </FloatingCard>
          </Grid>

          {/* Services Sections */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {/* Main Services */}
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                <FloatingCard>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: 'linear-gradient(90deg, #4ecdc4, #45b649)',
                    }
                  }}>
                    الخدمات الرئيسية
                  </Typography>
                  {['الفعاليات والمؤتمرات', 'الإنتاج التلفزيوني', 'الإنتاج الوثائقي', 'الإنتاج الرقمي'].map((item, index) => (
                    <Typography key={index} sx={menuItemStyle}>{item}</Typography>
                  ))}
                </FloatingCard>
              </Grid>

              {/* Rest of the sections... */}
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                <FloatingCard>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3, position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: '#ffffff',
                    }
                  }}>
                    عن تأثير
                  </Typography>
                  {['عندما بدأنا', 'تواصل معنا', 'المدونة'].map((item, index) => (
                    <Typography key={index} sx={menuItemStyle}>{item}</Typography>
                  ))}
                </FloatingCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                <FloatingCard>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 3, position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: '#ffffff',
                    }
                  }}>
                    تأثير بلس
                  </Typography>
                  {['الاستوديوهات', 'التسويق', 'كتابة المحتوى', 'الهوية والتصميم'].map((item, index) => (
                    <Typography key={index} sx={menuItemStyle}>{item}</Typography>
                  ))}
                </FloatingCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Social Media Section */}
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            {socialIcons.map((social, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconButton
                  href={social.link}
                  sx={{
                    color: 'white',
                    background: `linear-gradient(135deg, ${social.color}80, ${social.color})`,
                    backdropFilter: 'blur(4px)',
                    '&:hover': {
                      background: social.color,
                      transform: 'translateY(-4px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {social.icon}
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* Floating Orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              position: 'absolute',
              width: 200 + i * 100,
              height: 200 + i * 100,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 70%)`,
              filter: 'blur(60px)',
              opacity: 0.3,
              transform: `translate(${i * 30}%, ${i * 20}%)`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MainFooter;
