import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Documentation = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: 'center', py: 4, color: 'white' }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          📚 Documentation
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.8 }}>
          Learn about ancient Indian astronomical instruments and modern AI interpretation
        </Typography>
        <Typography variant="body1" sx={{ mt: 4, opacity: 0.6 }}>
          Documentation system under development - will include historical references and AI manuscript decoder
        </Typography>
      </Box>
    </Container>
  );
};

export default Documentation;