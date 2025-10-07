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
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore,
  Download,
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
  const [selectedYantra, setSelectedYantra] = useState('');
  const [selectedReference, setSelectedReference] = useState('jaipur');
  const [availableReferences, setAvailableReferences] = useState({});
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

  // Fetch available references when yantra type changes
  useEffect(() => {
    if (selectedYantra) {
      fetchAvailableReferences(selectedYantra);
    }
  }, [selectedYantra]);

  const fetchAvailableReferences = async (yantraType) => {
    try {
      console.log('Fetching references for:', yantraType);
      const response = await fetch(`http://localhost:8000/yantras/${yantraType}/references`);
      const data = await response.json();
      console.log('References response:', data);
      setAvailableReferences(data.references || {});
      // Set default reference to first available
      const firstRef = Object.keys(data.references || {})[0];
      if (firstRef) {
        setSelectedReference(firstRef);
      }
    } catch (err) {
      console.error('Error fetching references:', err);
      // Set fallback references
      setAvailableReferences({
        jaipur: { name: 'Jaipur', latitude: 26.91, longitude: 75.79, elevation: 431 },
        delhi: { name: 'Delhi', latitude: 28.61, longitude: 77.21, elevation: 216 },
        ujjain: { name: 'Ujjain', latitude: 23.18, longitude: 75.79, elevation: 492 }
      });
      setSelectedReference('jaipur');
    }
  };

  const fetchAvailableYantras = async () => {
    try {
      const response = await fetch('http://localhost:8000/yantras/available');
      const data = await response.json();
      setAvailableYantras(data.yantras);
    } catch (err) {
      console.log('Using default yantra types');
      setAvailableYantras([
        { id: 'samrat_yantra', name: 'Samrat Yantra (Great Sundial)', description: 'The largest and most accurate sundial for local solar time' },
        { id: 'rama_yantra', name: 'Rama Yantra (Cylindrical)', description: 'Cylindrical instrument for measuring altitude and azimuth' },
        { id: 'jai_prakash_yantra', name: 'Jai Prakash Yantra', description: 'Hemispherical sundial for celestial coordinate measurement' },
        { id: 'digamsa_yantra', name: 'Digamsa Yantra', description: 'Azimuth-altitude measuring instrument' },
        { id: 'dhruva_protha_chakra', name: 'Dhruva-Protha-Chakra', description: 'Pole circle for latitude determination' },
        { id: 'kapala_yantra', name: 'Kapala Yantra', description: 'Bowl sundial for time measurement' },
        { id: 'chakra_yantra', name: 'Chakra Yantra', description: 'Ring dial for solar observations' },
        { id: 'unnatamsa_yantra', name: 'Unnatamsa Yantra', description: 'Solar altitude measuring instrument' }
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
          yantra_type: selectedYantra,
          reference_location: selectedReference || 'jaipur',
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

  // Helper function to convert full yantra name to short format for 3D viewer
  const getShortYantraType = (fullType) => {
    return fullType.replace('_yantra', '');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#f5f5dc', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
        Yantra Generator
      </Typography>
      
      <Typography variant="h6" align="center" sx={{ color: '#d7ccc8', opacity: 0.9, mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
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
                  <MenuItem value="">
                    <em>Select a Yantra Type</em>
                  </MenuItem>
                  {availableYantras.map((yantra) => (
                    <MenuItem key={yantra.id} value={yantra.id}>
                      {yantra.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Historical Reference Selection */}
              {selectedYantra && (
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Historical Reference</InputLabel>
                  <Select
                    value={selectedReference}
                    onChange={(e) => setSelectedReference(e.target.value)}
                    label="Historical Reference"
                  >
                    {Object.entries(availableReferences).map(([key, ref]) => (
                      <MenuItem key={key} value={key}>
                        {ref.name} ({ref.latitude?.toFixed(1)}°N, {ref.longitude?.toFixed(1)}°E)
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Debug Info */}
              {selectedYantra && (
                <Alert severity="info" sx={{ mb: 3, fontSize: '0.9rem' }}>
                  <strong>Debug:</strong> Yantra: {selectedYantra} | References: {Object.keys(availableReferences).length} | Selected: {selectedReference}
                </Alert>
              )}

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
                      yantraType={getShortYantraType(selectedYantra)} 
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
                      {/* Header with yantra info */}
                      <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, borderLeft: '4px solid', borderLeftColor: 'primary.main' }}>
                        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                          {yantraSpecs.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Generated for {yantraSpecs.coordinates?.latitude}°N, {yantraSpecs.coordinates?.longitude}°E
                        </Typography>
                      </Box>

                      {/* Key Dimensions Cards */}
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'primary.main' }}>
                        <Architecture color="primary" />
                        Primary Dimensions
                      </Typography>
                      
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {Object.entries(yantraSpecs.dimensions || {}).slice(0, 6).map(([key, value]) => (
                          <Grid item xs={12} sm={6} md={4} key={key}>
                            <Card sx={{ 
                              bgcolor: 'background.paper', 
                              border: '1px solid',
                              borderColor: 'divider',
                              '&:hover': { 
                                bgcolor: 'action.hover', 
                                transform: 'translateY(-2px)',
                                borderColor: 'primary.light'
                              },
                              transition: 'all 0.3s ease'
                            }}>
                              <CardContent sx={{ p: 2 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                                  {key.replace(/_/g, ' ')}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                  {typeof value === 'number' ? `${value.toFixed(2)}m` : value}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>

                      {/* Accuracy Metrics */}
                      {yantraSpecs.accuracy_metrics && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                            <Timeline color="primary" />
                            Accuracy & Performance
                          </Typography>
                          <Grid container spacing={2}>
                            {Object.entries(yantraSpecs.accuracy_metrics).map(([key, value]) => (
                              <Grid item xs={12} sm={6} key={key}>
                                <Box sx={{ 
                                  p: 2, 
                                  bgcolor: 'primary.light', 
                                  borderRadius: 2,
                                  border: '1px solid',
                                  borderColor: 'primary.main',
                                  opacity: 0.8
                                }}>
                                  <Typography variant="body2" color="primary.dark" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    {key.replace(/_/g, ' ').toUpperCase()}
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                                    {typeof value === 'number' ? 
                                      (key.includes('latitude') || key.includes('longitude') ? `${value.toFixed(2)}°` :
                                       key.includes('minutes') ? `±${value}min` :
                                       key.includes('degrees') ? `±${value}°` :
                                       key.includes('hours') ? `${value}hrs` : value) 
                                      : value}
                                  </Typography>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      )}

                      {/* Angular Measurements */}
                      {yantraSpecs.angles && Object.keys(yantraSpecs.angles).length > 0 && (
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography variant="h6" sx={{ color: 'secondary.main' }}>Angular Measurements</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              {Object.entries(yantraSpecs.angles).map(([key, value]) => (
                                <Grid item xs={12} sm={6} md={4} key={key}>
                                  <Box sx={{ 
                                    p: 2, 
                                    bgcolor: 'secondary.light',
                                    borderRadius: 2,
                                    border: '1px solid',
                                    borderColor: 'secondary.main',
                                    opacity: 0.8
                                  }}>
                                    <Typography variant="body2" color="secondary.dark" sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                                      {key.replace(/_/g, ' ').toUpperCase()}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>
                                      {typeof value === 'number' ? `${value.toFixed(2)}°` : value}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      )}

                      {/* Complete Dimensions Table */}
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6" sx={{ color: 'primary.dark' }}>Complete Dimensions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ 
                            p: 2, 
                            bgcolor: 'background.paper', 
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider'
                          }}>
                            <Grid container spacing={1}>
                              {Object.entries(yantraSpecs.dimensions || {}).map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                  <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    p: 1,
                                    '&:hover': { bgcolor: 'action.hover' },
                                    borderRadius: 1
                                  }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                      {key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}:
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 'bold' }}>
                                      {typeof value === 'number' ? `${value.toFixed(3)}m` : value}
                                    </Typography>
                                  </Box>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                      
                      {/* Construction Notes */}
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="h6" sx={{ color: 'primary.dark' }}>Construction Guide</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                              📐 Material Recommendations
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2, opacity: 0.7 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Base Structure:</Typography>
                                  <Typography variant="body2" color="primary.dark">• Sandstone or marble for stability</Typography>
                                  <Typography variant="body2" color="primary.dark">• Foundation: Reinforced concrete</Typography>
                                  <Typography variant="body2" color="primary.dark">• Thickness: Minimum 0.5m</Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2, opacity: 0.7 }}>
                                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>Precision Components:</Typography>
                                  <Typography variant="body2" color="secondary.dark">• Gnomon: Brass or copper</Typography>
                                  <Typography variant="body2" color="secondary.dark">• Markings: Engraved stone/metal</Typography>
                                  <Typography variant="body2" color="secondary.dark">• Surface: Smooth polished finish</Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                          
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                              🧭 Alignment Instructions
                            </Typography>
                            <Box sx={{ p: 2, bgcolor: 'primary.light', borderRadius: 2, opacity: 0.6 }}>
                              <Typography variant="body2" sx={{ mb: 1, color: 'primary.dark' }}>• Orient gnomon along true north-south meridian</Typography>
                              <Typography variant="body2" sx={{ mb: 1, color: 'primary.dark' }}>• Ensure base is perfectly level using spirit level</Typography>
                              <Typography variant="body2" sx={{ mb: 1, color: 'primary.dark' }}>• Account for local magnetic declination</Typography>
                              <Typography variant="body2" sx={{ mb: 1, color: 'primary.dark' }}>• Verify accuracy with GPS coordinates</Typography>
                              <Typography variant="body2" color="primary.dark">• Test with known solar noon time</Typography>
                            </Box>
                          </Box>

                          {yantraSpecs.construction_notes && yantraSpecs.construction_notes.length > 0 && (
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                                🔧 Specific Construction Notes
                              </Typography>
                              <Box sx={{ p: 2, bgcolor: 'secondary.light', borderRadius: 2, opacity: 0.7 }}>
                                {yantraSpecs.construction_notes.map((note, index) => (
                                  <Typography key={index} variant="body2" sx={{ mb: 1, color: 'secondary.dark' }}>
                                    • {note}
                                  </Typography>
                                ))}
                              </Box>
                            </Box>
                          )}
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