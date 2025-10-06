import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Slider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  ExpandMore,
  LocationOn,
  Settings,
  Download,
  Visibility,
  Science
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  setCoordinates,
  setSelectedYantraType,
  setScaleFactor,
  setYantraSpecs,
  setLoading,
  setError
} from '../store/yantraSlice';
import YantraViewer3D from '../components/YantraViewer3D';

const YantraGenerator = () => {
  const dispatch = useDispatch();
  const {
    coordinates,
    selectedYantraType,
    scaleFactor,
    yantraSpecs,
    loading,
    error,
    availableYantras
  } = useSelector((state) => state.yantra);

  const [localCoords, setLocalCoords] = useState(coordinates);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    // Get user's current location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            elevation: 0
          };
          setLocalCoords(newCoords);
          dispatch(setCoordinates(newCoords));
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, [dispatch]);

  const validateCoordinates = () => {
    const { latitude, longitude } = localCoords;
    
    if (latitude < -90 || latitude > 90) {
      setValidationError('Latitude must be between -90 and 90 degrees');
      return false;
    }
    
    if (longitude < -180 || longitude > 180) {
      setValidationError('Longitude must be between -180 and 180 degrees');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleGenerate = async () => {
    if (!validateCoordinates()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await axios.post('/yantras/generate', {
        coordinates: localCoords,
        yantra_type: selectedYantraType,
        scale_factor: scaleFactor
      });

      dispatch(setYantraSpecs(response.data));
      dispatch(setCoordinates(localCoords));
    } catch (err) {
      dispatch(setError(err.response?.data?.detail || 'Failed to generate yantra'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.get(`/yantras/export/${selectedYantraType}`, {
        params: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          elevation: coordinates.elevation,
          format: format
        }
      });

      // Create and download file
      const blob = new Blob([response.data.content], {
        type: format === 'json' ? 'application/json' : 'text/plain'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedYantraType}_${coordinates.latitude}_${coordinates.longitude}.${format === 'json' ? 'json' : 'txt'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      dispatch(setError('Failed to export blueprint'));
    }
  };

  const selectedYantra = availableYantras.find(y => y.id === selectedYantraType);

  return (
    <Container maxWidth="xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ mb: 4, color: 'white', fontWeight: 'bold' }}
        >
          🌌 Yantra Generator
        </Typography>

        <Grid container spacing={4}>
          {/* Input Panel */}
          <Grid item xs={12} lg={4}>
            <Card className="coordinate-input">
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn /> Coordinates & Settings
                </Typography>

                {/* Coordinate Inputs */}
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Latitude"
                    type="number"
                    value={localCoords.latitude}
                    onChange={(e) => setLocalCoords({
                      ...localCoords,
                      latitude: parseFloat(e.target.value) || 0
                    })}
                    inputProps={{ min: -90, max: 90, step: 0.0001 }}
                    sx={{ mb: 2 }}
                    helperText="Degrees (-90 to 90)"
                  />
                  
                  <TextField
                    fullWidth
                    label="Longitude"
                    type="number"
                    value={localCoords.longitude}
                    onChange={(e) => setLocalCoords({
                      ...localCoords,
                      longitude: parseFloat(e.target.value) || 0
                    })}
                    inputProps={{ min: -180, max: 180, step: 0.0001 }}
                    sx={{ mb: 2 }}
                    helperText="Degrees (-180 to 180)"
                  />
                  
                  <TextField
                    fullWidth
                    label="Elevation"
                    type="number"
                    value={localCoords.elevation}
                    onChange={(e) => setLocalCoords({
                      ...localCoords,
                      elevation: parseFloat(e.target.value) || 0
                    })}
                    sx={{ mb: 2 }}
                    helperText="Meters above sea level"
                  />
                </Box>

                {/* Yantra Type Selection */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Yantra Type</InputLabel>
                  <Select
                    value={selectedYantraType}
                    onChange={(e) => dispatch(setSelectedYantraType(e.target.value))}
                  >
                    {availableYantras.map((yantra) => (
                      <MenuItem key={yantra.id} value={yantra.id}>
                        {yantra.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Selected Yantra Info */}
                {selectedYantra && (
                  <Paper sx={{ p: 2, mb: 3, bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {selectedYantra.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {selectedYantra.description}
                    </Typography>
                    <Chip 
                      label={`Accuracy: ${selectedYantra.accuracy}`}
                      size="small"
                      sx={{ bgcolor: 'white', color: 'primary.main' }}
                    />
                  </Paper>
                )}

                {/* Scale Factor */}
                <Box sx={{ mb: 3 }}>
                  <Typography gutterBottom>Scale Factor: {scaleFactor}x</Typography>
                  <Slider
                    value={scaleFactor}
                    onChange={(e, value) => dispatch(setScaleFactor(value))}
                    min={0.1}
                    max={5.0}
                    step={0.1}
                    marks={[
                      { value: 0.5, label: '0.5x' },
                      { value: 1.0, label: '1x' },
                      { value: 2.0, label: '2x' },
                      { value: 5.0, label: '5x' }
                    ]}
                  />
                </Box>

                {/* Error Display */}
                {(validationError || error) && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {validationError || error}
                  </Alert>
                )}

                {/* Generate Button */}
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleGenerate}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <Science />}
                  sx={{ mb: 2 }}
                >
                  {loading ? 'Generating...' : 'Generate Yantra'}
                </Button>

                {/* Export Buttons */}
                {yantraSpecs && (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleExport('blueprint')}
                      startIcon={<Download />}
                      size="small"
                    >
                      Blueprint
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => handleExport('json')}
                      startIcon={<Download />}
                      size="small"
                    >
                      JSON
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Results Panel */}
          <Grid item xs={12} lg={8}>
            {yantraSpecs ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* 3D Visualization */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Visibility /> 3D Visualization
                    </Typography>
                    <YantraViewer3D 
                      yantraSpecs={yantraSpecs}
                      yantraType={selectedYantraType}
                    />
                  </CardContent>
                </Card>

                {/* Specifications */}
                <Card>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Settings /> Generated Specifications
                    </Typography>

                    {/* Dimensions */}
                    <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Dimensions</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {Object.entries(yantraSpecs.dimensions).map(([key, value]) => (
                            <Grid item xs={6} sm={4} key={key}>
                              <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                  {key.replace(/_/g, ' ').toUpperCase()}
                                </Typography>
                                <Typography variant="h6" color="primary">
                                  {value.toFixed(2)}m
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    {/* Angles */}
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Angles</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {Object.entries(yantraSpecs.angles).map(([key, value]) => (
                            <Grid item xs={6} sm={4} key={key}>
                              <Paper sx={{ p: 2, textAlign: 'center' }}>
                                <Typography variant="body2" color="textSecondary">
                                  {key.replace(/_/g, ' ').toUpperCase()}
                                </Typography>
                                <Typography variant="h6" color="secondary">
                                  {value.toFixed(2)}°
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>

                    {/* Construction Notes */}
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Construction Notes</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box component="ol" sx={{ pl: 2 }}>
                          {yantraSpecs.construction_notes.map((note, index) => (
                            <Box component="li" key={index} sx={{ mb: 1 }}>
                              <Typography>{note}</Typography>
                            </Box>
                          ))}
                        </Box>
                      </AccordionDetails>
                    </Accordion>

                    {/* Accuracy Metrics */}
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h6">Accuracy Metrics</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {Object.entries(yantraSpecs.accuracy_metrics).map(([key, value]) => (
                            <Grid item xs={6} sm={4} key={key}>
                              <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                                <Typography variant="body2" color="textSecondary">
                                  {key.replace(/_/g, ' ').toUpperCase()}
                                </Typography>
                                <Typography variant="h6" color="success.dark">
                                  ±{value}
                                </Typography>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <Card sx={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Science sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
                    Ready to Generate Your Yantra
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Enter your coordinates and select a yantra type to begin
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default YantraGenerator;