import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import YantraGenerator from './pages/YantraGeneratorFull';
import AIManuscriptDecoder from './pages/AIManuscriptDecoder';
import ARExperience from './pages/VRExperience';
import Documentation from './pages/Documentation';
import Footer from './components/Footer';

function App() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #3e2723 0%, #5d4037 25%, #8d6e63 50%, #a1887f 75%, #d7ccc8 100%)'
    }}>
      <Navbar />
      
      <Container 
        maxWidth="xl" 
        sx={{ 
          flex: 1, 
          py: 3,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<YantraGenerator />} />
          <Route path="/ai" element={<AIManuscriptDecoder />} />
          <Route path="/ar" element={<ARExperience />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/visualization" element={<YantraGenerator />} />
        </Routes>
      </Container>
      
      <Footer />
    </Box>
  );
}

export default App;