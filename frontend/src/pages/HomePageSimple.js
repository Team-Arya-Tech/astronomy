import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  useTheme
} from '@mui/material';
import {
  Architecture,
  Science,
  School,
  Timeline,
  Public,
  ThreeDRotation
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Architecture fontSize="large" />,
      title: 'Parametric Design',
      description: 'Generate precise yantra dimensions for any latitude and longitude',
      action: () => navigate('/generator')
    },
    {
      icon: <ThreeDRotation fontSize="large" />,
      title: '3D Visualization',
      description: 'Interactive 3D models with real-time celestial simulations',
      action: () => navigate('/generator')
    },
    {
      icon: <Science fontSize="large" />,
      title: 'AI Manuscript Decoder',
      description: 'Convert ancient texts to mathematical formulas using AI',
      action: () => navigate('/ai')
    },
    {
      icon: <School fontSize="large" />,
      title: 'Educational Platform',
      description: 'Learn ancient Indian astronomy through modern technology',
      action: () => navigate('/docs')
    },
    {
      icon: <Timeline fontSize="large" />,
      title: 'Solar Tracking',
      description: 'Real-time astronomical calculations and accuracy verification',
      action: () => navigate('/generator')
    },
    {
      icon: <Public fontSize="large" />,
      title: 'AR Experience',
      description: 'Virtual Jantar Mantar in your location using WebAR',
      action: () => navigate('/ar')
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: 'center',
          py: { xs: 4, md: 8 },
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          borderRadius: 4,
          mb: 6,
          color: 'white'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 'bold',
            mb: 2
          }}
        >
          YANTRA.AI
        </Typography>
        
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.8rem' },
            mb: 3,
            opacity: 0.9
          }}
        >
          Reviving Ancient Indian Astronomy through AI & Computational Geometry
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            mb: 4,
            opacity: 0.8,
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          Generate geometric dimensions of astronomical instruments (yantras) for any location on Earth. 
          Where heritage meets precision science.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/generator')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.2)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Start Generating
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/ai')}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Try AI Decoder
          </Button>
        </Box>
      </Box>

      {/* Features Grid */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          color: theme.palette.primary.main,
          fontWeight: 'bold'
        }}
      >
        Revolutionary Features
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6
                }
              }}
              onClick={feature.action}
            >
              <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                  {feature.icon}
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
                  {feature.title}
                </Typography>
                
                <Typography variant="body1" sx={{ flexGrow: 1, color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
                
                <Button
                  variant="text"
                  sx={{ mt: 2, color: theme.palette.primary.main }}
                >
                  Try Now →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Stats Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e3f2fd 100%)',
          borderRadius: 4,
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: theme.palette.primary.main }}>
          Heritage Meets Innovation
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>12+</Typography>
            <Typography variant="h6">Ancient Yantras</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>±2min</Typography>
            <Typography variant="h6">Time Accuracy</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>360°</Typography>
            <Typography variant="h6">Global Coverage</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>1000+</Typography>
            <Typography variant="h6">Years of Wisdom</Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(25, 118, 210, 0.1)', borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 2 }}>
            🏆 Ready for Smart India Hackathon 2025!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            ✅ Backend API Working (http://localhost:8000) <br/>
            ✅ Mathematical Engine Implemented <br/>
            ✅ Astronomical Calculations Ready <br/>
            ✅ Export Functionality Available <br/>
            ✅ Documentation Complete
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;