import React, { useRef, useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Download, ZoomIn, ZoomOut, CenterFocusStrong } from '@mui/icons-material';

const YantraViewer2D = ({ yantraType, specs, astronomicalData }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [viewMode, setViewMode] = useState('top'); // top, side, detail
  const [showDimensions, setShowDimensions] = useState(true);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    if (specs && canvasRef.current) {
      drawYantra();
    }
  }, [specs, yantraType, scale, viewMode, showDimensions, showGrid]);

  const drawYantra = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style for technical drawings
    ctx.strokeStyle = '#8B4513';
    ctx.fillStyle = '#F5F3ED';
    ctx.lineWidth = 2;
    ctx.font = '12px Arial';
    
    // Draw background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }
    
    // Center point
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Scale factor for drawing
    const drawScale = scale * 20; // Adjust base scale
    
    // Draw yantra based on type
    switch (yantraType) {
      case 'samrat':
        drawSamratYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'rama':
        drawRamaYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'jai_prakash':
        drawJaiPrakashYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'digamsa':
        drawDigamsaYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'dhruva_protha_chakra':
        drawDhruvaProthaChakra(ctx, centerX, centerY, drawScale);
        break;
      case 'kapala':
        drawKapalaYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'chakra':
        drawChakraYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'unnatamsa':
        drawUnnatamsaYantra(ctx, centerX, centerY, drawScale);
        break;
      default:
        drawGenericYantra(ctx, centerX, centerY, drawScale);
    }
    
    // Draw title and specifications
    drawTitleBlock(ctx);
  };

  const drawGrid = (ctx) => {
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;
    
    const gridSize = 20;
    for (let x = 0; x <= ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
  };

  const drawSamratYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const baseLength = (specs.dimensions.base_length || 25) * scale;
    const baseWidth = (specs.dimensions.base_width || 20) * scale;
    const gnomonHeight = (specs.dimensions.gnomon_height || 20) * scale;
    
    if (viewMode === 'top') {
      // Top view - triangular gnomon
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base rectangle
      ctx.strokeRect(centerX - baseLength/2, centerY - baseWidth/2, baseLength, baseWidth);
      
      // Gnomon triangle (top view)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - baseWidth/2);
      ctx.lineTo(centerX - baseLength/4, centerY + baseWidth/2);
      ctx.lineTo(centerX + baseLength/4, centerY + baseWidth/2);
      ctx.closePath();
      ctx.stroke();
      
      // Hour markings
      for (let i = -6; i <= 6; i++) {
        const x = centerX + (i * baseLength/24);
        ctx.beginPath();
        ctx.moveTo(x, centerY - baseWidth/2);
        ctx.lineTo(x, centerY - baseWidth/2 + 10);
        ctx.stroke();
        
        if (showDimensions) {
          ctx.fillStyle = '#654321';
          ctx.fillText(`${i + 12}h`, x - 8, centerY - baseWidth/2 - 5);
        }
      }
      
    } else if (viewMode === 'side') {
      // Side view
      ctx.strokeRect(centerX - baseLength/2, centerY + 50, baseLength, 20);
      
      // Gnomon triangle (side view)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 50);
      ctx.lineTo(centerX, centerY + 50 - gnomonHeight);
      ctx.lineTo(centerX + baseLength/2, centerY + 50);
      ctx.stroke();
    }
    
    // Dimensions
    if (showDimensions) {
      drawDimensions(ctx, centerX, centerY, baseLength, baseWidth, scale);
    }
  };

  const drawRamaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const outerRadius = (specs.dimensions.outer_radius || 8) * scale;
    const innerRadius = (specs.dimensions.inner_radius || 3) * scale;
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Inner circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Central pillar
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Degree markings
    for (let i = 0; i < 360; i += 30) {
      const angle = (i * Math.PI) / 180;
      const x1 = centerX + Math.cos(angle) * (outerRadius - 10);
      const y1 = centerY + Math.sin(angle) * (outerRadius - 10);
      const x2 = centerX + Math.cos(angle) * outerRadius;
      const y2 = centerY + Math.sin(angle) * outerRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#654321';
        ctx.fillText(`${i}°`, x1 - 10, y1);
      }
    }
  };

  const drawJaiPrakashYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const radius = (specs.dimensions.hemisphere_radius || 8) * scale;
    
    if (viewMode === 'top') {
      // Top view - circular rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Inner markings for celestial coordinates
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1;
      
      // Declination circles
      for (let r = radius/4; r < radius; r += radius/4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.stroke();
      }
      
      // Hour lines
      for (let i = 0; i < 24; i++) {
        const angle = (i * 15 * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
      }
      
    } else if (viewMode === 'side') {
      // Side view - hemisphere profile
      ctx.beginPath();
      ctx.arc(centerX, centerY + radius/2, radius, Math.PI, 0);
      ctx.stroke();
      
      // Base line
      ctx.beginPath();
      ctx.moveTo(centerX - radius, centerY + radius/2);
      ctx.lineTo(centerX + radius, centerY + radius/2);
      ctx.stroke();
    }
    
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
  };

  const drawDigamsaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const arcRadius = (specs.dimensions.arc_radius || 5) * scale;
    
    // Vertical semicircle
    ctx.beginPath();
    ctx.arc(centerX, centerY, arcRadius, Math.PI, 0);
    ctx.stroke();
    
    // Base line
    ctx.beginPath();
    ctx.moveTo(centerX - arcRadius, centerY);
    ctx.lineTo(centerX + arcRadius, centerY);
    ctx.stroke();
    
    // Degree markings
    for (let i = 0; i <= 180; i += 30) {
      const angle = (i * Math.PI) / 180;
      const x1 = centerX + Math.cos(angle) * (arcRadius - 10);
      const y1 = centerY - Math.sin(angle) * (arcRadius - 10);
      const x2 = centerX + Math.cos(angle) * arcRadius;
      const y2 = centerY - Math.sin(angle) * arcRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#654321';
        ctx.fillText(`${i}°`, x1 - 10, y1 - 5);
      }
    }
  };

  const drawDhruvaProthaChakra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const radius = (specs.dimensions.disk_radius || 4) * scale;
    
    // Main circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Center point
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Concentric circles for measurements
    for (let r = radius/3; r < radius; r += radius/3) {
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
  };

  const drawKapalaYantra = (ctx, centerX, centerY, scale) => {
    drawJaiPrakashYantra(ctx, centerX, centerY, scale * 0.8); // Similar to Jai Prakash but smaller
  };

  const drawChakraYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const outerRadius = (specs.dimensions.outer_ring_radius || 6) * scale;
    const innerRadius = (specs.dimensions.inner_ring_radius || 3) * scale;
    
    // Nested rings
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Cross lines
    ctx.beginPath();
    ctx.moveTo(centerX - outerRadius, centerY);
    ctx.lineTo(centerX + outerRadius, centerY);
    ctx.moveTo(centerX, centerY - outerRadius);
    ctx.lineTo(centerX, centerY + outerRadius);
    ctx.stroke();
  };

  const drawUnnatamsaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const arcRadius = (specs.dimensions.arc_radius || 4) * scale;
    
    // Quarter circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, arcRadius, 0, Math.PI/2);
    ctx.stroke();
    
    // Base lines
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + arcRadius, centerY);
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - arcRadius);
    ctx.stroke();
    
    // Degree markings
    for (let i = 0; i <= 90; i += 15) {
      const angle = (i * Math.PI) / 180;
      const x1 = centerX + Math.cos(angle) * (arcRadius - 8);
      const y1 = centerY - Math.sin(angle) * (arcRadius - 8);
      const x2 = centerX + Math.cos(angle) * arcRadius;
      const y2 = centerY - Math.sin(angle) * arcRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#654321';
        ctx.fillText(`${i}°`, x1 - 5, y1 - 5);
      }
    }
  };

  const drawGenericYantra = (ctx, centerX, centerY, scale) => {
    // Generic circular yantra
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100 * scale, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.fillStyle = '#654321';
    ctx.fillText('Generic Yantra Layout', centerX - 70, centerY + 120 * scale);
  };

  const drawDimensions = (ctx, centerX, centerY, width, height, scale) => {
    if (!showDimensions) return;
    
    ctx.strokeStyle = '#CD853F';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#654321';
    
    // Dimension lines
    const offset = 30;
    
    // Width dimension
    ctx.beginPath();
    ctx.moveTo(centerX - width/2, centerY + height/2 + offset);
    ctx.lineTo(centerX + width/2, centerY + height/2 + offset);
    ctx.stroke();
    
    // Width arrows
    ctx.beginPath();
    ctx.moveTo(centerX - width/2, centerY + height/2 + offset - 5);
    ctx.lineTo(centerX - width/2, centerY + height/2 + offset + 5);
    ctx.moveTo(centerX + width/2, centerY + height/2 + offset - 5);
    ctx.lineTo(centerX + width/2, centerY + height/2 + offset + 5);
    ctx.stroke();
    
    // Width text
    const widthText = `${(width / scale / 20).toFixed(2)}m`;
    ctx.fillText(widthText, centerX - 20, centerY + height/2 + offset + 20);
    
    // Height dimension
    ctx.beginPath();
    ctx.moveTo(centerX - width/2 - offset, centerY - height/2);
    ctx.lineTo(centerX - width/2 - offset, centerY + height/2);
    ctx.stroke();
    
    // Height arrows
    ctx.beginPath();
    ctx.moveTo(centerX - width/2 - offset - 5, centerY - height/2);
    ctx.lineTo(centerX - width/2 - offset + 5, centerY - height/2);
    ctx.moveTo(centerX - width/2 - offset - 5, centerY + height/2);
    ctx.lineTo(centerX - width/2 - offset + 5, centerY + height/2);
    ctx.stroke();
    
    // Height text
    const heightText = `${(height / scale / 20).toFixed(2)}m`;
    ctx.save();
    ctx.translate(centerX - width/2 - offset - 20, centerY);
    ctx.rotate(-Math.PI/2);
    ctx.fillText(heightText, -20, 0);
    ctx.restore();
  };

  const drawTitleBlock = (ctx) => {
    const blockWidth = 200;
    const blockHeight = 100;
    const x = ctx.canvas.width - blockWidth - 10;
    const y = ctx.canvas.height - blockHeight - 10;
    
    // Title block border
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, blockWidth, blockHeight);
    
    // Title
    ctx.fillStyle = '#654321';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('YANTRA.AI', x + 10, y + 20);
    
    ctx.font = '12px Arial';
    ctx.fillText(`Type: ${yantraType?.replace('_', ' ') || 'Unknown'}`, x + 10, y + 40);
    ctx.fillText(`Scale: 1:${Math.round(20/scale)}`, x + 10, y + 55);
    ctx.fillText(`View: ${viewMode}`, x + 10, y + 70);
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, x + 10, y + 85);
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `yantra_2d_${yantraType}_${viewMode}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportAsSVG = () => {
    // Create SVG version for vector export (simplified version)
    const svgContent = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="600" fill="#F5F3ED"/>
        <text x="400" y="50" text-anchor="middle" font-family="Arial" font-size="16" fill="#654321">
          ${specs?.name || 'Yantra 2D Blueprint'}
        </text>
        <text x="400" y="70" text-anchor="middle" font-family="Arial" font-size="12" fill="#8B4513">
          View: ${viewMode} | Scale: 1:${Math.round(20/scale)}
        </text>
      </svg>
    `;
    
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.download = `yantra_2d_${yantraType}_${viewMode}.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Controls */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>View Mode</InputLabel>
              <Select
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                label="View Mode"
              >
                <MenuItem value="top">Top View</MenuItem>
                <MenuItem value="side">Side View</MenuItem>
                <MenuItem value="detail">Detail View</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setScale(Math.max(0.5, scale - 0.2))}
                startIcon={<ZoomOut />}
              >
                Zoom Out
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setScale(Math.min(3, scale + 0.2))}
                startIcon={<ZoomIn />}
              >
                Zoom In
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowDimensions(!showDimensions)}
              >
                {showDimensions ? 'Hide' : 'Show'} Dimensions
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={() => setShowGrid(!showGrid)}
              >
                {showGrid ? 'Hide' : 'Show'} Grid
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="contained"
                onClick={exportAsImage}
                startIcon={<Download />}
              >
                PNG
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={exportAsSVG}
                startIcon={<Download />}
              >
                SVG
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Canvas */}
      <Card sx={{ flex: 1, display: 'flex' }}>
        <CardContent sx={{ flex: 1, p: 1 }}>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '500px',
              border: '1px solid #D4AF37',
              borderRadius: '4px',
              backgroundColor: '#F5F3ED'
            }}
          />
        </CardContent>
      </Card>

      {/* Info */}
      <Box sx={{ mt: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Technical Drawing • Scale: 1:{Math.round(20/scale)} • 
          {specs && specs.coordinates ? 
            ` Location: ${specs.coordinates.latitude}°N, ${specs.coordinates.longitude}°E` : 
            ' No coordinates available'}
        </Typography>
      </Box>
    </Box>
  );
};

export default YantraViewer2D;