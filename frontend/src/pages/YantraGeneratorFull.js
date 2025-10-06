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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Paper,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  ExpandMore,
  Download,
  Share,
  ThreeDRotation,
  Architecture,
  Timeline,
  Visibility,
  GetApp
} from '@mui/icons-material';
import YantraViewer3D from '../components/YantraViewer3DAdvanced';

const YantraGenerator = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: '',
    elevation: '0'
  });
  const [selectedYantra, setSelectedYantra] = useState('samrat');
  const [yantraSpecs, setYantraSpecs] = useState(null);
  const [availableYantras, setAvailableYantras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [astronomicalData, setAstronomicalData] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch available yantra types on component mount
  useEffect(() => {
    fetchAvailableYantras();
  }, []);

  const fetchAvailableYantras = async () => {
    try {
      const response = await fetch('http://localhost:8000/yantras/available');
      const data = await response.json();
      setAvailableYantras(data.yantras);
    } catch (err) {
      console.log('Using default yantra types');
      setAvailableYantras([
        { name: 'samrat', display_name: 'Samrat Yantra (Great Sundial)', description: 'The largest and most accurate sundial for local solar time' },
        { name: 'rama', display_name: 'Rama Yantra (Cylindrical)', description: 'Cylindrical instrument for measuring altitude and azimuth' },
        { name: 'jai_prakash', display_name: 'Jai Prakash Yantra', description: 'Hemispherical sundial for celestial coordinate measurement' }
      ]);
    }
  };

  const handleInputChange = (field) => (event) => {
    setCoordinates({
      ...coordinates,
      [field]: event.target.value
    });
  };

  const generateYantra = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Generate yantra specifications
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
        throw new Error('Failed to generate yantra');
      }
      
      const data = await response.json();
      setYantraSpecs(data);
      
      // Fetch astronomical data
      await fetchAstronomicalData();
      
      setSuccess(`${data.yantra_type} yantra generated successfully for coordinates ${coordinates.latitude}°, ${coordinates.longitude}°`);
      
    } catch (err) {
      setError('Failed to generate yantra: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAstronomicalData = async () => {
    try {
      const response = await fetch('http://localhost:8000/astronomical/solar-position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: parseFloat(coordinates.latitude),
          longitude: parseFloat(coordinates.longitude),
          elevation: parseFloat(coordinates.elevation),
          datetime: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setAstronomicalData(data);
      }
    } catch (err) {
      console.log('Astronomical data not available');
    }
  };

  const exportBlueprint = async (format = 'blueprint') => {
    setExportLoading(true);
    try {
      const url = `http://localhost:8000/yantras/export/${selectedYantra}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&elevation=${coordinates.elevation}&format=${format}`;
      window.open(url, '_blank');
      setSuccess(`${format.toUpperCase()} export initiated successfully`);
    } catch (err) {
      setError('Export failed: ' + err.message);
    } finally {
      setExportLoading(false);
    }
  };

  const handleLocationPreset = (preset) => {
    const presets = {
      delhi: { latitude: '28.6139', longitude: '77.2090', elevation: '216' },
      mumbai: { latitude: '19.0760', longitude: '72.8777', elevation: '14' },
      jaipur: { latitude: '26.9124', longitude: '75.7873', elevation: '431' },
      bengaluru: { latitude: '12.9716', longitude: '77.5946', elevation: '920' }
    };
    setCoordinates(presets[preset]);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
        Yantra Generator
      </Typography>
      
      <Typography variant="h6" align="center" sx={{ color: 'white', opacity: 0.8, mb: 4 }}>
        Generate precise astronomical instrument dimensions for any location on Earth
      </Typography>

      <Grid container spacing={4}>
        {/* Input Panel */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Architecture color="primary" />
                Configuration
              </Typography>
              
              {/* Yantra Type Selection */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Yantra Type</InputLabel>
                <Select
                  value={selectedYantra}
                  onChange={(e) => setSelectedYantra(e.target.value)}
                  label="Yantra Type"
                >
                  {availableYantras.map((yantra) => (
                    <MenuItem key={yantra.name} value={yantra.name}>
                      {yantra.display_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Location Presets */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Quick Locations:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['delhi', 'mumbai', 'jaipur', 'bengaluru'].map((city) => (
                    <Chip
                      key={city}
                      label={city.charAt(0).toUpperCase() + city.slice(1)}
                      onClick={() => handleLocationPreset(city)}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
              </Box>
              
              {/* Coordinate Inputs */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Latitude"
                  value={coordinates.latitude}
                  onChange={handleInputChange('latitude')}
                  placeholder="e.g. 28.6139 (Delhi)"
                  type="number"
                  inputProps={{ step: "any", min: -90, max: 90 }}
                  sx={{ mb: 2 }}
                  helperText="Latitude in decimal degrees (-90 to 90)"
                />
                
                <TextField
                  fullWidth
                  label="Longitude"
                  value={coordinates.longitude}
                  onChange={handleInputChange('longitude')}
                  placeholder="e.g. 77.2090 (Delhi)"
                  type="number"
                  inputProps={{ step: "any", min: -180, max: 180 }}
                  sx={{ mb: 2 }}
                  helperText="Longitude in decimal degrees (-180 to 180)"
                />
                
                <TextField
                  fullWidth
                  label="Elevation (meters)"
                  value={coordinates.elevation}
                  onChange={handleInputChange('elevation')}
                  placeholder="e.g. 216 (Delhi)"
                  type="number"
                  inputProps={{ step: "any", min: 0 }}
                  helperText="Elevation above sea level in meters"
                />
              </Box>
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={generateYantra}
                disabled={loading || !coordinates.latitude || !coordinates.longitude}
                sx={{ mb: 2, py: 1.5 }}
                startIcon={loading ? <CircularProgress size={20} /> : <ThreeDRotation />}
              >
                {loading ? 'Generating...' : 'Generate Yantra'}
              </Button>
              
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}

              {/* Export Options */}
              {yantraSpecs && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>Export Options</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => exportBlueprint('blueprint')}
                        disabled={exportLoading}
                        startIcon={<Download />}
                        size="small"
                      >
                        PDF Blueprint
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => exportBlueprint('json')}
                        disabled={exportLoading}
                        startIcon={<GetApp />}
                        size="small"
                      >
                        JSON Data
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Astronomical Info Card */}
          {astronomicalData && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Timeline color="primary" />
                  Current Solar Position
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Azimuth:</strong> {astronomicalData.azimuth?.toFixed(1)}°
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      <strong>Altitude:</strong> {astronomicalData.altitude?.toFixed(1)}°
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Local Solar Time:</strong> {astronomicalData.local_solar_time}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '600px' }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                  <Tab label="3D Visualization" icon={<Visibility />} />
                  <Tab label="Specifications" icon={<Architecture />} />
                </Tabs>
              </Box>
              
              {activeTab === 0 && (
                <Box sx={{ height: '500px' }}>
                  {yantraSpecs ? (
                    <YantraViewer3D 
                      yantraType={selectedYantra} 
                      specs={yantraSpecs}
                      astronomicalData={astronomicalData}
                    />
                  ) : (
                    <Box 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        borderRadius: 2
                      }}
                    >
                      <ThreeDRotation sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" align="center">
                        Generate a yantra to see the interactive 3D visualization
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                        Enter coordinates and click "Generate Yantra"
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
              
              {activeTab === 1 && (
                <Box sx={{ height: '500px', overflow: 'auto' }}>
                  {yantraSpecs ? (
                    <Box>
                      <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Yantra Dimensions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                            <pre style={{ margin: 0, fontFamily: 'Consolas, monospace', fontSize: '0.875rem' }}>
                              {JSON.stringify(yantraSpecs.dimensions, null, 2)}
                            </pre>
                          </Paper>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Location Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography><strong>Latitude:</strong> {yantraSpecs.coordinates?.latitude}°</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography><strong>Longitude:</strong> {yantraSpecs.coordinates?.longitude}°</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography><strong>Elevation:</strong> {yantraSpecs.coordinates?.elevation}m</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography><strong>Type:</strong> {yantraSpecs.yantra_type}</Typography>
                            </Grid>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                      
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6">Construction Notes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography paragraph>
                            <strong>Material Recommendations:</strong>
                          </Typography>
                          <Typography component="div">
                            • Base: Sandstone or marble for stability<br/>
                            • Gnomon: Brass or copper for precision<br/>
                            • Markings: Engraved stone or metal inlays<br/>
                            • Foundation: Concrete with proper leveling
                          </Typography>
                          
                          <Typography paragraph sx={{ mt: 2 }}>
                            <strong>Alignment Instructions:</strong>
                          </Typography>
                          <Typography component="div">
                            • Orient gnomon true north-south<br/>
                            • Ensure base is perfectly level<br/>
                            • Account for magnetic declination<br/>
                            • Verify accuracy with GPS coordinates
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  ) : (
                    <Box 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center'
                      }}
                    >
                      <Architecture sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" align="center">
                        No specifications available
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                        Generate a yantra to view detailed specifications
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default YantraGenerator;