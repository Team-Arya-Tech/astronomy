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
  ThreeDRotation,
  Science,
  School,
  Timeline,
  Public
} from '@mui/icons-material';
import { motion } from 'framer-motion';
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
      action: () => navigate('/visualization')
    },
    {
      icon: <Science fontSize="large" />,
      title: 'AI Manuscript Decoder',
      description: 'Convert ancient texts to mathematical formulas using AI',
      action: () => navigate('/docs')
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
    <Container maxWidth="xl">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 6, md: 10 },
            backgroundImage: 'url(/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            borderRadius: 4,
            mb: 6,
            border: '1px solid rgba(212,175,55,0.3)',
            color: 'white',
            minHeight: { xs: '60vh', md: '70vh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(145deg, rgba(0,0,0,0.6) 0%, rgba(45,24,16,0.8) 100%)',
              borderRadius: 4,
              zIndex: 1
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #CD7F32 0%, #B87333 20%, #DAA520 40%, #CD7F32 60%, #8B4513 80%, #A0522D 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              letterSpacing: '0.1em'
            }}
          >
            DIGIYANTRA
          </Typography>
          
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.4rem', md: '2rem' },
              mb: 3,
              color: '#FFFFFF',
              textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
              fontWeight: 500,
              letterSpacing: '0.02em'
            }}
          >
            Reviving Ancient Indian Astronomy through AI & Computational Geometry
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              mb: 5,
              maxWidth: '900px',
              mx: 'auto',
              color: '#F0F0F0',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Generate geometric dimensions of astronomical instruments (yantras) for any location on Earth. 
            Where heritage meets precision science.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/generator')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: 3,
                background: 'linear-gradient(45deg, #FFD700 20%, #D4AF37 90%)',
                color: '#000',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(184, 133, 5, 0.28)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FFA500 20%, #B8860B 90%)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(255,215,0,0.6)'
                }
              }}
            >
              Start Generating
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/visualization')}
              sx={{
                px: 5,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: 3,
                borderColor: '#FFFFFF',
                borderWidth: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  borderColor: '#FFD700',
                  backgroundColor: 'rgba(255,215,0,0.2)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 20px rgba(255,255,255,0.3)'
                }
              }}
            >
              View 3D Demo
            </Button>
          </Box>
          </Box>
        </Box>
      </motion.div>

      {/* Features Grid */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          color: '#F5E6D3',
          fontWeight: 'bold'
        }}
      >
        Revolutionary Features
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className="yantra-card"
                sx={{
                  height: '100%',
                  backgroundImage: 'url(/3.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  border: '1px solid rgba(212,175,55,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5)'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(145deg, rgba(45,24,16,0.85) 0%, rgba(31,22,17,0.90) 100%)',
                    borderRadius: 'inherit',
                    zIndex: 1
                  }
                }}
                onClick={feature.action}
              >
                <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                  <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.primary.main }}>
                    {feature.title}
                  </Typography>
                  
                  <Typography variant="body1" sx={{ flexGrow: 1, color: '#F5E6D3' }}>
                    {feature.description}
                  </Typography>
                  
                  <Button
                    variant="text"
                    sx={{ mt: 2, color: theme.palette.primary.main }}
                  >
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            background: 'linear-gradient(145deg, rgba(45,24,16,0.8) 0%, rgba(31,22,17,0.9) 100%)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            p: 4,
            textAlign: 'center',
            border: '1px solid rgba(212,175,55,0.2)',
            color: 'white'
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Heritage Meets Innovation
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>3+</Typography>
              <Typography variant="h6">Ancient Yantras</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>±2min</Typography>
              <Typography variant="h6">Time Accuracy</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>360°</Typography>
              <Typography variant="h6">Global Coverage</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>1000+</Typography>
              <Typography variant="h6">Years of Wisdom</Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default HomePage;