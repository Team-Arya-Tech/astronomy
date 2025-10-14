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
import YantraViewer2D from '../components/YantraViewer2D';

// Add CSS animation for marker bounce effect
const markerStyles = document.createElement('style');
markerStyles.textContent = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: rotate(-45deg) translateY(0); }
    40% { transform: rotate(-45deg) translateY(-10px); }
    60% { transform: rotate(-45deg) translateY(-5px); }
  }
`;
document.head.appendChild(markerStyles);

const YantraGenerator = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: '',
    longitude: ''
  });
  const [selectedYantra, setSelectedYantra] = useState('');
  const [yantraSpecs, setYantraSpecs] = useState(null);
  const [availableYantras, setAvailableYantras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [clickMarker, setClickMarker] = useState(null);
  const [astronomicalData, setAstronomicalData] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Fetch available yantra types on component mount
  useEffect(() => {
    fetchAvailableYantras();
  }, []);

  // Fetch available references when yantra type changes


  // Update map center when coordinates change
  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      setMapCenter({
        lat: parseFloat(coordinates.latitude),
        lng: parseFloat(coordinates.longitude)
      });
      // Clear click marker when coordinates change programmatically
      setClickMarker(null);
    }
  }, [coordinates.latitude, coordinates.longitude]);

  // Function to handle map clicks with better coordinate calculation
  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Store click position for marker
    setClickMarker({ x: x, y: y });
    
    // More accurate coordinate conversion
    const mapWidth = rect.width;
    const mapHeight = rect.height;
    
    // Use current map center and zoom level for calculation
    const zoom = 12; // Approximate zoom level
    const metersPerPixel = 156543.03392 * Math.cos(mapCenter.lat * Math.PI / 180) / Math.pow(2, zoom);
    
    // Calculate offset from center in meters
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    const offsetX = (x - centerX) * metersPerPixel;
    const offsetY = (centerY - y) * metersPerPixel;
    
    // Convert meters to degrees (approximate)
    const latOffset = offsetY / 111320; // meters per degree latitude
    const lngOffset = offsetX / (111320 * Math.cos(mapCenter.lat * Math.PI / 180));
    
    const newLat = mapCenter.lat + latOffset;
    const newLng = mapCenter.lng + lngOffset;
    
    // Update coordinates
    setCoordinates(prev => ({
      ...prev,
      latitude: newLat.toFixed(6),
      longitude: newLng.toFixed(6)
    }));
    
    setSuccess(`📍 Location selected: ${newLat.toFixed(4)}°N, ${newLng.toFixed(4)}°E`);
    setTimeout(() => setSuccess(''), 3000);
  };



  // Function to get detailed information about selected yantra
  const getYantraInfo = (yantraId) => {
    const yantraDetails = {
      samrat_yantra: {
        history: "Built by Maharaja Jai Singh II between 1724-1730 in his observatories across India. The largest sundial in the world, the Samrat Yantra at Jaipur stands 27 meters high and has a accuracy of 2 seconds.",
        about: "The Samrat Yantra is essentially a giant sundial that can tell local time to an accuracy of about 2 seconds. Its triangular wall (gnomon) casts a shadow on the curved scale, indicating solar time. The instrument demonstrates the advanced astronomical knowledge of 18th-century India.",
        construction: "Made of local stone and marble, with brass fittings for precision measurements. The gnomon is aligned with the Earth's axis, pointing towards the North Pole.",
        significance: "Represents the pinnacle of pre-telescopic astronomical instrumentation and showcases India's contribution to observational astronomy."
      },
      rama_yantra: {
        history: "Named after Lord Rama, this instrument was designed by Maharaja Jai Singh II as part of his comprehensive astronomical observatory system. Built in Jaipur and Delhi observatories in the early 18th century.",
        about: "The Rama Yantra consists of two identical cylindrical structures used to measure the altitude and azimuth of celestial objects. It can track stars and planets throughout their journey across the sky.",
        construction: "Two open cylindrical structures with graduated scales. Observers stand in the center to sight celestial objects and read measurements from the scaled walls.",
        significance: "Demonstrates sophisticated understanding of spherical astronomy and celestial coordinate systems used for navigation and calendar calculations."
      },
      digamsa_yantra: {
        history: "The Digamsa (direction measurement) Yantra was built as part of Jai Singh II's revolutionary approach to precise astronomical measurement, representing a fusion of Islamic and Hindu astronomical traditions.",
        about: "Specifically designed to measure azimuth angles of celestial objects. This instrument helps determine the exact directional bearing of stars, planets, and the sun from the observer's position.",
        construction: "Consists of a vertical circular wall with angular graduations and a central pillar for sighting. The instrument is precisely aligned with cardinal directions.",
        significance: "Essential for navigation, determining prayer directions (Qibla), and understanding the movement patterns of celestial bodies."
      },
      dhruva_protha_chakra_yantra: {
        history: "Named after Dhruva (Pole Star), this instrument was created to study the motion around the celestial pole. Built during the golden age of Indian astronomy in the 18th century.",
        about: "Used to determine the position of the Pole Star and measure the latitude of the observation site. The instrument tracks the apparent rotation of stars around the celestial north pole.",
        construction: "Features a circular ring structure aligned with the celestial pole, allowing observers to track polar star movements and determine geographical latitude.",
        significance: "Crucial for navigation, geographical surveying, and understanding the Earth's rotational motion relative to celestial sphere."
      },
      yantra_samrat: {
        history: "A revolutionary combination instrument created by Maharaja Jai Singh II, merging the precision of the Samrat Yantra with the polar measurements of the Dhruva-Protha-Chakra.",
        about: "This hybrid instrument provides comprehensive astronomical measurements, combining solar time calculation with stellar position tracking. It represents the pinnacle of Jai Singh's innovative approach to astronomical instrumentation.",
        construction: "Features both a large gnomon for solar measurements and polar alignment mechanisms for stellar observations, all integrated into a single sophisticated structure.",
        significance: "Represents the evolution of astronomical instruments and the integration of multiple measurement techniques for comprehensive celestial observations."
      },
      golayantra_chakra_yantra: {
        history: "Inspired by the ancient Indian concept of celestial spheres (Gola), this instrument was designed to model the three-dimensional movement of celestial objects on a two-dimensional surface.",
        about: "The Golayantra Chakra is designed to represent the celestial sphere and track the movement of stars, planets, and other celestial bodies across the sky throughout the year.",
        construction: "Consists of circular rings and spherical elements that model the celestial sphere, allowing observers to understand complex three-dimensional astronomical phenomena.",
        significance: "Demonstrates ancient Indian understanding of spherical astronomy and the ability to model complex celestial mechanics using geometric instruments."
      },
      bhitti_yantra: {
        history: "The wall sundial tradition in India dates back to ancient times, but Jai Singh's Bhitti Yantra represents a refined and enlarged version for enhanced accuracy and public use.",
        about: "A wall-mounted sundial that displays local solar time throughout the day. The shadow cast by the gnomon moves across the graduated wall surface indicating hours and minutes.",
        construction: "Built into or against a wall surface, with a triangular gnomon casting shadows on a graduated semicircular scale. Orientation and angle are precisely calculated for the local latitude.",
        significance: "Made accurate timekeeping accessible to the general public and demonstrated the practical application of astronomical knowledge in daily life."
      },
      dakshinottara_bhitti_yantra: {
        history: "This specialized wall sundial was designed to work specifically on north-south oriented walls, solving the challenge of timekeeping on differently oriented surfaces in Indian architecture.",
        about: "A wall sundial specifically designed for north-south walls, providing accurate time measurements regardless of the wall's orientation. It showcases advanced understanding of solar geometry.",
        construction: "Features specialized gnomon and scale arrangements adapted for north-south wall orientations, with mathematical corrections for accurate time display.",
        significance: "Shows sophisticated understanding of solar geometry and the ability to adapt astronomical instruments to architectural constraints."
      },
      rasivalaya_yantra: {
        history: "Built to track the twelve zodiacal signs (Rashi) and their influence on celestial events, representing the integration of astronomical observation with traditional Indian astrology.",
        about: "The Rasivalaya Yantra is designed to track the sun's movement through the twelve zodiacal constellations throughout the year, essential for creating accurate calendars and astrological calculations.",
        construction: "Features twelve separate structures, each representing one zodiacal sign, allowing precise tracking of the sun's annual journey through the zodiac.",
        significance: "Bridges observational astronomy with traditional calendar systems and demonstrates the practical application of zodiacal knowledge in timekeeping."
      },
      nadi_valaya_yantra: {
        history: "The ring dial concept has ancient origins, but Jai Singh's Nadi Valaya represents an enlarged and refined version for enhanced precision in time measurement.",
        about: "A sophisticated ring sundial that can measure time with remarkable precision. The instrument uses the principle of the sun's shadow falling through a ring to indicate time on graduated scales.",
        construction: "Consists of a large metal or stone ring with precise graduations, oriented and calibrated for the specific latitude of the observation site.",
        significance: "Demonstrates mastery of portable sundial principles scaled up for permanent installation and community use."
      },
      palaka_yantra: {
        history: "The board instrument represents one of the simpler yet effective designs in Jai Singh's observatory, focusing on practical astronomical computation and observation.",
        about: "A flat board instrument with various scales and markings for astronomical calculations and measurements. It serves as a computational aid for complex astronomical problems.",
        construction: "Features a flat surface with engraved scales, calculation aids, and measurement tools for various astronomical computations and observations.",
        significance: "Shows the importance of computational tools in astronomical practice and represents the bridge between observation and mathematical analysis."
      },
      chaapa_yantra: {
        history: "The arc instrument draws from ancient traditions of using curved surfaces for astronomical measurement, refined and enlarged by Jai Singh for enhanced accuracy.",
        about: "An arc-shaped instrument designed to measure celestial coordinates with high precision. The curved structure allows for accurate measurement of angles and positions of celestial objects.",
        construction: "Features a precisely constructed arc with detailed graduations, aligned for optimal measurement of celestial object positions and movements.",
        significance: "Represents the geometric principles underlying celestial measurement and demonstrates the use of curved surfaces for enhanced precision in astronomical observation."
      }
    };

    return yantraDetails[yantraId] || {
      history: "Select a yantra to learn about its fascinating history and construction details.",
      about: "Each yantra represents centuries of astronomical knowledge and engineering expertise.",
      construction: "These instruments showcase the advanced understanding of mathematics and astronomy in ancient India.",
      significance: "Jantar Mantar observatories stand as testimony to India's rich scientific heritage."
    };
  };

  const fetchAvailableYantras = async () => {
    // Define all 12 complete yantra types
    const completeYantraList = [
      { id: 'samrat_yantra', name: 'Samrat Yantra', description: 'The great sundial - most accurate timekeeping instrument' },
      { id: 'rama_yantra', name: 'Rama Yantra', description: 'Cylindrical instrument for measuring altitude and azimuth' },
      { id: 'digamsa_yantra', name: 'Digamsa Yantra', description: 'Azimuth measuring instrument for directional calculations' },
      { id: 'dhruva_protha_chakra_yantra', name: 'Dhruva-Protha-Chakra Yantra', description: 'Pole circle instrument for latitude and celestial navigation' },
      { id: 'yantra_samrat', name: 'Yantra-Samrat (Combination of Samrat Yantra and Dhruva-Protha-Chakra Yantra)', description: 'Combined instrument for comprehensive astronomical measurements' },
      { id: 'golayantra_chakra_yantra', name: 'Golayantra Chakra Yantra', description: 'Spherical ring instrument for celestial sphere calculations' },
      { id: 'bhitti_yantra', name: 'Bhitti Yantra', description: 'Wall-mounted sundial for local time measurements' },
      { id: 'dakshinottara_bhitti_yantra', name: 'Dakshinottara Bhitti Yantra', description: 'North-South wall sundial for meridian observations' },
      { id: 'rasivalaya_yantra', name: 'Rasivalaya Yantra', description: 'Zodiacal instrument for tracking celestial movements' },
      { id: 'nadi_valaya_yantra', name: 'Nadi Valaya Yantra', description: 'Ring dial instrument for precise time calculations' },
      { id: 'palaka_yantra', name: 'Palaka Yantra', description: 'Board instrument for astronomical computations' },
      { id: 'chaapa_yantra', name: 'Chaapa Yantra', description: 'Arc instrument for measuring celestial coordinates' }
    ];

    try {
      const response = await fetch('http://localhost:8000/yantras/available');
      const data = await response.json();
      
      // If API returns data, merge with our complete list to ensure all 12 are available
      if (data.yantras && data.yantras.length > 0) {
        // Use API data but ensure we have all 12 yantras
        const apiYantras = data.yantras;
        const mergedYantras = completeYantraList.map(defaultYantra => {
          const apiYantra = apiYantras.find(y => y.id === defaultYantra.id);
          return apiYantra || defaultYantra;
        });
        setAvailableYantras(mergedYantras);
      } else {
        setAvailableYantras(completeYantraList);
      }
    } catch (err) {
      console.log('Using complete default yantra types (all 12)');
      setAvailableYantras(completeYantraList);
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
            longitude: parseFloat(coordinates.longitude)
          },
          yantra_type: selectedYantra,
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
      const url = `http://localhost:8000/yantras/export/${selectedYantra}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&format=${format}`;
      
      if (format === 'pdf' || format === 'svg') {
        // For binary formats, download directly
        const response = await fetch(url);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `yantra_${selectedYantra}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else {
        // For other formats, open in new tab
        window.open(url, '_blank');
      }
      
      setSuccess(`${format.toUpperCase()} export completed successfully`);
    } catch (err) {
      setError('Export failed: ' + err.message);
    } finally {
      setExportLoading(false);
    }
  };

  const handleLocationPreset = (preset) => {
    const presets = {
      delhi: { latitude: '28.6139', longitude: '77.2090' },
      mumbai: { latitude: '19.0760', longitude: '72.8777' },
      jaipur: { latitude: '26.9124', longitude: '75.7873' },
      bengaluru: { latitude: '12.9716', longitude: '77.5946' },
      ujjain: { latitude: '23.1765', longitude: '75.7885' },
      varanasi: { latitude: '25.3176', longitude: '82.9739' },
      mathura: { latitude: '27.4924', longitude: '77.6737' }
    };
    const selectedPreset = presets[preset];
    if (selectedPreset) {
      setCoordinates(selectedPreset);
      setSuccess(`Location set to ${preset.charAt(0).toUpperCase() + preset.slice(1)}`);
      setTimeout(() => setSuccess(''), 3000);
    }
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
        <Grid item xs={12} lg={3}>
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
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 400,
                        overflow: 'auto',
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Select a Yantra Type</em>
                  </MenuItem>
                  {availableYantras.map((yantra) => (
                    <MenuItem 
                      key={yantra.id} 
                      value={yantra.id}
                      sx={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        py: 1.5,
                        px: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(212, 175, 55, 0.1)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                          {yantra.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
                          {yantra.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>



              {/* Debug Info */}
              {selectedYantra && (
                <Alert severity="info" sx={{ mb: 3, fontSize: '0.9rem' }}>
                  <strong>Debug:</strong> Yantra: {selectedYantra}
                </Alert>
              )}

              {/* Location Presets */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>Quick Locations:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['delhi', 'mumbai', 'jaipur', 'bengaluru', 'ujjain', 'varanasi', 'mathura'].map((city) => (
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

              {/* Interactive Clickable Map */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#D4AF37' }}>
                  📍 Interactive Location Selector
                </Typography>
                <Paper 
                  elevation={3} 
                  sx={{ 
                    height: '450px', 
                    borderRadius: 2, 
                    overflow: 'hidden',
                    border: '2px solid #D4AF37',
                    position: 'relative'
                  }}
                >
                  {/* Interactive OpenStreetMap with click functionality */}
                  <div
                    id="interactive-map"
                    style={{
                      width: '100%',
                      height: '100%',
                      background: '#f0f0f0',
                      position: 'relative',
                      cursor: 'crosshair'
                    }}
                  >
                    {/* Map iframe with interaction overlay */}
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapCenter.lng-0.1},${mapCenter.lat-0.1},${mapCenter.lng+0.1},${mapCenter.lat+0.1}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`}
                      title="Interactive Location Map"
                    />
                    
                    {/* Click overlay to capture map clicks */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 100,
                        cursor: 'crosshair'
                      }}
                      onClick={handleMapClick}
                      onMouseMove={(e) => {
                        // Add hover effect for better UX
                        e.currentTarget.style.opacity = '0.1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 100,
                        cursor: 'crosshair',
                        backgroundColor: 'rgba(212, 175, 55, 0)',
                        transition: 'background-color 0.2s ease'
                      }}
                    />
                    
                    {/* Visual marker for clicked location */}
                    {clickMarker && (
                      <div
                        style={{
                          position: 'absolute',
                          left: clickMarker.x - 8,
                          top: clickMarker.y - 16,
                          width: '16px',
                          height: '16px',
                          backgroundColor: '#ff4444',
                          border: '2px solid white',
                          borderRadius: '50% 50% 50% 0',
                          transform: 'rotate(-45deg)',
                          zIndex: 150,
                          pointerEvents: 'none',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                          animation: 'bounce 0.5s ease-in-out'
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '2px',
                            left: '2px',
                            width: '8px',
                            height: '8px',
                            backgroundColor: 'white',
                            borderRadius: '50%'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Current location overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      bgcolor: 'rgba(0, 0, 0, 0.85)',
                      color: 'white',
                      p: 1.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      zIndex: 200,
                      minWidth: '180px'
                    }}
                  >
                    <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                      📍 Selected Location
                    </Typography>
                    <Typography variant="caption" display="block">
                      Lat: {coordinates.latitude || 'Click to select'}
                    </Typography>
                    <Typography variant="caption" display="block">
                      Lng: {coordinates.longitude || 'Click to select'}
                    </Typography>
                  </Box>

                  {/* Click instruction overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      bgcolor: 'rgba(212, 175, 55, 0.9)',
                      color: 'black',
                      p: 1,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      zIndex: 200
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      🖱️ Click anywhere to select
                    </Typography>
                  </Box>
                </Paper>
              </Box>
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
                    <Grid item xs={6} sm={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => exportBlueprint('pdf')}
                        disabled={exportLoading}
                        startIcon={<Download />}
                        size="small"
                      >
                        PDF Blueprint
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => exportBlueprint('svg')}
                        disabled={exportLoading}
                        startIcon={<Download />}
                        size="small"
                      >
                        SVG Drawing
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={4}>
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

        {/* Main Visualization Area */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '800px' }}>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                  <Tab label="3D Visualization" icon={<Visibility />} />
                  <Tab label="2D Blueprint" icon={<Architecture />} />
                  <Tab label="Specifications" icon={<GetApp />} />
                </Tabs>
              </Box>
              
              {activeTab === 0 && (
                <Box sx={{ height: '720px' }}>
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
                <Box sx={{ height: '720px' }}>
                  {yantraSpecs ? (
                    <YantraViewer2D 
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
                      <Architecture sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" align="center">
                        Generate a yantra to see the 2D technical blueprint
                      </Typography>
                      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                        Perfect for construction and PDF export
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
              
              {activeTab === 2 && (
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

        {/* History and Information Panel */}
        <Grid item xs={12} lg={3}>
          <Card sx={{ height: '800px', overflow: 'auto' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#D4AF37' }}>
                <Timeline color="primary" />
                Yantra Information
              </Typography>
              
              {selectedYantra ? (
                <Box>
                  {/* Selected Yantra Title */}
                  <Box sx={{ mb: 3, p: 2, bgcolor: 'rgba(212, 175, 55, 0.1)', borderRadius: 2, border: '1px solid #D4AF37' }}>
                    <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      {availableYantras.find(y => y.id === selectedYantra)?.name || selectedYantra}
                    </Typography>
                  </Box>

                  {/* History Section */}
                  <Accordion defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        📚 Historical Background
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify' }}>
                        {getYantraInfo(selectedYantra).history}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* About Section */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                        🔬 About This Instrument
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify' }}>
                        {getYantraInfo(selectedYantra).about}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Construction Section */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                        🏗️ Construction Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify' }}>
                        {getYantraInfo(selectedYantra).construction}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Significance Section */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        ⭐ Historical Significance
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ lineHeight: 1.6, textAlign: 'justify' }}>
                        {getYantraInfo(selectedYantra).significance}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Quick Facts */}
                  <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
                      ⚡ Quick Facts
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                      • Built in the 18th century (1724-1730)
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                      • Created by Maharaja Jai Singh II
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                      • Part of Jantar Mantar observatories
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block' }}>
                      • UNESCO World Heritage Site
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ 
                  height: '600px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  textAlign: 'center'
                }}>
                  <Timeline sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Select a Yantra Type
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a yantra from the dropdown to learn about its fascinating history, construction details, and significance in Indian astronomy.
                  </Typography>
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