import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Alert,
  Switch,
  FormControlLabel,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider
} from '@mui/material';
import {
  ViewInAr,
  LocationOn,
  Visibility,
  VisibilityOff,
  Share,
  ThreeDRotation,
  Fullscreen
} from '@mui/icons-material';

const VRExperience = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isVRActive, setIsVRActive] = useState(false);
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [userLocation, setUserLocation] = useState(null);
  const [selectedYantra, setSelectedYantra] = useState('samrat');
  const [vrEnvironment, setVrEnvironment] = useState('jantar_mantar');
  const [timeOfDay, setTimeOfDay] = useState(12);
  const [vrQuality, setVrQuality] = useState('medium');
  const [showInstructions, setShowInstructions] = useState(true);
  const [cameraAngle, setCameraAngle] = useState({ x: 0, y: 0, zoom: 1 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Get user location for astronomical accuracy
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          setError('Location access enhances VR astronomical accuracy');
        }
      );
    }

    // Device orientation for VR navigation
    const handleOrientation = (event) => {
      setDeviceOrientation({
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      stopVR();
    };
  }, []);

  const startVR = () => {
    setIsVRActive(true);
    initializeVRRendering();
    setSuccess('VR experience started! Use mouse/touch to navigate the virtual Jantar Mantar.');
  };

  const stopVR = () => {
    setIsVRActive(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const initializeVRRendering = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const render = () => {
      if (!isVRActive) return;
      
      // Clear canvas
      ctx.fillStyle = getSkyColor();
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw VR environment
      drawVREnvironment(ctx);
      drawVRYantra(ctx);
      drawVRUI(ctx);
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    render();
  };

  const getSkyColor = () => {
    // Dynamic sky color based on time of day
    if (timeOfDay >= 6 && timeOfDay <= 18) {
      const intensity = Math.sin((timeOfDay - 6) * Math.PI / 12);
      const blue = Math.floor(135 + intensity * 120);
      const lightness = Math.floor(200 + intensity * 55);
      return `rgb(${lightness}, ${lightness}, ${blue})`;
    } else {
      return '#0d1b2a'; // Night sky
    }
  };

  const drawVREnvironment = (ctx) => {
    const { width, height } = ctx.canvas;
    
    // Draw environment based on selection
    switch (vrEnvironment) {
      case 'jantar_mantar':
        drawJantarMantarEnvironment(ctx);
        break;
      case 'modern_lab':
        drawModernLabEnvironment(ctx);
        break;
      case 'ancient_india':
        drawAncientIndiaEnvironment(ctx);
        break;
    }
    
    // Draw ground
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, height * 0.7, width, height * 0.3);
    
    // Add perspective grid
    drawPerspectiveGrid(ctx);
  };

  const drawJantarMantarEnvironment = (ctx) => {
    const { width, height } = ctx.canvas;
    
    // Background buildings (simplified Jaipur architecture)
    ctx.fillStyle = '#d4a574';
    for (let i = 0; i < 5; i++) {
      const x = i * (width / 5);
      const buildingHeight = 100 + Math.random() * 50;
      ctx.fillRect(x, height * 0.4, width / 5, buildingHeight);
      
      // Add architectural details
      ctx.fillStyle = '#b87333';
      ctx.fillRect(x + 10, height * 0.4, 20, buildingHeight);
      ctx.fillStyle = '#d4a574';
    }
    
    // Add dome structures
    ctx.fillStyle = '#f4a460';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.3, 40, 0, Math.PI, true);
    ctx.fill();
  };

  const drawModernLabEnvironment = (ctx) => {
    const { width, height } = ctx.canvas;
    
    // Modern laboratory setting
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height * 0.7);
    
    // Equipment and desks
    ctx.fillStyle = '#333';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(i * 200 + 50, height * 0.6, 150, 40);
    }
  };

  const drawAncientIndiaEnvironment = (ctx) => {
    const { width, height } = ctx.canvas;
    
    // Ancient setting with temples
    ctx.fillStyle = '#8b4513';
    
    // Temple silhouettes
    for (let i = 0; i < 4; i++) {
      const x = i * (width / 4);
      ctx.fillRect(x, height * 0.5, width / 4 - 10, 80);
      
      // Spires
      ctx.beginPath();
      ctx.moveTo(x + (width / 8), height * 0.5);
      ctx.lineTo(x + (width / 8) - 20, height * 0.3);
      ctx.lineTo(x + (width / 8) + 20, height * 0.3);
      ctx.fill();
    }
  };

  const drawPerspectiveGrid = (ctx) => {
    const { width, height } = ctx.canvas;
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    // Perspective grid lines
    for (let i = 0; i < 10; i++) {
      const y = height * 0.7 + i * 20;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    for (let i = 0; i < 20; i++) {
      const x = i * (width / 20);
      ctx.beginPath();
      ctx.moveTo(x, height * 0.7);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
    }
  };

  const drawVRYantra = (ctx) => {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height * 0.6;
    const scale = 150 * cameraAngle.zoom;

    ctx.save();
    ctx.translate(centerX + cameraAngle.x, centerY + cameraAngle.y);

    // Draw shadow first
    drawVRShadow(ctx, scale);

    // Draw yantra based on selection
    switch (selectedYantra) {
      case 'samrat':
        drawVRSamratYantra(ctx, scale);
        break;
      case 'rama':
        drawVRRamaYantra(ctx, scale);
        break;
      case 'jai_prakash':
        drawVRJaiPrakashYantra(ctx, scale);
        break;
    }

    ctx.restore();
  };

  const drawVRShadow = (ctx, scale) => {
    // Calculate shadow based on time of day
    const shadowAngle = (timeOfDay - 12) * 15 * Math.PI / 180;
    const shadowLength = scale * 0.8;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(
      Math.sin(shadowAngle) * shadowLength / 2,
      20,
      shadowLength / 2,
      20,
      shadowAngle,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const drawVRSamratYantra = (ctx, scale) => {
    // Base platform with 3D effect
    const gradient = ctx.createLinearGradient(0, -20, 0, 20);
    gradient.addColorStop(0, '#f5f5dc');
    gradient.addColorStop(1, '#d3d3d3');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(-scale, -20, scale * 2, 40);
    
    // Side edge for 3D effect
    ctx.fillStyle = '#c0c0c0';
    ctx.fillRect(-scale, 20, scale * 2, 10);
    
    // Gnomon with 3D effect
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    
    // Main gnomon
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -scale);
    ctx.stroke();
    
    // Hour markings with labels
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 3;
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    
    for (let i = -6; i <= 6; i++) {
      const angle = i * 15 * Math.PI / 180;
      const lineLength = scale * 0.8;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.sin(angle) * lineLength, Math.cos(angle) * lineLength);
      ctx.stroke();
      
      // Hour labels
      const labelX = Math.sin(angle) * (lineLength + 30);
      const labelY = Math.cos(angle) * (lineLength + 30);
      ctx.fillText((12 + i).toString(), labelX, labelY);
    }
    
    // Current time shadow
    const currentShadowAngle = (timeOfDay - 12) * 15 * Math.PI / 180;
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.sin(currentShadowAngle) * scale * 0.6, Math.cos(currentShadowAngle) * scale * 0.6);
    ctx.stroke();
  };

  const drawVRRamaYantra = (ctx, scale) => {
    // Cylindrical base with gradient
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, scale);
    gradient.addColorStop(0, '#f5f5dc');
    gradient.addColorStop(1, '#d3d3d3');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Outer rim
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 5;
    ctx.stroke();
    
    // Radial hour lines
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 12; i++) {
      const angle = i * 30 * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * scale, Math.sin(angle) * scale);
      ctx.stroke();
    }
    
    // Central pole
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawVRJaiPrakashYantra = (ctx, scale) => {
    // Hemispherical bowl
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, scale);
    gradient.addColorStop(0, '#b87333');
    gradient.addColorStop(1, '#8b4513');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, Math.PI * 2);
    ctx.fill();
    
    // Rim
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // Celestial coordinate lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 8; i++) {
      const angle = i * 45 * Math.PI / 180;
      ctx.beginPath();
      ctx.ellipse(0, 0, scale * 0.8, scale * 0.4, angle, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Central pointer
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawVRUI = (ctx) => {
    const { width, height } = ctx.canvas;
    
    // VR Info Panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 300, 120);
    
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`VR Environment: ${vrEnvironment.replace('_', ' ')}`, 20, 35);
    ctx.fillText(`Yantra: ${selectedYantra} yantra`, 20, 55);
    ctx.fillText(`Time: ${timeOfDay}:00 (${timeOfDay >= 6 && timeOfDay <= 18 ? 'Day' : 'Night'})`, 20, 75);
    
    if (userLocation) {
      ctx.fillText(`Location: ${userLocation.latitude.toFixed(2)}°, ${userLocation.longitude.toFixed(2)}°`, 20, 95);
    }
    
    // Navigation help
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(width - 250, height - 100, 240, 90);
    
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText('🖱️ Mouse: Look around', width - 240, height - 75);
    ctx.fillText('⌨️ WASD: Move camera', width - 240, height - 55);
    ctx.fillText('🔍 Scroll: Zoom in/out', width - 240, height - 35);
    ctx.fillText('📱 Tilt device: Navigate', width - 240, height - 15);
  };

  const handleMouseMove = (event) => {
    if (!isVRActive) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    setCameraAngle(prev => ({
      ...prev,
      x: (x - rect.width / 2) * 0.1,
      y: (y - rect.height / 2) * 0.1
    }));
  };

  const handleWheel = (event) => {
    if (!isVRActive) return;
    
    event.preventDefault();
    setCameraAngle(prev => ({
      ...prev,
      zoom: Math.max(0.5, Math.min(2, prev.zoom - event.deltaY * 0.001))
    }));
  };

  const captureVRScreenshot = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `yantra-vr-${selectedYantra}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    setSuccess('VR screenshot captured and downloaded!');
  };

  const yantraTypes = [
    { id: 'samrat', name: 'Samrat Yantra', description: 'Giant sundial for precise time measurement' },
    { id: 'rama', name: 'Rama Yantra', description: 'Cylindrical instrument for celestial coordinates' },
    { id: 'jai_prakash', name: 'Jai Prakash Yantra', description: 'Hemispherical bowl for astronomical observations' }
  ];

  const vrEnvironments = [
    { id: 'jantar_mantar', name: 'Jantar Mantar Jaipur', description: 'Historic observatory setting' },
    { id: 'modern_lab', name: 'Modern Laboratory', description: 'Contemporary research environment' },
    { id: 'ancient_india', name: 'Ancient India', description: 'Traditional astronomical setting' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        VR Yantra Experience
      </Typography>
      <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Immersive Virtual Reality exploration of ancient Indian astronomical instruments
      </Typography>

      {/* Instructions Dialog */}
      <Dialog open={showInstructions} onClose={() => setShowInstructions(false)}>
        <DialogTitle>VR Experience Instructions</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Welcome to the Virtual Jantar Mantar! This VR experience lets you explore ancient Indian astronomical instruments in an immersive 3D environment.
          </Typography>
          <Typography paragraph>
            <strong>Navigation:</strong><br/>
            🖱️ Mouse: Look around and navigate<br/>
            📱 Device tilt: Control camera on mobile<br/>
            🔍 Scroll: Zoom in and out<br/>
            ⚙️ Controls: Adjust time, environment, and yantra type
          </Typography>
          <Typography paragraph>
            <strong>Features:</strong><br/>
            • Multiple VR environments (Jantar Mantar, Modern Lab, Ancient India)<br/>
            • Real-time astronomical calculations<br/>
            • Interactive yantra selection<br/>
            • Time-based shadow simulation<br/>
            • Screenshot capture
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInstructions(false)}>Got it!</Button>
        </DialogActions>
      </Dialog>

      {/* Status Alerts */}
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* VR Controls */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ThreeDRotation sx={{ mr: 1 }} />
                VR Controls
              </Typography>
              
              {!isVRActive ? (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={startVR}
                  startIcon={<ViewInAr />}
                  sx={{ mb: 2 }}
                >
                  Start VR Experience
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={stopVR}
                  color="error"
                  sx={{ mb: 2 }}
                >
                  Stop VR
                </Button>
              )}

              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Environment</Typography>
                <Grid container spacing={1}>
                  {vrEnvironments.map((env) => (
                    <Grid item xs={12} key={env.id}>
                      <Chip
                        label={env.name}
                        onClick={() => setVrEnvironment(env.id)}
                        color={vrEnvironment === env.id ? 'primary' : 'default'}
                        variant={vrEnvironment === env.id ? 'filled' : 'outlined'}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Yantra Type</Typography>
                <Grid container spacing={1}>
                  {yantraTypes.map((yantra) => (
                    <Grid item xs={12} key={yantra.id}>
                      <Chip
                        label={yantra.name}
                        onClick={() => setSelectedYantra(yantra.id)}
                        color={selectedYantra === yantra.id ? 'primary' : 'default'}
                        variant={selectedYantra === yantra.id ? 'filled' : 'outlined'}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Time of Day: {timeOfDay}:00</Typography>
                <Slider
                  value={timeOfDay}
                  onChange={(e, newValue) => setTimeOfDay(newValue)}
                  min={0}
                  max={23}
                  marks={[
                    { value: 6, label: 'Dawn' },
                    { value: 12, label: 'Noon' },
                    { value: 18, label: 'Dusk' },
                    { value: 0, label: 'Midnight' }
                  ]}
                />
              </Box>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={captureVRScreenshot}
                    startIcon={<Share />}
                    disabled={!isVRActive}
                  >
                    Screenshot
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => setShowInstructions(true)}
                    startIcon={<Visibility />}
                  >
                    Help
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Location Info */}
          {userLocation && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LocationOn sx={{ mr: 1 }} />
                  Location Info
                </Typography>
                <Typography variant="body2">
                  Latitude: {userLocation.latitude.toFixed(4)}°
                </Typography>
                <Typography variant="body2">
                  Longitude: {userLocation.longitude.toFixed(4)}°
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enhanced astronomical accuracy
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Device Orientation */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Device Orientation
              </Typography>
              <Typography variant="body2">
                Alpha: {deviceOrientation.alpha.toFixed(1)}°
              </Typography>
              <Typography variant="body2">
                Beta: {deviceOrientation.beta.toFixed(1)}°
              </Typography>
              <Typography variant="body2">
                Gamma: {deviceOrientation.gamma.toFixed(1)}°
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* VR Display */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 500,
                  backgroundColor: '#f5f5f5',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
              >
                <canvas
                  ref={canvasRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: isVRActive ? 'block' : 'none',
                    cursor: 'grab'
                  }}
                  onMouseMove={handleMouseMove}
                  onWheel={handleWheel}
                />
                
                {!isVRActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center'
                    }}
                  >
                    <ViewInAr sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Virtual Reality Viewer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click "Start VR Experience" to explore ancient astronomical instruments
                    </Typography>
                  </Box>
                )}

                {isVRActive && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 1
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        const canvas = canvasRef.current;
                        if (canvas.requestFullscreen) {
                          canvas.requestFullscreen();
                        }
                      }}
                      startIcon={<Fullscreen />}
                    >
                      Fullscreen
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Yantra Information */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Yantra: {yantraTypes.find(y => y.id === selectedYantra)?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {yantraTypes.find(y => y.id === selectedYantra)?.description}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">{timeOfDay}:00</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Virtual Time
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4">
                      {timeOfDay >= 6 && timeOfDay <= 18 ? '☀️' : '🌙'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {timeOfDay >= 6 && timeOfDay <= 18 ? 'Daytime' : 'Nighttime'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VRExperience;