import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Button, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  color: '#333',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.05)',
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
  background: 'white',
  zIndex: theme.zIndex.drawer,
  padding: theme.spacing(2),
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiBox-root': {
    marginLeft: 0,
  },
});

function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

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
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <StyledLink to="/">
          <Typography variant="h6" component="div" sx={{ color: '#333' }}>
            LOGO
          </Typography>
        </StyledLink>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Box key={item.title}>
                  {item.submenu ? (
                    <>
                      <StyledButton
                        endIcon={<KeyboardArrowDownIcon />}
                        onClick={(e) => handleMenuOpen(e, item.title)}
                      >
                        {item.title}
                      </StyledButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl) && activeMenu === item.title}
                        onClose={handleMenuClose}
                        PaperProps={{
                          sx: {
                            mt: 1,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            borderRadius: '8px',
                            direction: 'rtl',
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
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ direction: 'rtl' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {menuItems.map((item) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <Typography variant="h6" sx={{ color: '#333', cursor: 'pointer' }}>
                      {item.title}
                    </Typography>
                  </motion.div>
                ))}
              </Box>
            </MobileDrawer>
          )}
        </AnimatePresence>
      </StyledToolbar>
    </StyledAppBar>
  );
}

export default Header;