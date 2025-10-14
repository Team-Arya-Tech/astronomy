import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  AlertTitle
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import YantraViewerRealistic from '../components/YantraViewerRealNew';

const RealisticShadowDemo = () => {
  const [latitude, setLatitude] = useState(26.9); // Jaipur
  const [longitude, setLongitude] = useState(75.8); // Jaipur
  const [selectedLocation, setSelectedLocation] = useState('jaipur');
  const [selectedYantra, setSelectedYantra] = useState('samrat');

  // Predefined locations with historical observatories
  const locations = {
    jaipur: { name: 'Jaipur (Jantar Mantar)', lat: 26.9, lng: 75.8 },
    delhi: { name: 'Delhi (Jantar Mantar)', lat: 28.7, lng: 77.2 },
    varanasi: { name: 'Varanasi', lat: 25.3, lng: 83.0 },
    ujjain: { name: 'Ujjain', lat: 23.2, lng: 75.8 },
    mumbai: { name: 'Mumbai', lat: 19.1, lng: 72.9 },
    kolkata: { name: 'Kolkata', lat: 22.6, lng: 88.4 },
    chennai: { name: 'Chennai', lat: 13.1, lng: 80.3 },
    bangalore: { name: 'Bangalore', lat: 12.9, lng: 77.6 }
  };

  // Different yantra types with descriptions
  const yantraTypes = {
    samrat: { 
      name: 'Samrat Yantra', 
      description: 'Supreme Instrument - Giant sundial for precise time measurement',
      icon: '🌅'
    },
    jaiprakash: { 
      name: 'Jai Prakash Yantra', 
      description: 'Hemispherical sundial for celestial coordinate measurement',
      icon: '🏗️'
    },
    ram: { 
      name: 'Ram Yantra', 
      description: 'Cylindrical instrument for measuring altitude and azimuth',
      icon: '🏛️'
    },
    misra: { 
      name: 'Misra Yantra', 
      description: 'Mixed instrument combining multiple astronomical functions',
      icon: '⚖️'
    }
  };

  const handleLocationChange = (locationKey) => {
    const location = locations[locationKey];
    setSelectedLocation(locationKey);
    setLatitude(location.lat);
    setLongitude(location.lng);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            background: 'linear-gradient(135deg, #D4AF37, #F4E4BC, #B8860B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          <WbSunnyIcon sx={{ fontSize: '1em', mr: 1, verticalAlign: 'middle', color: '#D4AF37' }} />
          DIGIYANTRA - Realistic Solar Shadow Simulation
        </Typography>
        
        <Typography variant="h6" component="p" sx={{ mb: 3, color: 'text.secondary', maxWidth: '800px', mx: 'auto' }}>
          Experience how ancient Indian astronomers used shadows to track time with precise solar calculations. 
          Watch real-time shadow movement based on astronomical data for any location on Earth.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Chip 
            icon={<LocationOnIcon />} 
            label="Real Geographic Coordinates" 
            sx={{ 
              backgroundColor: 'rgba(212,175,55,0.1)', 
              color: '#D4AF37',
              border: '1px solid rgba(212,175,55,0.3)'
            }} 
            variant="outlined" 
          />
          <Chip 
            icon={<AccessTimeIcon />} 
            label="Live Solar Calculations" 
            sx={{ 
              backgroundColor: 'rgba(205,133,63,0.1)', 
              color: '#CD853F',
              border: '1px solid rgba(205,133,63,0.3)'
            }} 
            variant="outlined" 
          />
          <Chip 
            icon={<WbSunnyIcon />} 
            label="Authentic Shadow Movement" 
            sx={{ 
              backgroundColor: 'rgba(184,134,11,0.1)', 
              color: '#B8860B',
              border: '1px solid rgba(184,134,11,0.3)'
            }} 
            variant="outlined" 
          />
        </Box>

        <Alert 
          severity="info" 
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto', 
            mb: 4,
            backgroundColor: 'rgba(45,24,16,0.95)',
            color: '#F5E6D3',
            border: '1px solid rgba(212,175,55,0.3)',
            '& .MuiAlert-icon': {
              color: '#D4AF37'
            }
          }}
        >
          <AlertTitle sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Historical Accuracy</AlertTitle>
          This simulation uses the same astronomical principles that Maharaja Jai Singh II employed 
          in the 18th century for his Jantar Mantar observatories.
        </Alert>
      </Box>

      <Grid container spacing={3}>
        {/* Controls Panel */}
        <Grid item xs={12} md={3}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              mb: 3,
              background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              color: '#F5E6D3'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              <LocationOnIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Location Settings
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Preset Locations</InputLabel>
              <Select
                value={selectedLocation}
                label="Preset Locations"
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                {Object.entries(locations).map(([key, location]) => (
                  <MenuItem key={key} value={key}>
                    {location.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Latitude"
              type="number"
              value={latitude}
              onChange={(e) => setLatitude(parseFloat(e.target.value))}
              inputProps={{ step: 0.1, min: -90, max: 90 }}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Longitude"
              type="number"
              value={longitude}
              onChange={(e) => setLongitude(parseFloat(e.target.value))}
              inputProps={{ step: 0.1, min: -180, max: 180 }}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Yantra Type</InputLabel>
              <Select
                value={selectedYantra}
                label="Yantra Type"
                onChange={(e) => setSelectedYantra(e.target.value)}
              >
                {Object.entries(yantraTypes).map(([key, yantra]) => (
                  <MenuItem key={key} value={key}>
                    {yantra.icon} {yantra.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Card 
              sx={{ 
                mt: 2,
                background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
                color: '#F5E6D3',
                border: '1px solid rgba(212,175,55,0.3)'
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Current Settings:
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.1em', mb: 1 }}>
                  📍 {locations[selectedLocation]?.name}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  {latitude.toFixed(2)}°N, {longitude.toFixed(2)}°E
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '1.1em' }}>
                  {yantraTypes[selectedYantra]?.icon} {yantraTypes[selectedYantra]?.name}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ 
              mt: 2, 
              background: 'linear-gradient(145deg, rgba(45,24,16,0.8) 0%, rgba(31,22,17,0.9) 100%)',
              border: '1px solid rgba(212,175,55,0.2)'
            }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                  About This Yantra:
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, color: '#F5E6D3' }}>
                  {yantraTypes[selectedYantra]?.description}
                </Typography>
              </CardContent>
            </Card>
          </Paper>

          {/* Information Panel */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3,
              background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
              color: '#F5E6D3',
              border: '1px solid rgba(212,175,55,0.2)'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              <WbSunnyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              How It Works
            </Typography>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Shadow Movement</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Shadows move according to real solar calculations based on:
                  <br />• Current time and date
                  <br />• Geographic location
                  <br />• Solar elevation and azimuth
                  <br />• Earth's orbital mechanics
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Camera Controls</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  • <b>Left Click + Drag:</b> Orbit around yantra
                  <br />• <b>Right Click + Drag:</b> Pan view
                  <br />• <b>Scroll Wheel:</b> Zoom in/out
                  <br />• Yantra remains fixed in position
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Time Simulation</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  • Use time controls to simulate shadow movement
                  <br />• Speed up time to see daily shadow arc
                  <br />• Shadows automatically adjust for different seasons
                  <br />• Sun disappears below horizon at night
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Main Viewer */}
        <Grid item xs={12} md={9}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2,
              background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
              borderRadius: 2,
              border: '1px solid rgba(212,175,55,0.2)'
            }}
          >
            <YantraViewerRealistic
              latitude={latitude}
              longitude={longitude}
              yantraType={selectedYantra}
              showTimeControls={true}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Educational Content */}
      <Box sx={{ mt: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3,
            background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
            borderRadius: 2,
            border: '1px solid rgba(212,175,55,0.2)',
            color: '#F5E6D3'
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 3
            }}
          >
            {yantraTypes[selectedYantra]?.icon} About the {yantraTypes[selectedYantra]?.name}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(45,24,16,0.8)', 
                borderRadius: 2, 
                mb: 2,
                border: '1px solid rgba(212,175,55,0.2)'
              }}>
                {selectedYantra === 'samrat' && (
                  <>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      The <strong>Samrat Yantra</strong> (Supreme Instrument) is a giant sundial and one of the most impressive 
                      instruments at the Jantar Mantar observatories. Its triangular gnomon, precisely aligned 
                      with Earth's axis, casts shadows that indicate local solar time with remarkable accuracy.
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      The gnomon's angle equals the latitude of the location (90° - latitude), ensuring the 
                      shadow edge remains parallel to the celestial equator throughout the day. This ingenious 
                      design allows for precise timekeeping throughout the year.
                    </Typography>
                  </>
                )}
                
                {selectedYantra === 'jaiprakash' && (
                  <>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      The <strong>Jai Prakash Yantra</strong> consists of two hemispherical sundials that complement 
                      each other. This unique design allows astronomers to read both solar time and celestial coordinates 
                      of any celestial body when its shadow falls on the marble surface.
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      Named after Maharaja Jai Singh II, this instrument can measure the position of any celestial 
                      object with high precision. The bowl shape eliminates the need for multiple instruments.
                    </Typography>
                  </>
                )}
                
                {selectedYantra === 'ram' && (
                  <>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      The <strong>Ram Yantra</strong> consists of a cylindrical structure with a central pillar 
                      and surrounding graduated pillars. It measures the altitude and azimuth angles of celestial bodies.
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      This instrument works by casting shadows from the central pillar onto the graduated floor, 
                      allowing astronomers to determine the precise position of stars, planets, and other celestial objects.
                    </Typography>
                  </>
                )}
                
                {selectedYantra === 'misra' && (
                  <>
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      The <strong>Misra Yantra</strong> (Mixed Instrument) combines features of multiple astronomical 
                      instruments into one comprehensive device. It can measure time, celestial coordinates, and 
                      seasonal variations simultaneously.
                    </Typography>
                    
                    <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
                      This versatile instrument represents the pinnacle of Indian astronomical engineering, 
                      incorporating multiple measurement capabilities in a single, elegant structure.
                    </Typography>
                  </>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(45,24,16,0.8)', 
                borderRadius: 2, 
                mb: 2,
                border: '1px solid rgba(212,175,55,0.2)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                  Key Features:
                </Typography>
                <Typography variant="body2" component="div" sx={{ lineHeight: 2 }}>
                  {selectedYantra === 'samrat' && (
                    <>
                      🏗️ <b>Gnomon Height:</b> Up to 27 meters in Jaipur
                      <br />⏱️ <b>Accuracy:</b> Within 2 seconds of local solar time
                      <br />📏 <b>Base Scales:</b> Curved hour markings on both sides
                      <br />🏛️ <b>Materials:</b> Stone and marble construction
                      <br />🧭 <b>Orientation:</b> True north-south alignment
                    </>
                  )}
                  {selectedYantra === 'jaiprakash' && (
                    <>
                      🏗️ <b>Structure:</b> Two complementary hemispherical bowls
                      <br />⏱️ <b>Accuracy:</b> Precise celestial coordinate measurement
                      <br />📏 <b>Markings:</b> Degree and hour markings on concave surface
                      <br />🏛️ <b>Materials:</b> Marble with bronze fittings
                      <br />🧭 <b>Function:</b> Universal coordinate system
                    </>
                  )}
                  {selectedYantra === 'ram' && (
                    <>
                      🏗️ <b>Structure:</b> Cylindrical with central and surrounding pillars
                      <br />⏱️ <b>Accuracy:</b> Precise altitude and azimuth measurement
                      <br />📏 <b>Markings:</b> Graduated floor with degree markings
                      <br />🏛️ <b>Materials:</b> Stone construction with metal indicators
                      <br />🧭 <b>Function:</b> Stellar position measurement
                    </>
                  )}
                  {selectedYantra === 'misra' && (
                    <>
                      🏗️ <b>Structure:</b> Complex multi-functional design
                      <br />⏱️ <b>Accuracy:</b> Multiple measurement capabilities
                      <br />📏 <b>Markings:</b> Various scales for different functions
                      <br />🏛️ <b>Materials:</b> Mixed stone and metal construction
                      <br />🧭 <b>Function:</b> Combined time and position measurement
                    </>
                  )}
                </Typography>
              </Box>
              
              <Box sx={{ 
                p: 2, 
                backgroundColor: 'rgba(45,24,16,0.8)', 
                borderRadius: 2,
                border: '1px solid rgba(212,175,55,0.2)'
              }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#CD853F', fontWeight: 'bold' }}>
                  Historical Significance:
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.8, color: '#F5E6D3' }}>
                  Built by <strong>Maharaja Jai Singh II</strong> in the 18th century, these instruments represent the 
                  pinnacle of observational astronomy in medieval India, combining mathematical precision 
                  with architectural grandeur. They demonstrate the sophisticated understanding of celestial 
                  mechanics achieved by ancient Indian astronomers.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Project Information Footer */}
      <Box sx={{ mt: 4 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3,
            background: 'linear-gradient(145deg, rgba(45,24,16,0.95) 0%, rgba(31,22,17,0.98) 100%)',
            color: '#F5E6D3',
            textAlign: 'center',
            border: '1px solid rgba(212,175,55,0.2)'
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            DIGIYANTRA - Reviving Ancient Indian Astronomy
          </Typography>
          <Typography variant="body2" sx={{ maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            This interactive simulation is part of DIGIYANTRA, an innovative system that combines artificial intelligence 
            with computational geometry to generate authentic astronomical instruments for any location on Earth. 
            Our mission is to preserve and revive the rich heritage of Indian astronomy through modern technology.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip label="AI-Powered" variant="outlined" sx={{ color: '#D4AF37', borderColor: '#D4AF37' }} />
            <Chip label="Historically Accurate" variant="outlined" sx={{ color: '#CD853F', borderColor: '#CD853F' }} />
            <Chip label="Educational" variant="outlined" sx={{ color: '#B8860B', borderColor: '#B8860B' }} />
            <Chip label="Open Source" variant="outlined" sx={{ color: '#DEB887', borderColor: '#DEB887' }} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RealisticShadowDemo;