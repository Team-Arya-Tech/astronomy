import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  Public as PublicIcon,
  LocationOn,
  Schedule,
  Architecture,
  Star,
  ExpandMore,
  Timeline
} from '@mui/icons-material';

const VRExperience = () => {
  const [selectedLocation, setSelectedLocation] = useState('delhi');
  const [showInstructions, setShowInstructions] = useState(true);
  const [success, setSuccess] = useState('');

  // ✅ Google Street View 360° embeds for each Jantar Mantar
  const streetViewEmbeds = {
    delhi:
      'https://www.google.com/maps/embed?pb=!4v1760465213845!6m8!1m7!1sAFJ5HXFLtI3TWNbJFuM3oQ!2m2!1d28.6276759824157!2d77.2165774582503!3f164.43475565326543!4f-16.877177646617213!5f0.7820865974627469',
    jaipur:
      'https://www.google.com/maps/embed?pb=!4v1760467471719!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQzR0NVBoa3dF!2m2!1d26.92474178965255!2d75.82424882739731!3f226.32339888918563!4f-35.31248655370503!5f0.5970117501821992',
    varanasi:
      'https://www.google.com/maps/embed?pb=!4v1760466603715!6m8!1m7!1s0928zb_7lSwAAAQfCWWCnw!2m2!1d25.30777632030204!2d83.01079914528185!3f310.64156805878946!4f7.5590185849930975!5f0.7820865974627469',
    ujjain:
      'https://www.google.com/maps/embed?pb=!4v1760466866853!6m8!1m7!1sT1vnYZlXqvPjXXT0YIX4ww!2m2!1d23.17184283127581!2d75.76639053230866!3f192.7033272234688!4f10.494231730478688!5f0.7820865974627469'
  };

  // ✅ Comprehensive location data
  const locations = [
    { 
      id: 'delhi', 
      name: 'Delhi Jantar Mantar', 
      established: 1724, 
      instruments: 13,
      status: 'UNESCO World Heritage Site',
      coordinates: '28.627°N 77.216°E',
      area: '1.6 hectares',
      about: 'Built by Maharaja Jai Singh II in 1724, the Delhi Jantar Mantar is located in the heart of New Delhi, near Connaught Place. It represents the finest example of astronomical instrumentation and demonstrates the advanced mathematical and astronomical knowledge of 18th century India.',
      highlights: [
        'Samrat Yantra - 70 feet high sundial accurate to 2 seconds',
        'Jai Prakash Yantra - Hemispherical sundial for celestial coordinates',
        'Ram Yantra - Cylindrical structures for altitude measurements',
        'Misra Yantra - Combined instrument for multiple observations'
      ],
      history: 'Constructed as part of Jai Singh\'s grand vision to create accurate astronomical observations. The Delhi observatory was the first of five built across northern India and served as the prototype for later constructions.',
      significance: 'UNESCO World Heritage designation in 2010. Represents the culmination of Indo-Islamic astronomical traditions and demonstrates India\'s contribution to world astronomy.',
      keyInstruments: ['Samrat Yantra', 'Jai Prakash Yantra', 'Ram Yantra', 'Misra Yantra', 'Shastansh Yantra']
    },
    { 
      id: 'jaipur', 
      name: 'Jaipur Jantar Mantar', 
      established: 1728, 
      instruments: 19,
      status: 'UNESCO World Heritage Site',
      coordinates: '26.924°N 75.824°E',
      area: '18,700 sq meters',
      about: 'The largest and best-preserved of all Jantar Mantar observatories, built by Maharaja Jai Singh II in 1728-1734. Located in the Pink City of Jaipur, it houses the world\'s largest stone sundial and showcases the pinnacle of astronomical instrument design.',
      highlights: [
        'World\'s largest stone sundial - Vrihat Samrat Yantra (90 feet high)',
        'Jai Prakash Yantra pair - Marble hemispherical sundials',
        'Rashivalaya - 12 zodiac instruments for accurate calendar',
        'Dhruva Darshak Pattika - Pole star observation instrument'
      ],
      history: 'Built as Jai Singh\'s capital observatory, incorporating lessons learned from the Delhi construction. The Jaipur observatory became the most sophisticated and complete of all five observatories.',
      significance: 'UNESCO World Heritage Site since 2010. Represents the world\'s largest collection of architectural astronomical instruments and demonstrates the synthesis of Hindu, Islamic, and European astronomical traditions.',
      keyInstruments: ['Vrihat Samrat Yantra', 'Jai Prakash Yantra', 'Rashivalaya', 'Ram Yantra', 'Dhruva Darshak Pattika']
    },
    { 
      id: 'varanasi', 
      name: 'Varanasi Jantar Mantar', 
      established: 1737, 
      instruments: 7,
      status: 'Archaeological Survey of India Protected Monument',
      coordinates: '25.307°N 83.010°E',
      area: '0.26 hectares',
      about: 'The smallest but strategically important observatory built in 1737 on the banks of the sacred Ganges River. Built to serve the spiritual capital of India, combining astronomical precision with religious significance in the holy city of Varanasi.',
      highlights: [
        'Samrat Yantra - Precisely aligned sundial for Varanasi latitude',
        'Dhruva Darshak - Pole star sighting instrument',
        'Digamsha Yantra - Azimuth measuring device',
        'Sacred location on Ganges riverbank'
      ],
      history: 'Constructed in the sacred city of Varanasi to serve the religious and educational needs of the Hindu heartland. The observatory was designed to create accurate calendars for religious festivals and astronomical calculations.',
      significance: 'Unique combination of scientific precision and spiritual significance. Demonstrates the integration of astronomy with Hindu religious traditions and calendar systems.',
      keyInstruments: ['Samrat Yantra', 'Dhruva Darshak', 'Digamsha Yantra', 'Dakshinottara Bhitti']
    },
    { 
      id: 'ujjain', 
      name: 'Ujjain Jantar Mantar', 
      established: 1730, 
      instruments: 10,
      status: 'Archaeological Survey of India Protected Monument',
      coordinates: '23.171°N 75.766°E',
      area: '1.4 hectares',
      about: 'Built in 1730 in the ancient city of Ujjain, which lies on the Tropic of Cancer and has been a center of astronomical learning since ancient times. The observatory is strategically located at one of India\'s most sacred and astronomically significant cities.',
      highlights: [
        'Samrat Yantra - Massive sundial for Tropic of Cancer latitude',
        'Bhitti Yantra - Wall-mounted sundial systems',
        'Nadivalaya - Ring dial instruments',
        'Prime Meridian of ancient Indian astronomy'
      ],
      history: 'Ujjain has been a center of astronomical learning since the time of ancient mathematician-astronomer Brahmagupta (628 CE). Jai Singh chose this location for its historical significance and position on the Tropic of Cancer.',
      significance: 'Built at the Prime Meridian of ancient Indian astronomy. Ujjain was considered the Greenwich of ancient India, making this observatory crucial for standardizing astronomical calculations across the subcontinent.',
      keyInstruments: ['Samrat Yantra', 'Bhitti Yantra', 'Nadivalaya', 'Shanku Yantra', 'Digamsha Yantra']
    }
  ];

  const handleNext = () => {
    const idx = locations.findIndex((l) => l.id === selectedLocation);
    const next = (idx + 1) % locations.length;
    setSelectedLocation(locations[next].id);
    setSuccess(`Moved to ${locations[next].name}`);
  };

  const handlePrev = () => {
    const idx = locations.findIndex((l) => l.id === selectedLocation);
    const prev = (idx - 1 + locations.length) % locations.length;
    setSelectedLocation(locations[prev].id);
    setSuccess(`Moved to ${locations[prev].name}`);
  };

  const current = locations.find((l) => l.id === selectedLocation);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Enhanced Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            color: '#F5F5DC', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            mb: 1
          }}
        >
          🏛️ Jantar Mantar Virtual Tour
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#D4AF37', 
            mb: 2,
            fontStyle: 'italic'
          }}
        >
          Experience 18th Century Astronomical Marvels in 360°
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Chip 
            icon={<LocationOn />} 
            label="4 Historic Observatories" 
            sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#F5F5DC' }} 
          />
          <Chip 
            icon={<Architecture />} 
            label="UNESCO World Heritage" 
            sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#F5F5DC' }} 
          />
          <Chip 
            icon={<Timeline />} 
            label="1724-1737 CE" 
            sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', color: '#F5F5DC' }} 
          />
        </Box>
      </Box>

      {/* Instructions */}
      <Dialog open={showInstructions} onClose={() => setShowInstructions(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white', textAlign: 'center' }}>
          🌐 Virtual Reality Tour Guide
        </DialogTitle>
        <DialogContent>
          <Typography paragraph sx={{ color: 'black' }}>
            • Explore real Google Street View 360° images of Jantar Mantar across India.<br />
            • Move between observatories using the left and right navigation arrows.<br />
            • Use your mouse or touch to look around.<br />
            • Click “Enter VR Mode” to enjoy fullscreen immersive experience.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInstructions(false)} variant="contained" sx={{ bgcolor: '#1976d2' }}>
            🚀 Start Exploring
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">{success}</Alert>
      </Snackbar>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Virtual Tour Viewer */}
        <Grid item xs={12} lg={7}>
          <Card elevation={6} sx={{ height: '700px', borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              {/* Location Info Header */}
              <Box 
                sx={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  zIndex: 10,
                  bgcolor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white', 
                  p: 2 
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                  {current.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mt: 1, flexWrap: 'wrap' }}>
                  <Typography variant="body2">📅 Est. {current.established}</Typography>
                  <Typography variant="body2">🏛️ {current.instruments} Instruments</Typography>
                  <Typography variant="body2">📍 {current.coordinates}</Typography>
                </Box>
              </Box>

              {/* Street View Iframe */}
              <iframe
                key={selectedLocation}
                src={streetViewEmbeds[selectedLocation]}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${current.name} Street View`}
              />

              {/* Enhanced Controls */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 2,
                  zIndex: 10,
                  bgcolor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: 2,
                  p: 1
                }}
              >
                <Button 
                  variant="contained" 
                  onClick={handlePrev} 
                  sx={{ 
                    bgcolor: '#D4AF37',
                    '&:hover': { bgcolor: '#B8941F' },
                    minWidth: '120px'
                  }}
                >
                  ⬅ Previous
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleNext} 
                  sx={{ 
                    bgcolor: '#D4AF37',
                    '&:hover': { bgcolor: '#B8941F' },
                    minWidth: '120px'
                  }}
                >
                  Next ➡
                </Button>
                <Button
                  variant="outlined"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': { borderColor: '#D4AF37', color: '#D4AF37' },
                    minWidth: '140px'
                  }}
                  onClick={() => {
                    const iframe = document.querySelector('iframe');
                    if (iframe.requestFullscreen) iframe.requestFullscreen();
                  }}
                >
                  🕶 VR Fullscreen
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Information Panel */}
        <Grid item xs={12} lg={5}>
          {/* Observatory Selector */}
          <Card elevation={3} sx={{ mb: 3, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#D4AF37', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PublicIcon />
                Observatory Selection
              </Typography>
              
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#8B4513' }}>Select Observatory</InputLabel>
                <Select
                  value={selectedLocation}
                  label="Select Observatory"
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  sx={{ 
                    '& .MuiSelect-select': { color: '#8B4513' },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#B8941F' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D4AF37' }
                  }}
                >
                  {locations.map((loc) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {loc.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#555555' }}>
                          Est. {loc.established} • {loc.instruments} instruments
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Quick Stats */}
              <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  size="small" 
                  label={current.status} 
                  sx={{ bgcolor: '#D4AF37', color: 'white' }} 
                />
                <Chip 
                  size="small" 
                  label={`Area: ${current.area}`} 
                  variant="outlined"
                  sx={{ borderColor: '#D4AF37', color: '#8B4513' }} 
                />
              </Box>
            </CardContent>
          </Card>

          {/* Detailed About Section */}
          <Card elevation={3} sx={{ maxHeight: '500px', overflow: 'auto', bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#D4AF37', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Star />
                About {current.name}
              </Typography>

              {/* About Description */}
              <Typography variant="body2" paragraph sx={{ textAlign: 'justify', lineHeight: 1.6, color: 'white' }}>
                {current.about}
              </Typography>

              {/* Accordions for detailed information */}
              <Accordion sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                    🏛️ Key Highlights
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List dense>
                    {current.highlights.map((highlight, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <Star sx={{ color: '#D4AF37', fontSize: 16 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={highlight} 
                          sx={{ '& .MuiListItemText-primary': { fontSize: '0.875rem' } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                    📚 Historical Background
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    {current.history}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                    ⭐ Historical Significance
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ textAlign: 'justify', lineHeight: 1.6 }}>
                    {current.significance}
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                    🔧 Key Instruments
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {current.keyInstruments.map((instrument, index) => (
                      <Chip 
                        key={index}
                        label={instrument}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: '#D4AF37', color: '#8B4513' }}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enhanced Footer */}
      <Card elevation={4} sx={{ mt: 4, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Architecture />
                The Jantar Mantar Legacy
              </Typography>
              <Typography variant="body1" paragraph sx={{ textAlign: 'justify', lineHeight: 1.7, color: 'white' }}>
                The Jantar Mantar observatories represent one of the world's most remarkable achievements in 
                pre-telescopic astronomy. Built by Maharaja Jai Singh II between 1724 and 1737, these 
                architectural marvels demonstrate the fusion of mathematics, astronomy, and engineering 
                that characterized the Indian scientific renaissance.
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'justify', lineHeight: 1.7, color: 'white' }}>
                Each observatory contains massive stone and marble instruments designed to track celestial 
                movements with unprecedented accuracy for their time. The yantras could predict eclipses, 
                track planets, and maintain precise calendars - achievements that rival modern astronomical 
                capabilities.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                🌟 Virtual Tour Features
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#D4AF37', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="360° Street View immersion" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#D4AF37', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Detailed historical information" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#D4AF37', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Interactive observatory navigation" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#D4AF37', fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary="Fullscreen VR experience" />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="caption" sx={{ color: '#555555', fontStyle: 'italic' }}>
                Powered by Google Street View • Experience UNESCO World Heritage Sites from anywhere
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VRExperience;
