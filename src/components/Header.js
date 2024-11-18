import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, useTheme, useMediaQuery, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  background: scrolled 
    ? 'rgba(240, 242, 245, 0.98)'
    : 'rgba(240, 242, 245, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: scrolled 
    ? '0 4px 20px rgba(0,0,0,0.15)' 
    : '0 4px 15px rgba(0,0,0,0.08)',
  borderBottom: '1px solid rgba(0,0,0,0.05)',
  transition: 'all 0.3s ease-in-out',
  margin: scrolled ? '0 auto' : '20px auto',
  borderRadius: scrolled ? '0' : '12px',
  position: 'fixed',
  right: '50%',
  transform: scrolled 
    ? 'translateX(50%) translateY(0)' 
    : 'translateX(50%) translateY(20px)',
  maxWidth: '1200px',
  width: scrolled ? '100%' : 'calc(100% - 40px)',
  direction: 'rtl',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: '#333',
  padding: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.2s ease-in-out',
  fontWeight: 600,
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  fontFamily: 'inherit',
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
});

const MobileDrawer = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  zIndex: theme.zIndex.drawer,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  direction: 'rtl',
  '& .MuiBox-root': {
    marginRight: 0,
  },
});

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'المدونة', path: '/blog' },  
    { title: 'عن تأثير', path: '/about' },
    { title: 'بلس', path: '/plus', submenu: [
      { title: 'New Arrivals', path: '/plus/new' },
      { title: 'Featured', path: '/plus/featured' },
      { title: 'Sale', path: '/plus/sale' }
    ]},
    { title: 'الخدمات الرئيسية', path: '/services', submenu: [
      { title: 'New Arrivals', path: '/services/new' },
      { title: 'Featured', path: '/services/featured' },
      { title: 'Sale', path: '/services/sale' }
    ]},
  ];

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
    setMobileOpen(false);
  };

  const handleMenuOpen = (event, menuId) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menuId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <StyledAppBar position="sticky" scrolled={scrolled}>
      <Paper data-scrolled={scrolled.toString()}>
        <StyledToolbar>
          <StyledLink to="/">
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: '#333',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #333, #666)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '1.5rem',
              }}
            >
              LOGO
            </Typography>
          </StyledLink>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: 1,
              }}>
                {menuItems.map((item) => (
                  <Box key={item.title}>
                    {item.submenu ? (
                      <>
                        <StyledButton
                          endIcon={<KeyboardArrowDownIcon />}
                          onClick={(e) => handleMenuOpen(e, item.title)}
                          sx={{
                            background: activeMenu === item.title ? 'rgba(0,0,0,0.05)' : 'transparent',
                          }}
                        >
                          {item.title}
                        </StyledButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl) && activeMenu === item.title}
                          onClose={handleMenuClose}
                          PaperProps={{
                            sx: {
                              mt: 2,
                              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                              borderRadius: '16px',
                              direction: 'rtl',
                              padding: '8px',
                              '& .MuiMenuItem-root': {
                                borderRadius: '8px',
                                margin: '4px',
                                transition: 'all 0.2s',
                                '&:hover': {
                                  background: 'rgba(0,0,0,0.03)',
                                },
                              },
                            },
                          }}
                        >
                          {item.submenu.map((subItem) => (
                            <MenuItem 
                              key={subItem.title}
                              onClick={() => handleNavigate(subItem.path)}
                              sx={{ minWidth: 150, textAlign: 'right' }}
                            >
                              {subItem.title}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : (
                      <StyledLink to={item.path}>
                        <StyledButton>
                          {item.title}
                        </StyledButton>
                      </StyledLink>
                    )}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {isMobile && (
            <IconButton onClick={toggleMobileMenu} sx={{ color: '#333' }}>
              <MenuIcon />
            </IconButton>
          )}

          <AnimatePresence>
            {mobileOpen && (
              <MobileDrawer
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <IconButton 
                  onClick={toggleMobileMenu} 
                  sx={{ 
                    alignSelf: 'flex-start',
                    mb: 4,
                    color: '#333',
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3,
                  width: '100%',
                }}>
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.title}
                      whileHover={{ scale: 1.02, x: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavigate(item.path)}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#333',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '1.2rem',
                        }}
                      >
                        {item.title}
                      </Typography>
                    </motion.div>
                  ))}
                </Box>
              </MobileDrawer>
            )}
          </AnimatePresence>
        </StyledToolbar>
      </Paper>
    </StyledAppBar>
  );
}

export default Header;