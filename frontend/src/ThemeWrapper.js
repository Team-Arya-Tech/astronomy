import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const ThemeWrapper = ({ children }) => {
  const currentTheme = useSelector((state) => state.ui.theme);

  const getTheme = (mode) => {
    const baseTypography = {
      fontFamily: '"Spectral", "Cormorant Garamond", "Times New Roman", serif',
      h1: {
        fontFamily: '"Cinzel", "Times New Roman", serif',
        fontWeight: 700,
        fontSize: '3.5rem',
        letterSpacing: '0.02em',
        textShadow: mode === 'dark' ? '2px 2px 4px rgba(0,0,0,0.7)' : '1px 1px 2px rgba(0,0,0,0.3)',
      },
      h2: {
        fontFamily: '"Cinzel", "Times New Roman", serif',
        fontWeight: 600,
        fontSize: '2.8rem',
        letterSpacing: '0.015em',
      },
      h3: {
        fontFamily: '"Cinzel", "Times New Roman", serif',
        fontWeight: 500,
        fontSize: '2.2rem',
        letterSpacing: '0.01em',
      },
      h4: {
        fontFamily: '"Philosopher", "Times New Roman", serif',
        fontWeight: 700,
        fontSize: '1.8rem',
      },
      h5: {
        fontFamily: '"Philosopher", "Times New Roman", serif',
        fontWeight: 400,
        fontSize: '1.5rem',
      },
      h6: {
        fontFamily: '"Philosopher", "Times New Roman", serif',
        fontWeight: 400,
        fontSize: '1.2rem',
      },
      body1: {
        fontSize: '1.1rem',
        lineHeight: 1.7,
        letterSpacing: '0.01em',
      },
      body2: {
        fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
        fontSize: '1rem',
        lineHeight: 1.6,
        fontStyle: 'italic',
      },
    };

    if (mode === 'dark') {
      return createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#D4AF37',
            light: '#F4E4BC',
            dark: '#B8860B',
          },
          secondary: {
            main: '#CD853F',
            light: '#DEB887',
            dark: '#8B4513',
          },
          background: {
            default: '#1a0f0a',
            paper: '#2d1810',
          },
          text: {
            primary: '#F5E6D3',
            secondary: '#D4AF37',
          },
        },
        typography: {
          ...baseTypography,
          h1: {
            ...baseTypography.h1,
            background: 'linear-gradient(135deg, #D4AF37, #F4E4BC, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          h2: {
            ...baseTypography.h2,
            color: '#D4AF37',
          },
          h3: {
            ...baseTypography.h3,
            color: '#F4E4BC',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: `
                  radial-gradient(ellipse at top, rgba(212,175,55,0.1) 0%, transparent 70%),
                  radial-gradient(ellipse at bottom, rgba(139,69,19,0.15) 0%, transparent 70%),
                  linear-gradient(135deg, #1a0f0a 0%, #2d1810 25%, #1f1611 50%, #0f0a08 100%)
                `,
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                fontFamily: '"Spectral", "Cormorant Garamond", "Times New Roman", serif',
                '&::before': {
                  content: '""',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `
                    url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")
                  `,
                  pointerEvents: 'none',
                  zIndex: -1,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                background: `
                  linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%),
                  url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.05'%3E%3Cpolygon points='10,0 15,8 10,16 5,8'/%3E%3C/g%3E%3C/svg%3E")
                `,
                borderRadius: '12px',
                border: '1px solid rgba(212,175,55,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: '"Philosopher", serif',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                  transition: 'left 0.6s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              },
              contained: {
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                border: '1px solid rgba(184,134,11,0.5)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F4E4BC 0%, #D4AF37 100%)',
                  transform: 'translateY(-1px)',
                },
              },
              outlined: {
                border: '2px solid rgba(212,175,55,0.6)',
                '&:hover': {
                  border: '2px solid rgba(212,175,55,0.8)',
                  background: 'rgba(212,175,55,0.1)',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: `
                  linear-gradient(135deg, rgba(26,15,10,0.95) 0%, rgba(45,24,16,0.98) 100%)
                `,
                borderBottom: '1px solid rgba(212,175,55,0.2)',
                boxShadow: '0 2px 20px rgba(0,0,0,0.3)',
              },
            },
          },
        },
      });
    } else {
      // Light theme
      return createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#8B4513',
            light: '#CD853F',
            dark: '#654321',
          },
          secondary: {
            main: '#B8860B',
            light: '#DAA520',
            dark: '#8B6914',
          },
          background: {
            default: '#FAF6F0',
            paper: '#F7F3ED',
          },
          text: {
            primary: '#2E1A11',
            secondary: '#5D3A2B',
          },
        },
        typography: {
          ...baseTypography,
          h1: {
            ...baseTypography.h1,
            background: 'linear-gradient(135deg, #8B4513, #CD853F, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          },
          h2: {
            ...baseTypography.h2,
            color: '#8B4513',
          },
          h3: {
            ...baseTypography.h3,
            color: '#654321',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                background: `
                  radial-gradient(ellipse at top, rgba(139,69,19,0.05) 0%, transparent 70%),
                  radial-gradient(ellipse at bottom, rgba(184,134,11,0.08) 0%, transparent 70%),
                  linear-gradient(135deg, #FAF6F0 0%, #F7F3ED 25%, #F5F1EA 50%, #F2EEE6 100%)
                `,
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                fontFamily: '"Spectral", "Cormorant Garamond", "Times New Roman", serif',
                '&::before': {
                  content: '""',
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `
                    url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4513' fill-opacity='0.02'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")
                  `,
                  pointerEvents: 'none',
                  zIndex: -1,
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                background: `
                  linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(247,243,237,0.98) 100%),
                  url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238B4513' fill-opacity='0.03'%3E%3Cpolygon points='10,0 15,8 10,16 5,8'/%3E%3C/g%3E%3C/svg%3E")
                `,
                borderRadius: '12px',
                border: '1px solid rgba(139,69,19,0.1)',
                boxShadow: '0 4px 16px rgba(139,69,19,0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  border: '1px solid rgba(139,69,19,0.2)',
                  boxShadow: '0 8px 24px rgba(139,69,19,0.15)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontFamily: '"Philosopher", serif',
                fontWeight: 700,
                textTransform: 'none',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.6s ease',
                },
                '&:hover::before': {
                  left: '100%',
                },
              },
              contained: {
                background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
                border: '1px solid rgba(101,67,33,0.5)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #CD853F 0%, #8B4513 100%)',
                  transform: 'translateY(-1px)',
                },
              },
              outlined: {
                border: '2px solid rgba(139,69,19,0.6)',
                '&:hover': {
                  border: '2px solid rgba(139,69,19,0.8)',
                  background: 'rgba(139,69,19,0.05)',
                },
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                background: `
                  linear-gradient(135deg, rgba(247,243,237,0.95) 0%, rgba(245,241,234,0.98) 100%)
                `,
                borderBottom: '1px solid rgba(139,69,19,0.1)',
                boxShadow: '0 2px 20px rgba(139,69,19,0.1)',
                color: '#2E1A11',
              },
            },
          },
        },
      });
    }
  };

  const theme = getTheme(currentTheme);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;