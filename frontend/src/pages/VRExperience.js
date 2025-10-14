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
  Alert
} from '@mui/material';
import { Public as PublicIcon } from '@mui/icons-material';

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

  // ✅ Locations in the correct order
  const locations = [
    { id: 'delhi', name: 'Delhi Jantar Mantar', established: 1724, instruments: 13 },
    { id: 'jaipur', name: 'Jaipur Jantar Mantar', established: 1728, instruments: 19 },
    { id: 'varanasi', name: 'Varanasi Jantar Mantar', established: 1737, instruments: 7 },
    { id: 'ujjain', name: 'Ujjain Jantar Mantar', established: 1730, instruments: 10 }
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
    <Container maxWidth="lg" sx={{ py: 4, color: 'black' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#F5F5DC' }}>
        Jantar Mantar 360° Virtual Tour
      </Typography>
      <Typography variant="h6" align="center" sx={{ mb: 3, color: '#F5F5DC' }}>
        Walk through and look around ancient Indian astronomical instruments
      </Typography>

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

      {/* Main Viewer Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={4}
            sx={{
              position: 'relative',
              height: '600px',
              overflow: 'hidden',
              borderRadius: 2,
              border: '2px solid #1976d2'
            }}
          >
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
            ></iframe>

            {/* Controls Overlay */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 30,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2,
                zIndex: 10
              }}
            >
              <Button id="prevBtn" variant="contained" onClick={handlePrev} sx={{ bgcolor: '#1976d2' }}>
                ⬅ Prev
              </Button>
              <Button id="nextBtn" variant="contained" onClick={handleNext} sx={{ bgcolor: '#1976d2' }}>
                Next ➡
              </Button>
              <Button
                variant="outlined"
                sx={{ color: 'black', borderColor: 'black' }}
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  if (iframe.requestFullscreen) iframe.requestFullscreen();
                }}
              >
                🕶 Enter VR Mode
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, bgcolor: '#F5F5DC', color: 'black' }}>
            <Typography variant="h5" align="center" sx={{ color: '#1976d2', mb: 2 }}>
              🧭 Observatory Selector
            </Typography>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel sx={{ color: 'black' }}>Observatory</InputLabel>
              <Select
                value={selectedLocation}
                label="Observatory"
                onChange={(e) => setSelectedLocation(e.target.value)}
                sx={{ 
                  color: 'black',
                  '& .MuiSelect-select': {
                    color: 'black'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'black'
                  }
                }}
              >
                {locations.map((loc) => (
                  <MenuItem key={loc.id} value={loc.id} sx={{ color: 'black' }}>
                    {loc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="body1" sx={{ mt: 2, color: 'black' }}>
              <strong>Established:</strong> {current.established}
              <br />
              <strong>Instruments:</strong> {current.instruments}
              <br />
              <strong>Location:</strong> {current.name}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer / About */}
      <Paper elevation={1} sx={{ mt: 3, p: 3, bgcolor: '#e8f5e8', color: 'black' }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
          🏛️ About Jantar Mantar Observatories
        </Typography>
        <Typography variant="body1">
          The Jantar Mantar observatories were built by Maharaja Jai Singh II between 1724 and 1737
          to measure celestial positions using large-scale astronomical instruments.
          Each site—Delhi, Jaipur, Varanasi, and Ujjain—hosts remarkable yantras like the Samrat Yantra,
          Jai Prakash, and Rama Yantra. Explore them now through this 360° virtual experience powered by
          Google Street View.
        </Typography>
      </Paper>
    </Container>
  );
};

export default VRExperience;
