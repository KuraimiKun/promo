import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, IconButton, Container, Divider, TextField, Button, useTheme, Alert, Snackbar } from '@mui/material';
import { Facebook, Instagram, LinkedIn, YouTube, Phone, Email, LocationOn, Send } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../theme';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

// Add custom X (Twitter) icon component
const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.977 13.334L22.499 4H20.778L14.361 11.947L9.23199 4H3.50099L11.238 16.1L3.50099 25.68H5.22199L11.854 17.487L17.155 25.68H22.886L14.977 13.334ZM12.617 16.047L11.584 14.525L5.92699 5.927H8.44199L12.892 12.689L13.925 14.211L19.792 23.12H17.277L12.617 16.047Z"/>
  </svg>
);

const MainFooter = () => {
  const particlesRef = useRef(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const navigate = useNavigate();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        createdAt: new Date().toISOString(),
      });

      setNotification({
        open: true,
        message: 'تم الاشتراك بنجاح!',
        type: 'success'
      });
      setEmail('');
    } catch (error) {
      setNotification({
        open: true,
        message: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        type: 'error'
      });
    }
    setLoading(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

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
    { icon: <Facebook />, link: 'https://www.facebook.com/prod.promomedia?mibextid=ZbWKwL', color: '#1877f2' },
    { icon: <XIcon />, link: 'https://x.com/prod_promomedia?t=gfdPOnroWKVI9xgK7gGRTA&s=09', color: '#000000' },
    { icon: <Instagram />, link: 'https://www.instagram.com/promomedia__/profilecard/?igsh=MXZnb2FsaW05dXY3cA==', color: '#e4405f' },
  ];

  const contactInfo = [
    { text: '905011000777+', icon: <Phone sx={{ ml: 1, transform: 'scaleX(-1)' }} /> },  // Increased margin-right to 4
    { icon: <Email sx={{ ml: 1 }} />, text: 'prod.promomedia@gmail.com' },  // Changed ml to mr and increased to 4
    { icon: <LocationOn sx={{ ml: 1 }} />, text: 'إسطنبول, تركيا' },  // Changed ml to mr and increased to 4
  ];

  const mainServices = [
    { name: 'البرامج التلفزيونية', index: 0 },
    { name: 'الإعلانات التجارية', index: 1 },
    { name: 'الأفلام التعريفية', index: 2 },
    { name: 'المؤتمرات والمناسبات', index: 3 }
  ];

  const handleServiceClick = (index) => {
    navigate('/', { state: { scrollToService: index } });
  };

  const handleVipServiceClick = (serviceName) => {
    navigate('/', { state: { scrollToVipService: serviceName } });
  };

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
                <Box
                  component="form"
                  onSubmit={handleNewsletterSubmit}
                  sx={{ display: 'flex', gap: 1 }}
                >
                  <TextField
                    variant="outlined"
                    placeholder="بريدك الإلكتروني"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    disabled={loading}
                    autoComplete="email"
                    inputProps={{
                      style: {
                        textAlign: 'right',
                        direction: 'rtl',
                        padding: '12px 14px'
                      }
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.2)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.4)'
                      },
                      '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white'
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(90deg, #4ecdc4, #45b649)',
                      borderRadius: '8px',
                      minWidth: '120px',
                      opacity: loading ? 0.7 : 1,
                      '& .MuiButton-endIcon': {
                        marginRight: '8px',  // Add margin between text and icon
                        marginLeft: 0,       // Reset default left margin
                      }
                    }}
                    endIcon={<Send sx={{ transform: 'scaleX(-1)' }} />}
                  >
                    {loading ? 'جاري...' : 'اشتراك'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </FloatingCard>
        </Box>

        {/* Add Notification Snackbar */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.type}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        {/* Main Content */}
        <Grid container spacing={4} justifyContent="space-between">
          {/* Logo Section */}
          <Grid item xs={12} md={4} sx={{ textAlign: 'center', mb: { xs: 4, md: 0 } }}>
            <FloatingCard>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px', // Changed from 24px to 32px
                  position: 'relative',
                }}
              >
                <img
                  src="/logo512White.png"
                  alt="Promo Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, letterSpacing: 1.5 }}>
                برومو
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
                  {mainServices.map((service, index) => (
                    <Typography
                      key={index}
                      sx={menuItemStyle}
                      onClick={() => handleServiceClick(service.index)}
                    >
                      {service.name}
                    </Typography>
                  ))}
                </FloatingCard>
              </Grid>

              {/* Rest of the sections... */}
              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                <FloatingCard>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold', marginBottom: 3, position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      right: 0,
                      width: 40,
                      height: 3,
                      background: 'linear-gradient(90deg, #4ecdc4, #45b649)',  // Changed to match gradient
                    }
                  }}>
                    عن برومو
                  </Typography>
                  <Typography
                    component={Link}
                    to="/about"
                    sx={{
                      ...menuItemStyle,
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    عندما بدأنا
                  </Typography>
                  <Typography
                    component={Link}
                    to="/contact"
                    sx={{
                      ...menuItemStyle,
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    تواصل معنا
                  </Typography>
                  <Typography
                    component={Link}
                    to="/blog"
                    sx={{
                      ...menuItemStyle,
                      textDecoration: 'none',
                      color: 'inherit'
                    }}
                  >
                    المدونـة
                  </Typography>
                </FloatingCard>
              </Grid>

              <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'right' }}>
                <FloatingCard>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold', marginBottom: 3, position: 'relative',
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
                    برومو بلس                  </Typography>
                  <Typography 
                    sx={menuItemStyle} 
                    onClick={() => handleVipServiceClick('تأجير معدات تصوير')}
                  >
                    تأجير معدات تصوير
                  </Typography>
                  <Typography 
                    sx={menuItemStyle} 
                    onClick={() => handleVipServiceClick('تأجير شاشات LED')}
                  >
                    تأجير شاشات LED
                  </Typography>
                  <Typography 
                    sx={menuItemStyle} 
                    onClick={() => handleVipServiceClick('تأجير نظام إضاءة وصوت')}
                  >
                    تأجير نظام إضاءة وصوت
                  </Typography>
                  <Typography 
                    sx={menuItemStyle} 
                    onClick={() => handleVipServiceClick('الترجمة الفورية')}
                  >
                    الترجمة الفورية
                  </Typography>
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

        {/* Copyright Section */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography
            variant="body2"
            sx={{
              opacity: 0.7,
              fontSize: '0.9rem',
              '& span': {
                color: theme.palette.secondary.main,
                fontWeight: 'bold'
              }
            }}
          >
            © {new Date().getFullYear()} <span>برومو</span>. جميع الحقوق محفوظة
          </Typography>
        </Box>
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
