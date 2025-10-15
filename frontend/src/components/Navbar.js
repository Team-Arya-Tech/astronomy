import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
  Science
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setTheme } from '../store/uiSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const { theme: currentTheme } = useSelector((state) => state.ui);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'));
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Generator', path: '/generator' },
    { label: 'Learn', path: '/learn' },
    { label: 'AI Decoder', path: '/ai' },
    { label: 'Virtual Tour', path: '/ar' },
    { label: 'Documentation', path: '/docs' },
    { label: 'About', path: '/about' }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        // Remove hardcoded background - let theme handle it
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 4px 8px rgba(0, 0, 0, 0.3)' 
          : '0 4px 8px rgba(139, 69, 19, 0.2)'
      }}
    >
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Science sx={{ mr: 1, fontSize: 32 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 15%, #FFFF00 30%, #FFD700 45%, #DAA520 60%, #FFA500 75%, #FFD700 90%, #FFFF66 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              textShadow: '1px 1px 2px rgba(255,215,0,0.2)'
            }}
            onClick={() => navigate('/')}
          >
            DIGIYANTRA
          </Typography>
          <Typography
            variant="body2"
            sx={{ 
              ml: 1, 
              opacity: 0.8,
              fontSize: '0.7rem',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Ancient Astronomy Reimagined
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 0.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  backgroundColor: location.pathname === item.path ? 
                    (theme.palette.mode === 'dark' ? 'rgba(212,175,55,0.1)' : 'rgba(139,69,19,0.1)') : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(212,175,55,0.1)' : 'rgba(139,69,19,0.1)',
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* Theme Toggle */}
        <IconButton 
          color="inherit" 
          onClick={handleThemeToggle}
          sx={{ ml: 1 }}
        >
          {currentTheme === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>

        {/* Mobile Menu or User Menu */}
        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleSidebar())}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={() => { handleClose(); navigate('/about'); }}>About</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;