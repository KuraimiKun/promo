import React, { useState } from 'react';
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
}));

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

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products', submenu: ['New Arrivals', 'Featured', 'Sale'] },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}>
          LOGO
        </Typography>

        {isMobile ? (
          <>
            <IconButton onClick={toggleMobileMenu} sx={{ color: '#333' }}>
              <MenuIcon />
            </IconButton>
            <AnimatePresence>
              {mobileOpen && (
                <MobileDrawer
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {menuItems.map((item) => (
                      <motion.div
                        key={item.title}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Box key={item.title}>
                {item.submenu ? (
                  <>
                    <StyledButton
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={handleMenuOpen}
                    >
                      {item.title}
                    </StyledButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          borderRadius: '8px',
                        },
                      }}
                    >
                      {item.submenu.map((subItem) => (
                        <MenuItem 
                          key={subItem}
                          onClick={handleMenuClose}
                          sx={{ minWidth: 150 }}
                        >
                          {subItem}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <StyledButton>
                    {item.title}
                  </StyledButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;