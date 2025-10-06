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
            py: { xs: 4, md: 8 },
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
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
              background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  transform: 'translateY(-2px)'
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
              View 3D Demo
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Features Grid */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 6,
          color: 'white',
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
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
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
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            p: 4,
            textAlign: 'center',
            color: 'white'
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Heritage Meets Innovation
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#42a5f5' }}>3+</Typography>
              <Typography variant="h6">Ancient Yantras</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#42a5f5' }}>±2min</Typography>
              <Typography variant="h6">Time Accuracy</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#42a5f5' }}>360°</Typography>
              <Typography variant="h6">Global Coverage</Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#42a5f5' }}>1000+</Typography>
              <Typography variant="h6">Years of Wisdom</Typography>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default HomePage;