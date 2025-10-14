import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import YantraGenerator from './pages/YantraGeneratorFull';
import AIManuscriptDecoder from './pages/AIManuscriptDecoder';
import ARExperience from './pages/VRExperience';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Learn from './pages/Learn';
import Footer from './components/Footer';

function App() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
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
          <Route path="/learn" element={<Learn />} />
          <Route path="/visualization" element={<YantraGenerator />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      
      <Footer />
    </Box>
  );
}

export default App;