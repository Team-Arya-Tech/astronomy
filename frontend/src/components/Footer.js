import React from 'react';
import {
  Box,
  Typography,
  Container
} from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        background: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" sx={{ mb: 1 }}>
          🌌 DIGIYANTRA - Reviving Ancient Science with AI Precision
        </Typography>
        <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.7)">
          Smart India Hackathon 2025 • Ancient Indian Astronomical Instruments Generator
        </Typography>
        <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.5)" sx={{ mt: 1 }}>
          "From Jantar Mantar to JavaScript — Rebuilding the Sky Tools of India"
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;