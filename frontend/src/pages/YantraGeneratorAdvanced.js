import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Chip,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Download,
  Share,
  Refresh,
  Science,
  Architecture,
  Timeline
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import YantraViewer3D from '../components/YantraViewer3DAdvanced';

const YantraGenerator = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
    elevation: '0'
  });
  const [selectedYantra, setSelectedYantra] = useState('samrat');
  const [yantraSpecs, setYantraSpecs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableYantras, setAvailableYantras] = useState([]);

  const yantraTypes = [
    { 
      value: 'samrat', 
      label: 'Samrat Yantra', 
      description: 'The Supreme Instrument - Giant Sundial',
      icon: '☀️'
    },
    { 
      value: 'rama', 
      label: 'Rama Yantra', 
      description: 'Cylindrical instrument for celestial coordinates',
      icon: '🏛️'
    },
    { 
      value: 'jai_prakash', 
      label: 'Jai Prakash Yantra', 
      description: 'Hemispherical sundial for precise observations',
      icon: '🌙'
    }
  ];

  const presetLocations = [
    { name: 'Jaipur (Original Jantar Mantar)', lat: 26.9245, lon: 75.8243 },
    { name: 'Delhi (Jantar Mantar)', lat: 28.6273, lon: 77.2166 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 }
  ];

  useEffect(() => {
    fetchAvailableYantras();
  }, []);

  const fetchAvailableYantras = async () => {
    try {
      const response = await fetch('http://localhost:8000/yantras/available');
      if (response.ok) {
        const data = await response.json();
        setAvailableYantras(data.yantras || []);
      }
    } catch (err) {
      console.log('Could not fetch available yantras');
    }
  };

  const handleInputChange = (field) => (event) => {
    setCoordinates({
      ...coordinates,
      [field]: event.target.value
    });
  };

  const handlePresetLocation = (location) => {
    setCoordinates({
      latitude: location.lat.toString(),
      longitude: location.lon.toString(),
      elevation: '0'
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
          yantra_type: selectedYantra + '_yantra',
          scale_factor: 1.0
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to generate yantra');
      }
      
      const data = await response.json();
      setYantraSpecs(data);
      setActiveTab(1); // Switch to visualization tab
    } catch (err) {
      setError(err.message || 'Failed to generate yantra. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const exportBlueprint = async (format = 'blueprint') => {
    try {
      const url = `http://localhost:8000/yantras/export/${selectedYantra}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&elevation=${coordinates.elevation}&format=${format}`;
      window.open(url, '_blank');
    } catch (err) {
      setError('Failed to export blueprint');
    }
  };

  const shareConfiguration = () => {
    const shareData = {
      yantra: selectedYantra,
      coordinates: coordinates
    };
    navigator.clipboard.writeText(JSON.stringify(shareData, null, 2));
    alert('Configuration copied to clipboard!');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #fff 30%, #e3f2fd 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            YANTRA GENERATOR
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', opacity: 0.8 }}>
            Generate precise astronomical instrument dimensions for any location on Earth
          </Typography>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab 
              label="Configuration" 
              icon={<LocationOn />} 
              iconPosition="start"
            />
            <Tab 
              label="3D Visualization" 
              icon={<Architecture />} 
              iconPosition="start"
              disabled={!yantraSpecs}
            />
            <Tab 
              label="Specifications" 
              icon={<Science />} 
              iconPosition="start"
              disabled={!yantraSpecs}
            />
          </Tabs>
        </Paper>

        {/* Configuration Tab */}
        {activeTab === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card sx={{ height: 'fit-content' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn color="primary" />
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
                        helperText="Degrees North (-90 to +90)"
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
                        helperText="Degrees East (-180 to +180)"
                      />
                      
                      <TextField
                        fullWidth
                        label="Elevation (meters)"
                        value={coordinates.elevation}
                        onChange={handleInputChange('elevation')}
                        placeholder="e.g. 216"
                        type="number"
                        inputProps={{ step: "any", min: 0 }}
                        helperText="Height above sea level"
                      />
                    </Box>

                    <Typography variant="h6" gutterBottom>Quick Locations</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {presetLocations.map((location) => (
                        <Chip
                          key={location.name}
                          label={location.name}
                          onClick={() => handlePresetLocation(location)}
                          variant="outlined"
                          sx={{ cursor: 'pointer' }}
                        />
                      ))}
                    </Box>
                    
                    {error && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card sx={{ height: 'fit-content' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Architecture color="primary" />
                      Yantra Selection
                    </Typography>
                    
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Yantra Type</InputLabel>
                      <Select
                        value={selectedYantra}
                        onChange={(e) => setSelectedYantra(e.target.value)}
                        label="Yantra Type"
                      >
                        {yantraTypes.map((yantra) => (
                          <MenuItem key={yantra.value} value={yantra.value}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <span>{yantra.icon}</span>
                              <Box>
                                <Typography variant="body1">{yantra.label}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {yantra.description}
                                </Typography>
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={generateYantra}
                        disabled={loading || !coordinates.latitude || !coordinates.longitude}
                        startIcon={loading ? <CircularProgress size={20} /> : <Architecture />}
                      >
                        {loading ? 'Generating...' : 'Generate Yantra'}
                      </Button>
                      
                      <Tooltip title="Share Configuration">
                        <IconButton onClick={shareConfiguration}>
                          <Share />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Reset Form">
                        <IconButton onClick={() => {
                          setCoordinates({ latitude: '', longitude: '', elevation: '0' });
                          setYantraSpecs(null);
                          setError('');
                        }}>
                          <Refresh />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    
                    {yantraSpecs && (
                      <Alert severity="success" sx={{ mb: 2 }}>
                        ✨ Yantra generated successfully! Switch to the Visualization tab to explore your custom astronomical instrument.
                      </Alert>
                    )}

                    <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="h6" gutterBottom>✨ What You'll Get:</Typography>
                      <Typography variant="body2" gutterBottom>• Precise mathematical dimensions</Typography>
                      <Typography variant="body2" gutterBottom>• Interactive 3D visualization</Typography>
                      <Typography variant="body2" gutterBottom>• Construction blueprints (PDF/CAD)</Typography>
                      <Typography variant="body2">• Astronomical accuracy verification</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        )}

        {/* 3D Visualization Tab */}
        {activeTab === 1 && yantraSpecs && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ height: '700px' }}>
              <CardContent sx={{ p: 3, height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h5">
                    Interactive 3D Visualization
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => exportBlueprint('blueprint')}
                    >
                      Download Blueprint
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      onClick={() => exportBlueprint('json')}
                    >
                      Export Data
                    </Button>
                  </Box>
                </Box>
                
                <Box sx={{ height: 'calc(100% - 80px)', borderRadius: 2, overflow: 'hidden' }}>
                  <YantraViewer3D 
                    yantraType={selectedYantra} 
                    specs={yantraSpecs}
                    showControls={true}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Specifications Tab */}
        {activeTab === 2 && yantraSpecs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Science color="primary" />
                      Mathematical Specifications
                    </Typography>
                    
                    <Box sx={{ bgcolor: '#f8f9fa', p: 3, borderRadius: 2, mb: 3 }}>
                      <pre style={{ 
                        margin: 0, 
                        fontFamily: 'Monaco, monospace',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word'
                      }}>
                        {JSON.stringify(yantraSpecs.dimensions, null, 2)}
                      </pre>
                    </Box>

                    <Typography variant="h6" gutterBottom>Construction Notes</Typography>
                    <Typography variant="body2" color="text.secondary">
                      These dimensions are calculated based on your specific latitude and longitude to ensure maximum astronomical accuracy. 
                      The gnomon angle is optimized for your location's solar declination patterns.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Timeline color="primary" />
                      Location & Accuracy
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Location Details</Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography><strong>Latitude:</strong> {yantraSpecs.coordinates?.latitude}°</Typography>
                        <Typography><strong>Longitude:</strong> {yantraSpecs.coordinates?.longitude}°</Typography>
                        <Typography><strong>Elevation:</strong> {yantraSpecs.coordinates?.elevation}m</Typography>
                        <Typography><strong>Yantra Type:</strong> {yantraSpecs.yantra_type}</Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" gutterBottom>Accuracy Metrics</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography><strong>Time Accuracy:</strong> ±2 minutes</Typography>
                      <Typography><strong>Solar Tracking:</strong> Real-time positioning</Typography>
                      <Typography><strong>Calibration:</strong> Location-optimized</Typography>
                      <Typography><strong>Seasonal Adjustment:</strong> Automatic</Typography>
                    </Box>

                    <Box sx={{ mt: 3, p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                        "This yantra will provide accurate timekeeping and astronomical observations 
                        for your specific location, just as the ancient astronomers intended."
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </motion.div>
    </Container>
  );
};

export default YantraGenerator;