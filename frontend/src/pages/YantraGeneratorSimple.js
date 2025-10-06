import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import YantraViewer3D from '../components/YantraViewer3DSimple';

const YantraGenerator = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
    elevation: '0'
  });
  const [yantraSpecs, setYantraSpecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field) => (event) => {
    setCoordinates({
      ...coordinates,
      [field]: event.target.value
    });
  };

  const generateYantra = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8000/yantras/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coordinates: {
            latitude: parseFloat(coordinates.latitude),
            longitude: parseFloat(coordinates.longitude),
            elevation: parseFloat(coordinates.elevation)
          },
          yantra_type: 'samrat_yantra',
          scale_factor: 1.0
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate yantra');
      }
      
      const data = await response.json();
      setYantraSpecs(data);
    } catch (err) {
      setError('Failed to generate yantra. Make sure the backend is running on http://localhost:8000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        Yantra Generator
      </Typography>
      
      <Typography variant="h6" align="center" sx={{ color: 'white', opacity: 0.8, mb: 4 }}>
        Generate precise astronomical instrument dimensions for any location
      </Typography>

      <Grid container spacing={4}>
        {/* Input Panel */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Location Coordinates
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Latitude"
                  value={coordinates.latitude}
                  onChange={handleInputChange('latitude')}
                  placeholder="e.g. 28.6139"
                  type="number"
                  inputProps={{ step: "any", min: -90, max: 90 }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Longitude"
                  value={coordinates.longitude}
                  onChange={handleInputChange('longitude')}
                  placeholder="e.g. 77.2090"
                  type="number"
                  inputProps={{ step: "any", min: -180, max: 180 }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  label="Elevation (meters)"
                  value={coordinates.elevation}
                  onChange={handleInputChange('elevation')}
                  placeholder="e.g. 216"
                  type="number"
                  inputProps={{ step: "any", min: 0 }}
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={generateYantra}
                disabled={loading || !coordinates.latitude || !coordinates.longitude}
                sx={{ mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Yantra'}
              </Button>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              {yantraSpecs && (
                <Alert severity="success">
                  Yantra generated successfully! View the 3D model and specifications.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* 3D Visualization */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '500px' }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                3D Yantra Visualization
              </Typography>
              
              {yantraSpecs ? (
                <YantraViewer3D 
                  yantraType="samrat" 
                  specs={yantraSpecs}
                />
              ) : (
                <Box 
                  sx={{ 
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Generate a yantra to see the 3D visualization
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Specifications Panel */}
        {yantraSpecs && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Yantra Specifications
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Dimensions
                    </Typography>
                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                      <pre style={{ margin: 0, fontFamily: 'monospace' }}>
                        {JSON.stringify(yantraSpecs.dimensions, null, 2)}
                      </pre>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Location Info
                    </Typography>
                    <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
                      <Typography><strong>Latitude:</strong> {yantraSpecs.coordinates?.latitude}°</Typography>
                      <Typography><strong>Longitude:</strong> {yantraSpecs.coordinates?.longitude}°</Typography>
                      <Typography><strong>Elevation:</strong> {yantraSpecs.coordinates?.elevation}m</Typography>
                      <Typography><strong>Type:</strong> {yantraSpecs.yantra_type}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => window.open(`http://localhost:8000/yantras/export/samrat?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&elevation=${coordinates.elevation}&format=blueprint`, '_blank')}
                  >
                    Download Blueprint
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={() => window.open(`http://localhost:8000/yantras/export/samrat?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&elevation=${coordinates.elevation}&format=json`, '_blank')}
                  >
                    Export JSON
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default YantraGenerator;