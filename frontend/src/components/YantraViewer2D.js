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
    
    // Draw yantra based on type (handle both old and new formats)
    const normalizedType = yantraType?.toLowerCase().replace('_yantra', '').replace(' yantra', '');
    
    switch (normalizedType) {
      case 'samrat':
        drawSamratYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'rama':
        drawRamaYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'jai_prakash':
      case 'jai prakash':
        drawJaiPrakashYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'digamsa':
        drawDigamsaYantra(ctx, centerX, centerY, drawScale);
        break;
      case 'dhruva_protha_chakra':
      case 'dhruva protha chakra':
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
    const gnomonAngle = specs.angles?.gnomon_angle || 0;
    
    if (viewMode === 'top') {
      // PRECISE TOP VIEW using API data
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform (scaled rectangle)
      ctx.strokeRect(centerX - baseLength/2, centerY - baseWidth/2, baseLength, baseWidth);
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - baseLength/2, centerY - baseWidth/2, baseLength, baseWidth);
      
      // Gnomon centerline (North-South axis)
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - baseWidth/2);
      ctx.lineTo(centerX, centerY + baseWidth/2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // East and West dial faces
      const dialThickness = 8;
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 4;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      // East dial face (right side)
      ctx.fillRect(centerX + baseLength/2 - dialThickness/2, centerY - baseWidth/2, dialThickness, baseWidth);
      ctx.strokeRect(centerX + baseLength/2 - dialThickness/2, centerY - baseWidth/2, dialThickness, baseWidth);
      
      // West dial face (left side) 
      ctx.fillRect(centerX - baseLength/2 - dialThickness/2, centerY - baseWidth/2, dialThickness, baseWidth);
      ctx.strokeRect(centerX - baseLength/2 - dialThickness/2, centerY - baseWidth/2, dialThickness, baseWidth);
      
      // PRECISE HOUR LINES using API calculated angles
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 2;
      
      if (specs.angles) {
        // Draw precise hour lines using API data
        for (let hour = 0; hour <= 12; hour++) {
          const hourKey = `hour_${hour.toString().padStart(2, '0')}`;
          if (specs.angles[hourKey] !== undefined) {
            const hourAngle = specs.angles[hourKey];
            const angleRad = (hourAngle * Math.PI) / 180;
            
            // Calculate precise hour line endpoints
            const lineLength = baseLength * 0.45;
            const endX = centerX + Math.sin(angleRad) * lineLength;
            const endY = centerY - Math.cos(angleRad) * lineLength;
            
            // Draw hour line from gnomon center to dial face
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // Hour marking point on dial face
            ctx.fillStyle = '#DC143C';
            ctx.beginPath();
            ctx.arc(endX, endY, 3, 0, 2 * Math.PI);
            ctx.fill();
            
            // Hour labels with precise positioning
            if (showDimensions && hour >= 6 && hour <= 18) {
              ctx.fillStyle = '#654321';
              ctx.font = 'bold 11px Arial';
              const displayHour = hour === 0 ? 12 : hour;
              ctx.fillText(`${displayHour}h`, endX + 8, endY + 4);
            }
          }
        }
      }
      
      // Add latitude-specific gnomon angle indicator
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      const gnomonRad = (gnomonAngle * Math.PI) / 180;
      const gnomonLineLength = baseLength * 0.3;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.sin(gnomonRad) * gnomonLineLength, 
                 centerY - Math.cos(gnomonRad) * gnomonLineLength);
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (showDimensions) {
        ctx.fillStyle = '#4169E1';
        ctx.font = '10px Arial';
        ctx.fillText(`Gnomon: ${gnomonAngle.toFixed(1)}°`, centerX + 10, centerY - baseWidth/2 - 20);
      }
      
    } else if (viewMode === 'side') {
      // PRECISE SIDE VIEW with correct gnomon angle
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform (side view)
      const baseThickness = 20;
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - baseLength/2, centerY + 50, baseLength, baseThickness);
      ctx.strokeRect(centerX - baseLength/2, centerY + 50, baseLength, baseThickness);
      
      // Triangular gnomon at precise latitude angle
      const gnomonRadians = (gnomonAngle * Math.PI) / 180;
      const gnomonTop = gnomonHeight * Math.cos(gnomonRadians);
      const gnomonOffset = gnomonHeight * Math.sin(gnomonRadians);
      
      ctx.fillStyle = 'rgba(135, 206, 235, 0.5)';
      ctx.beginPath();
      ctx.moveTo(centerX - baseLength/2, centerY + 50);  // South base
      ctx.lineTo(centerX + baseLength/2, centerY + 50);  // North base
      ctx.lineTo(centerX + gnomonOffset, centerY + 50 - gnomonTop);  // Gnomon top
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      // Dial faces (vertical)
      const dialHeight = baseWidth;
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 4;
      
      // East dial (right)
      ctx.beginPath();
      ctx.moveTo(centerX + baseLength/2, centerY + 50);
      ctx.lineTo(centerX + baseLength/2, centerY + 50 - dialHeight);
      ctx.stroke();
      
      // West dial (left)
      ctx.beginPath();
      ctx.moveTo(centerX - baseLength/2, centerY + 50);
      ctx.lineTo(centerX - baseLength/2, centerY + 50 - dialHeight);
      ctx.stroke();
      
      // Shadow rays for key hours
      if (specs.angles) {
        ctx.strokeStyle = '#FF6347';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        
        [6, 9, 12, 15, 18].forEach(hour => {
          const hourKey = `hour_${hour.toString().padStart(2, '0')}`;
          if (specs.angles[hourKey] !== undefined) {
            const shadowAngle = specs.angles[hourKey] * (Math.PI / 180);
            const shadowEndX = centerX + Math.sin(shadowAngle) * baseLength * 0.4;
            const shadowEndY = centerY + 50 - Math.abs(Math.cos(shadowAngle)) * dialHeight * 0.8;
            
            ctx.beginPath();
            ctx.moveTo(centerX + gnomonOffset, centerY + 50 - gnomonTop);
            ctx.lineTo(shadowEndX, shadowEndY);
            ctx.stroke();
          }
        });
        ctx.setLineDash([]);
      }
    }
    
    // Enhanced dimensions with API data
    if (showDimensions) {
      drawDimensions(ctx, centerX, centerY, baseLength, baseWidth, scale);
      
      // Additional precise dimensions from API
      ctx.fillStyle = '#4169E1';
      ctx.font = '12px Arial';
      const coordText = `Lat: ${specs.coordinates?.latitude?.toFixed(4)}°N, Lon: ${specs.coordinates?.longitude?.toFixed(4)}°E`;
      ctx.fillText(coordText, centerX - baseLength/2, centerY + baseWidth/2 + 60);
      
      const scaleText = `Scale Factor: ${specs.dimensions?.latitude_scale_factor?.toFixed(3)}`;
      ctx.fillText(scaleText, centerX - baseLength/2, centerY + baseWidth/2 + 80);
    }
  };

  const drawRamaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    const outerRadius = (specs.dimensions.outer_radius || 8) * scale;
    const innerRadius = (specs.dimensions.inner_radius || 3) * scale;
    const wallHeight = specs.dimensions.wall_height || 3;
    const numSectors = specs.angles?.num_sectors || specs.dimensions.num_sectors || 12;
    const scaleDisplayFactor = specs.dimensions.latitude_scale_factor || 1.0;
    const celestialPoleAlt = specs.angles?.celestial_pole_altitude || 0;
    
    // Enhanced Rama Yantra drawing with location-specific features
    
    // 1. OUTER CYLINDRICAL WALL
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // 2. INNER MEASUREMENT AREA
    ctx.strokeStyle = '#4682B4';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // 3. ENHANCED ALTITUDE SCALE MARKINGS (concentric circles)
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 1;
    for (let alt = 10; alt <= 80; alt += 10) {
      const altRadius = innerRadius + (outerRadius - innerRadius) * (alt / 90);
      ctx.beginPath();
      ctx.arc(centerX, centerY, altRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      if (showDimensions && alt % 20 === 0) {
        ctx.fillStyle = '#228B22';
        ctx.font = '10px Arial';
        ctx.fillText(`${alt}°`, centerX + altRadius + 5, centerY);
      }
    }
    
    // 4. ENHANCED SECTOR DIVISIONS (azimuth grid)
    ctx.strokeStyle = '#DC143C';
    ctx.lineWidth = 1.5;
    const sectorAngle = 360 / numSectors;
    
    for (let i = 0; i < numSectors; i++) {
      const angle = (i * sectorAngle * Math.PI) / 180;
      
      // Main sector line
      const x1 = centerX + Math.cos(angle) * innerRadius;
      const y1 = centerY + Math.sin(angle) * innerRadius;
      const x2 = centerX + Math.cos(angle) * outerRadius;
      const y2 = centerY + Math.sin(angle) * outerRadius;
      
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      
      // Enhanced azimuth labels with precise angles
      if (showDimensions) {
        const labelRadius = outerRadius + 15;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        
        ctx.fillStyle = '#DC143C';
        ctx.font = 'bold 11px Arial';
        const azimuthDegree = (i * sectorAngle) % 360;
        ctx.fillText(`${azimuthDegree}°`, labelX - 10, labelY + 3);
      }
    }
    
    // 5. CARDINAL DIRECTION MARKERS (enhanced)
    const cardinals = [
      { dir: 'N', angle: -Math.PI/2, color: '#FF0000' },
      { dir: 'E', angle: 0, color: '#FF0000' },
      { dir: 'S', angle: Math.PI/2, color: '#FF0000' },
      { dir: 'W', angle: Math.PI, color: '#FF0000' }
    ];
    
    cardinals.forEach(({ dir, angle, color }) => {
      const markerRadius = outerRadius + 30;
      const x = centerX + Math.cos(angle) * markerRadius;
      const y = centerY + Math.sin(angle) * markerRadius;
      
      ctx.fillStyle = color;
      ctx.font = 'bold 16px Arial';
      ctx.fillText(dir, x - 6, y + 6);
    });
    
    // 6. LOCATION-SPECIFIC INFORMATION DISPLAY
    if (showDimensions) {
      const infoY = centerY - outerRadius - 50;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Latitude Scale: ${scaleDisplayFactor.toFixed(3)}`, centerX - 100, infoY - 35);
      ctx.fillText(`Wall Height: ${wallHeight.toFixed(1)}m`, centerX - 100, infoY - 20);
      ctx.fillText(`Sectors: ${numSectors} divisions`, centerX - 100, infoY - 5);
      ctx.fillText(`Pole Altitude: ${celestialPoleAlt.toFixed(1)}°`, centerX - 100, infoY + 10);
      
      // Observable sky fraction indicator
      const skyFraction = specs.dimensions.observable_sky_fraction || 0.5;
      ctx.fillText(`Observable Sky: ${(skyFraction * 100).toFixed(1)}%`, centerX - 100, infoY + 25);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Location-specific calculations', centerX - 100, infoY + 40);
    }
    
    // 7. CENTRAL OBSERVATION AREA
    ctx.fillStyle = '#F0E68C';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 8. ENHANCED WALL THICKNESS INDICATION (for side view hint)
    if (viewMode !== 'top') {
      const wallThickness = 5;
      ctx.strokeStyle = '#696969';
      ctx.lineWidth = wallThickness;
      ctx.beginPath();
      ctx.arc(centerX, centerY, outerRadius - wallThickness/2, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const drawJaiPrakashYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED JAI PRAKASH YANTRA with comprehensive astronomical features
    const hemisphereRadius = (specs.dimensions.hemisphere_radius || 8) * scale;
    const equatorialRadius = (specs.dimensions.equatorial_radius || 6) * scale;
    const bowlDepth = (specs.dimensions.bowl_depth || 6.5) * scale;
    const rimThickness = (specs.dimensions.rim_thickness || 0.4) * scale;
    
    // Location-specific calculations
    const celestialPoleAlt = specs.angles?.pole_altitude || 28.7;
    const celestialEquatorAngle = specs.angles?.celestial_equator_angle || 61.3;
    const scaleDisplayFactor = specs.angles?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // 1. MAIN HEMISPHERE STRUCTURE
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Outer rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, hemisphereRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Inner bowl rim
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, hemisphereRadius - rimThickness, 0, 2 * Math.PI);
      ctx.stroke();
      
      // 2. ENHANCED DECLINATION CIRCLES (based on API data)
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1.5;
      
      // Extract declination values from API
      const declinations = [];
      if (specs.angles) {
        for (let key in specs.angles) {
          if (key.startsWith('decl_circle_declination_')) {
            const declValue = specs.angles[key];
            declinations.push(declValue);
          }
        }
      }
      
      // Draw declination circles with proper astronomical spacing
      declinations.forEach((decl, index) => {
        // Calculate radius based on declination and hemisphere geometry
        const declRadiusFactor = Math.cos((Math.abs(decl) * Math.PI) / 180);
        const declRadius = equatorialRadius * declRadiusFactor;
        
        if (declRadius > 5 && declRadius < hemisphereRadius - rimThickness) {
          ctx.beginPath();
          ctx.arc(centerX, centerY, declRadius, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Label key declination circles
          if (Math.abs(decl) % 15 === 0 && showDimensions) {
            ctx.fillStyle = '#8B4513';
            ctx.font = '10px Arial';
            const label = decl >= 0 ? `+${decl}°` : `${decl}°`;
            ctx.fillText(label, centerX + declRadius - 15, centerY - 5);
          }
        }
      });
      
      // 3. ENHANCED HOUR LINES (location-specific hour angles from API)
      ctx.strokeStyle = '#B8860B';
      ctx.lineWidth = 1.2;
      
      for (let hour = 0; hour < 24; hour++) {
        const hourKey = `hour_angle_hour_${hour.toString().padStart(2, '0')}`;
        let hourAngle = specs.angles?.[hourKey];
        
        if (hourAngle !== undefined) {
          // Convert to radians and adjust for display
          const angle = (hourAngle * Math.PI) / 180;
          
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + Math.cos(angle - Math.PI/2) * (hemisphereRadius - rimThickness),
            centerY + Math.sin(angle - Math.PI/2) * (hemisphereRadius - rimThickness)
          );
          ctx.stroke();
          
          // Label every 3 hours
          if (hour % 3 === 0 && showDimensions) {
            const labelRadius = hemisphereRadius - rimThickness + 15;
            const labelX = centerX + Math.cos(angle - Math.PI/2) * labelRadius;
            const labelY = centerY + Math.sin(angle - Math.PI/2) * labelRadius;
            
            ctx.fillStyle = '#8B4513';
            ctx.font = 'bold 11px Arial';
            ctx.fillText(`${hour}h`, labelX - 8, labelY + 4);
          }
        }
      }
      
      // 4. CELESTIAL EQUATOR (specially emphasized)
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, equatorialRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#FF6347';
        ctx.font = 'bold 10px Arial';
        ctx.fillText('Celestial Equator', centerX + equatorialRadius + 5, centerY);
      }
      
      // 5. CARDINAL DIRECTIONS & ZENITH POINT
      ctx.fillStyle = '#8B0000';
      ctx.font = 'bold 14px Arial';
      
      // Zenith at center
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillText('Z', centerX - 5, centerY - 8);
      
      // Cardinal points
      const cardinalRadius = hemisphereRadius + 20;
      ctx.font = 'bold 12px Arial';
      ctx.fillText('N', centerX - 5, centerY - cardinalRadius);
      ctx.fillText('S', centerX - 5, centerY + cardinalRadius + 15);
      ctx.fillText('E', centerX + cardinalRadius - 5, centerY + 5);
      ctx.fillText('W', centerX - cardinalRadius - 5, centerY + 5);
      
    } else if (viewMode === 'side') {
      // ENHANCED SIDE VIEW - showing hemisphere profile with bowl depth
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Hemisphere profile
      ctx.beginPath();
      ctx.arc(centerX, centerY, hemisphereRadius, Math.PI, 0);
      ctx.stroke();
      
      // Base rim
      ctx.beginPath();
      ctx.moveTo(centerX - hemisphereRadius, centerY);
      ctx.lineTo(centerX + hemisphereRadius, centerY);
      ctx.stroke();
      
      // Bowl depth indication
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY - bowlDepth);
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '11px Arial';
        ctx.fillText(`Bowl Depth: ${(bowlDepth/scale).toFixed(1)}m`, centerX + hemisphereRadius + 10, centerY - 20);
        ctx.fillText(`Pole Alt: ${celestialPoleAlt.toFixed(1)}°`, centerX + hemisphereRadius + 10, centerY - 5);
      }
    }
    
    // 6. LOCATION-SPECIFIC INFORMATION DISPLAY
    if (showDimensions) {
      const infoY = centerY - hemisphereRadius - 60;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Hemisphere R: ${(hemisphereRadius/scale).toFixed(1)}m`, centerX - 120, infoY - 35);
      ctx.fillText(`Equatorial R: ${(equatorialRadius/scale).toFixed(1)}m`, centerX - 120, infoY - 20);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 120, infoY - 5);
      ctx.fillText(`Pole Altitude: ${celestialPoleAlt.toFixed(1)}°`, centerX - 120, infoY + 10);
      ctx.fillText(`Equator Angle: ${celestialEquatorAngle.toFixed(1)}°`, centerX - 120, infoY + 25);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Location-specific hemisphere geometry', centerX - 120, infoY + 40);
    }
    
    // Reset styles
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
  };

  const drawDigamsaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED DIGAMSA YANTRA - Vertical quadrant for azimuth measurement
    const arcRadius = (specs.dimensions.arc_radius || 5) * scale;
    const pillarHeight = (specs.dimensions.pillar_height || 4) * scale;
    const baseWidth = (specs.dimensions.base_width || 3) * scale;
    
    // Location-specific data
    const magneticDeclination = specs.angles?.magnetic_declination || 0;
    const trueNorthCorrection = specs.angles?.true_north_correction || 0;
    const scaleDisplayFactor = specs.dimensions?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // TOP VIEW - Base platform and alignment
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform (rectangular)
      const platformLength = baseWidth * 2;
      ctx.strokeRect(centerX - platformLength/2, centerY - baseWidth/2, platformLength, baseWidth);
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - platformLength/2, centerY - baseWidth/2, platformLength, baseWidth);
      
      // Central pillar base
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = '#D2B48C';
      ctx.fill();
      
      // True North alignment indicator
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      const northAngle = (trueNorthCorrection * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.sin(northAngle) * arcRadius * 0.8,
        centerY - Math.cos(northAngle) * arcRadius * 0.8
      );
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (showDimensions) {
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 10px Arial';
        ctx.fillText('True N', centerX + 15, centerY - arcRadius * 0.6);
      }
      
    } else if (viewMode === 'side') {
      // ENHANCED SIDE VIEW - Vertical semicircle
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - baseWidth, centerY + 20, baseWidth * 2, 15);
      ctx.strokeRect(centerX - baseWidth, centerY + 20, baseWidth * 2, 15);
      
      // Vertical pillar
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 20);
      ctx.lineTo(centerX, centerY + 20 - pillarHeight);
      ctx.stroke();
      
      // Vertical semicircle
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, arcRadius, Math.PI, 0);
      ctx.stroke();
      
      // Base diameter
      ctx.beginPath();
      ctx.moveTo(centerX - arcRadius, centerY);
      ctx.lineTo(centerX + arcRadius, centerY);
      ctx.stroke();
      
      // ENHANCED AZIMUTH MARKINGS
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1.5;
      
      for (let azimuth = 0; azimuth <= 180; azimuth += 15) {
        const angle = (azimuth * Math.PI) / 180;
        const isMajor = azimuth % 30 === 0;
        const markLength = isMajor ? 15 : 8;
        
        const x1 = centerX + Math.cos(angle) * (arcRadius - markLength);
        const y1 = centerY - Math.sin(angle) * (arcRadius - markLength);
        const x2 = centerX + Math.cos(angle) * arcRadius;
        const y2 = centerY - Math.sin(angle) * arcRadius;
        
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        if (isMajor && showDimensions) {
          ctx.fillStyle = '#654321';
          ctx.font = 'bold 9px Arial';
          ctx.fillText(`${azimuth}°`, x1 - 10, y1 - 5);
        }
      }
      
      // Plumb line
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - arcRadius + 10);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Location-specific information
    if (showDimensions) {
      const infoY = centerY - arcRadius - 50;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Arc Radius: ${(arcRadius/scale).toFixed(1)}m`, centerX - 90, infoY - 25);
      ctx.fillText(`Pillar Height: ${(pillarHeight/scale).toFixed(1)}m`, centerX - 90, infoY - 10);
      ctx.fillText(`Magnetic Decl: ${magneticDeclination.toFixed(1)}°`, centerX - 90, infoY + 5);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 90, infoY + 20);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Azimuth measurement with magnetic correction', centerX - 90, infoY + 35);
    }
  };

  const drawDhruvaProthaChakra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED DHRUVA-PROTHA-CHAKRA - Polar alignment and circumpolar tracking
    const diskRadius = (specs.dimensions.disk_radius || 4) * scale;
    const poleHeight = (specs.dimensions.pole_height || 2) * scale;
    const baseRadius = (specs.dimensions.base_radius || 6) * scale;
    
    // Location-specific calculations
    const celestialPoleAlt = specs.angles?.celestial_pole_altitude || 28.7;
    const polarisDistance = specs.angles?.polaris_distance_from_pole || 0.7;
    const scaleDisplayFactor = specs.dimensions?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // TOP VIEW - Circular base with polar disk
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Outer base circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fill();
      
      // Central polar disk
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, diskRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = 'rgba(210, 180, 140, 0.7)';
      ctx.fill();
      
      // ENHANCED HOUR MARKINGS (24-hour system)
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 1.5;
      
      for (let hour = 0; hour < 24; hour++) {
        const angle = (hour * 15 * Math.PI) / 180; // 15° per hour
        const isMainHour = hour % 3 === 0;
        const lineLength = isMainHour ? 20 : 12;
        
        const x1 = centerX + Math.cos(angle - Math.PI/2) * (diskRadius - lineLength);
        const y1 = centerY + Math.sin(angle - Math.PI/2) * (diskRadius - lineLength);
        const x2 = centerX + Math.cos(angle - Math.PI/2) * diskRadius;
        const y2 = centerY + Math.sin(angle - Math.PI/2) * diskRadius;
        
        ctx.lineWidth = isMainHour ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Hour labels
        if (isMainHour && showDimensions) {
          const labelRadius = diskRadius + 12;
          const labelX = centerX + Math.cos(angle - Math.PI/2) * labelRadius;
          const labelY = centerY + Math.sin(angle - Math.PI/2) * labelRadius;
          
          ctx.fillStyle = '#DC143C';
          ctx.font = 'bold 9px Arial';
          ctx.fillText(`${hour}h`, labelX - 6, labelY + 3);
        }
      }
      
      // CIRCUMPOLAR STAR TRACKS
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 1;
      
      const declinations = [75, 80, 85, 89];
      declinations.forEach((decl, index) => {
        const trackRadius = diskRadius * 0.3 + (diskRadius * 0.6) * (decl - 70) / 20;
        if (trackRadius > diskRadius * 0.2 && trackRadius < diskRadius * 0.9) {
          ctx.setLineDash(index % 2 === 0 ? [] : [3, 3]);
          ctx.beginPath();
          ctx.arc(centerX, centerY, trackRadius, 0, 2 * Math.PI);
          ctx.stroke();
          
          if (showDimensions && index % 2 === 0) {
            ctx.fillStyle = '#228B22';
            ctx.font = '8px Arial';
            ctx.fillText(`${decl}°`, centerX + trackRadius - 8, centerY - 3);
          }
        }
      });
      ctx.setLineDash([]);
      
      // Celestial pole center
      ctx.fillStyle = '#FF6347';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#8B0000';
        ctx.font = 'bold 9px Arial';
        ctx.fillText('NCP', centerX - 10, centerY - 10);
      }
      
      // Polaris position (offset from pole)
      const polarisX = centerX + Math.cos(0) * polarisDistance * scale * 3;
      const polarisY = centerY + Math.sin(0) * polarisDistance * scale * 3;
      
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(polarisX, polarisY, 3, 0, 2 * Math.PI);
      ctx.fill();
      
      if (showDimensions) {
        ctx.fillStyle = '#FF8C00';
        ctx.font = '8px Arial';
        ctx.fillText('Polaris', polarisX + 6, polarisY);
      }
      
      // Cardinal directions
      const cardinals = [
        { dir: 'N', angle: -Math.PI/2, color: '#FF0000' },
        { dir: 'E', angle: 0, color: '#228B22' },
        { dir: 'S', angle: Math.PI/2, color: '#FF0000' },
        { dir: 'W', angle: Math.PI, color: '#228B22' }
      ];
      
      cardinals.forEach(({ dir, angle, color }) => {
        const markerRadius = baseRadius + 15;
        const x = centerX + Math.cos(angle) * markerRadius;
        const y = centerY + Math.sin(angle) * markerRadius;
        
        ctx.fillStyle = color;
        ctx.font = 'bold 12px Arial';
        ctx.fillText(dir, x - 5, y + 5);
      });
      
    } else if (viewMode === 'side') {
      // ENHANCED SIDE VIEW - Shows latitude tilt
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - baseRadius, centerY + 30, baseRadius * 2, 20);
      ctx.strokeRect(centerX - baseRadius, centerY + 30, baseRadius * 2, 20);
      
      // Support pole
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 30);
      ctx.lineTo(centerX, centerY + 30 - poleHeight);
      ctx.stroke();
      
      // Tilted polar disk (shows latitude tilt)
      const tiltAngle = (celestialPoleAlt * Math.PI) / 180;
      
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(1, Math.sin(tiltAngle));
      ctx.beginPath();
      ctx.arc(0, 0, diskRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
      
      // Polar axis indication
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + diskRadius * Math.cos(tiltAngle), centerY - diskRadius * Math.sin(tiltAngle));
      ctx.stroke();
      ctx.setLineDash([]);
      
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '10px Arial';
        ctx.fillText(`Tilt: ${celestialPoleAlt.toFixed(1)}° (= Latitude)`, centerX + diskRadius + 10, centerY - 15);
        ctx.fillText(`Pole Height: ${(poleHeight/scale).toFixed(1)}m`, centerX + diskRadius + 10, centerY);
      }
    }
    
    // Location-specific information
    if (showDimensions) {
      const infoY = centerY - baseRadius - 60;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Disk Radius: ${(diskRadius/scale).toFixed(1)}m`, centerX - 100, infoY - 30);
      ctx.fillText(`Base Radius: ${(baseRadius/scale).toFixed(1)}m`, centerX - 100, infoY - 15);
      ctx.fillText(`Pole Altitude: ${celestialPoleAlt.toFixed(1)}°`, centerX - 100, infoY);
      ctx.fillText(`Polaris Offset: ${polarisDistance.toFixed(1)}°`, centerX - 100, infoY + 15);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 100, infoY + 30);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Polar tracking with latitude-dependent tilt', centerX - 100, infoY + 45);
    }
    
    // Reset styles
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
  };

  const drawKapalaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED KAPALA YANTRA - Bowl sundial with precise calculations
    const bowlRadius = (specs.dimensions.bowl_radius || 6) * scale;
    const bowlDepth = (specs.dimensions.bowl_depth || 4) * scale;
    const rimThickness = (specs.dimensions.rim_thickness || 0.3) * scale;
    const gnomonHeight = (specs.dimensions.gnomon_height || 3) * scale;
    
    // Location-specific data
    const shadowCurveRadius = specs.dimensions?.shadow_curve_radius || bowlRadius * 0.8;
    const seasonalRange = specs.angles?.seasonal_range || 47;
    const celestialPoleAlt = specs.angles?.celestial_pole_altitude || 28.7;
    const scaleDisplayFactor = specs.dimensions?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // TOP VIEW - Circular bowl with hour lines
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Outer rim
      ctx.beginPath();
      ctx.arc(centerX, centerY, bowlRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Inner bowl wall
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, bowlRadius - rimThickness, 0, 2 * Math.PI);
      ctx.stroke();
      
      // ENHANCED HOUR LINES (concave surface projection)
      ctx.strokeStyle = '#DC143C';
      ctx.lineWidth = 1.5;
      
      // Extract hour angles from API data or use calculated angles
      for (let hour = 6; hour <= 18; hour++) {
        const hourKey = `hour_angle_hour_${hour.toString().padStart(2, '0')}`;
        let hourAngle;
        
        if (specs.angles && specs.angles[hourKey] !== undefined) {
          hourAngle = specs.angles[hourKey];
        } else {
          // Fallback calculation for bowl sundial
          hourAngle = (hour - 12) * 15; // Basic hour angle
        }
        
        const angle = (hourAngle * Math.PI) / 180;
        
        // Project hour line on bowl surface
        const lineRadius = (bowlRadius - rimThickness) * 0.9;
        const endX = centerX + Math.cos(angle - Math.PI/2) * lineRadius;
        const endY = centerY + Math.sin(angle - Math.PI/2) * lineRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        
        // Hour marking dot
        ctx.fillStyle = '#DC143C';
        ctx.beginPath();
        ctx.arc(endX, endY, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        if (showDimensions && hour % 3 === 0) {
          ctx.fillStyle = '#8B4513';
          ctx.font = 'bold 10px Arial';
          ctx.fillText(`${hour}h`, endX + 5, endY);
        }
      }
      
      // ENHANCED ALTITUDE CIRCLES (bowl depth indicators)
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 1;
      
      for (let alt = 15; alt <= 75; alt += 15) {
        // Calculate radius based on bowl geometry and altitude
        const altRadiusFactor = Math.sin((alt * Math.PI) / 180);
        const altRadius = (bowlRadius - rimThickness) * altRadiusFactor;
        
        if (altRadius > 10) {
          ctx.setLineDash(alt % 30 === 0 ? [] : [3, 3]);
          ctx.beginPath();
          ctx.arc(centerX, centerY, altRadius, 0, 2 * Math.PI);
          ctx.stroke();
          
          if (showDimensions && alt % 30 === 0) {
            ctx.fillStyle = '#228B22';
            ctx.font = '9px Arial';
            ctx.fillText(`${alt}°`, centerX + altRadius - 15, centerY - 5);
          }
        }
      }
      ctx.setLineDash([]);
      
      // SEASONAL SHADOW CURVES
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      // Summer and winter solstice curves
      for (let season of ['summer', 'winter']) {
        const seasonRadius = shadowCurveRadius * (season === 'summer' ? 0.6 : 0.9);
        ctx.beginPath();
        ctx.arc(centerX, centerY, seasonRadius, 0, 2 * Math.PI);
        ctx.stroke();
        
        if (showDimensions) {
          ctx.fillStyle = '#FF6347';
          ctx.font = '8px Arial';
          ctx.fillText(season.charAt(0).toUpperCase() + season.slice(1), 
                      centerX + seasonRadius - 20, centerY - 5);
        }
      }
      ctx.setLineDash([]);
      
      // CENTRAL GNOMON POST
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Gnomon shadow tip indicator
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
      
    } else if (viewMode === 'side') {
      // ENHANCED SIDE VIEW - Bowl cross-section
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Bowl profile (hemisphere)
      ctx.beginPath();
      ctx.arc(centerX, centerY, bowlRadius, 0, Math.PI);
      ctx.stroke();
      
      // Rim thickness
      ctx.beginPath();
      ctx.arc(centerX, centerY, bowlRadius - rimThickness, 0, Math.PI);
      ctx.stroke();
      
      // Base/ground level
      ctx.beginPath();
      ctx.moveTo(centerX - bowlRadius - 20, centerY);
      ctx.lineTo(centerX + bowlRadius + 20, centerY);
      ctx.stroke();
      
      // Central gnomon (vertical)
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY - gnomonHeight);
      ctx.stroke();
      
      // Gnomon tip
      ctx.fillStyle = '#4169E1';
      ctx.beginPath();
      ctx.arc(centerX, centerY - gnomonHeight, 3, 0, 2 * Math.PI);
      ctx.fill();
      
      // Sample shadow rays for different seasons
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      const shadowAngles = [30, 45, 60]; // degrees from horizontal
      shadowAngles.forEach((shadowAngle, index) => {
        const angle = (shadowAngle * Math.PI) / 180;
        const shadowLength = bowlRadius * 0.8;
        const shadowEndX = centerX + Math.cos(angle) * shadowLength;
        const shadowEndY = centerY - Math.sin(angle) * shadowLength;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - gnomonHeight);
        ctx.lineTo(shadowEndX, shadowEndY);
        ctx.stroke();
        
        if (showDimensions && index === 1) {
          ctx.fillStyle = '#FF6347';
          ctx.font = '8px Arial';
          ctx.fillText(`${shadowAngle}°`, shadowEndX + 5, shadowEndY);
        }
      });
      ctx.setLineDash([]);
      
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '10px Arial';
        ctx.fillText(`Bowl R: ${(bowlRadius/scale).toFixed(1)}m`, centerX + bowlRadius + 10, centerY - 30);
        ctx.fillText(`Depth: ${(bowlDepth/scale).toFixed(1)}m`, centerX + bowlRadius + 10, centerY - 15);
        ctx.fillText(`Gnomon: ${(gnomonHeight/scale).toFixed(1)}m`, centerX + bowlRadius + 10, centerY);
      }
    }
    
    // Location-specific information
    if (showDimensions) {
      const infoY = centerY - bowlRadius - 70;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Bowl Radius: ${(bowlRadius/scale).toFixed(1)}m`, centerX - 110, infoY - 30);
      ctx.fillText(`Bowl Depth: ${(bowlDepth/scale).toFixed(1)}m`, centerX - 110, infoY - 15);
      ctx.fillText(`Gnomon Height: ${(gnomonHeight/scale).toFixed(1)}m`, centerX - 110, infoY);
      ctx.fillText(`Pole Altitude: ${celestialPoleAlt.toFixed(1)}°`, centerX - 110, infoY + 15);
      ctx.fillText(`Seasonal Range: ${seasonalRange.toFixed(1)}°`, centerX - 110, infoY + 30);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 110, infoY + 45);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Bowl sundial with concave hour projections', centerX - 110, infoY + 60);
    }
  };

  const drawChakraYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED CHAKRA YANTRA - Multi-ring celestial coordinate system
    const outerRingRadius = (specs.dimensions.outer_ring_radius || 6) * scale;
    const middleRingRadius = (specs.dimensions.middle_ring_radius || 4.5) * scale;
    const innerRingRadius = (specs.dimensions.inner_ring_radius || 3) * scale;
    const centralDiscRadius = (specs.dimensions.central_disc_radius || 1.5) * scale;
    const ringThickness = (specs.dimensions.ring_thickness || 0.2) * scale;
    
    // Location-specific calculations
    const eclipticAngle = specs.angles?.ecliptic_angle || 23.4;
    const celestialPoleAlt = specs.angles?.celestial_pole_altitude || 28.7;
    const equinoxPoints = specs.angles?.equinox_points || [0, 180];
    const scaleDisplayFactor = specs.dimensions?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // MULTI-RING STRUCTURE with different functions
      const rings = [
        { radius: outerRingRadius, color: '#8B4513', width: 3, label: 'Horizon Ring' },
        { radius: middleRingRadius, color: '#4682B4', width: 2.5, label: 'Ecliptic Ring' },
        { radius: innerRingRadius, color: '#228B22', width: 2, label: 'Equator Ring' },
        { radius: centralDiscRadius, color: '#DC143C', width: 2, label: 'Pole Disc' }
      ];
      
      rings.forEach((ring, index) => {
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        
        // Main ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Ring thickness indication (for outer rings)
        if (index < 3) {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ring.radius - ringThickness, 0, 2 * Math.PI);
          ctx.stroke();
        }
        
        // Ring labels
        if (showDimensions) {
          ctx.fillStyle = ring.color;
          ctx.font = '9px Arial';
          ctx.fillText(ring.label, centerX + ring.radius + 5, centerY - index * 12);
        }
      });
      
      // ENHANCED ZODIAC/MONTH DIVISIONS (outer ring)
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 1.5;
      
      const zodiacSigns = [
        'Ari', 'Tau', 'Gem', 'Can', 'Leo', 'Vir',
        'Lib', 'Sco', 'Sag', 'Cap', 'Aqu', 'Pis'
      ];
      
      for (let month = 0; month < 12; month++) {
        const angle = (month * 30 * Math.PI) / 180; // 30° per zodiac sign
        
        // Zodiac division line
        const x1 = centerX + Math.cos(angle - Math.PI/2) * (outerRingRadius - 15);
        const y1 = centerY + Math.sin(angle - Math.PI/2) * (outerRingRadius - 15);
        const x2 = centerX + Math.cos(angle - Math.PI/2) * outerRingRadius;
        const y2 = centerY + Math.sin(angle - Math.PI/2) * outerRingRadius;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Zodiac labels
        if (showDimensions) {
          const labelRadius = outerRingRadius + 12;
          const labelX = centerX + Math.cos(angle - Math.PI/2 + Math.PI/24) * labelRadius;
          const labelY = centerY + Math.sin(angle - Math.PI/2 + Math.PI/24) * labelRadius;
          
          ctx.fillStyle = '#8B4513';
          ctx.font = 'bold 8px Arial';
          ctx.fillText(zodiacSigns[month], labelX - 8, labelY + 3);
        }
      }
      
      // ECLIPTIC PLANE VISUALIZATION (middle ring)
      ctx.strokeStyle = '#4682B4';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      // Show ecliptic tilt with indicators
      const tiltIndicators = 4;
      for (let i = 0; i < tiltIndicators; i++) {
        const angle = (i * Math.PI) / 2;
        const tiltOffset = Math.sin(eclipticAngle * Math.PI / 180) * 12;
        
        const x1 = centerX + Math.cos(angle) * middleRingRadius;
        const y1 = centerY + Math.sin(angle) * middleRingRadius;
        const x2 = x1;
        const y2 = y1 + (i % 2 === 0 ? tiltOffset : -tiltOffset);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      
      // ENHANCED HOUR MARKINGS (inner ring)
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 1.2;
      
      for (let hour = 0; hour < 24; hour++) {
        const angle = (hour * 15 * Math.PI) / 180; // 15° per hour
        const isMainHour = hour % 6 === 0;
        const lineLength = isMainHour ? 12 : 6;
        
        const x1 = centerX + Math.cos(angle - Math.PI/2) * (innerRingRadius - lineLength);
        const y1 = centerY + Math.sin(angle - Math.PI/2) * (innerRingRadius - lineLength);
        const x2 = centerX + Math.cos(angle - Math.PI/2) * innerRingRadius;
        const y2 = centerY + Math.sin(angle - Math.PI/2) * innerRingRadius;
        
        ctx.lineWidth = isMainHour ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Major hour labels
        if (isMainHour && showDimensions) {
          const labelX = centerX + Math.cos(angle - Math.PI/2) * (innerRingRadius - 20);
          const labelY = centerY + Math.sin(angle - Math.PI/2) * (innerRingRadius - 20);
          
          ctx.fillStyle = '#228B22';
          ctx.font = 'bold 9px Arial';
          ctx.fillText(`${hour}h`, labelX - 6, labelY + 3);
        }
      }
      
      // CARDINAL CROSS LINES
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 2;
      
      // N-S line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - outerRingRadius);
      ctx.lineTo(centerX, centerY + outerRingRadius);
      ctx.stroke();
      
      // E-W line
      ctx.beginPath();
      ctx.moveTo(centerX - outerRingRadius, centerY);
      ctx.lineTo(centerX + outerRingRadius, centerY);
      ctx.stroke();
      
      // Cardinal labels
      if (showDimensions) {
        ctx.fillStyle = '#FF0000';
        ctx.font = 'bold 11px Arial';
        ctx.fillText('N', centerX - 4, centerY - outerRingRadius - 8);
        ctx.fillText('S', centerX - 4, centerY + outerRingRadius + 15);
        ctx.fillText('E', centerX + outerRingRadius + 8, centerY + 4);
        ctx.fillText('W', centerX - outerRingRadius - 15, centerY + 4);
      }
      
      // EQUINOX POINTS MARKING
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      equinoxPoints.forEach(point => {
        const angle = (point * Math.PI) / 180;
        const x = centerX + Math.cos(angle - Math.PI/2) * middleRingRadius;
        const y = centerY + Math.sin(angle - Math.PI/2) * middleRingRadius;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.stroke();
        
        if (showDimensions) {
          ctx.fillStyle = '#FFD700';
          ctx.font = '8px Arial';
          ctx.fillText(point === 0 ? 'Spr' : 'Aut', x + 6, y);
        }
      });
      
      // CENTRAL POLE DISC
      ctx.fillStyle = '#DC143C';
      ctx.beginPath();
      ctx.arc(centerX, centerY, centralDiscRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
    } else if (viewMode === 'side') {
      // SIDE VIEW - Ring assembly structure
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - outerRingRadius - 15, centerY + 25, 
                   2 * (outerRingRadius + 15), 15);
      ctx.strokeRect(centerX - outerRingRadius - 15, centerY + 25, 
                     2 * (outerRingRadius + 15), 15);
      
      // Ring assembly (stacked rings)
      const ringHeights = [0, 6, 12, 18];
      const ringData = [
        { radius: outerRingRadius, color: '#8B4513', width: 3 },
        { radius: middleRingRadius, color: '#4682B4', width: 2.5 },
        { radius: innerRingRadius, color: '#228B22', width: 2 },
        { radius: centralDiscRadius, color: '#DC143C', width: 2 }
      ];
      
      ringData.forEach((ring, index) => {
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        
        const ringY = centerY + 25 - ringHeights[index];
        ctx.strokeRect(centerX - ring.radius, ringY - 3, 2 * ring.radius, 6);
        
        // Ring thickness indication
        if (index < 3) {
          ctx.lineWidth = 1;
          ctx.strokeRect(centerX - ring.radius + ringThickness, ringY - 2, 
                        2 * (ring.radius - ringThickness), 4);
        }
      });
      
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '10px Arial';
        ctx.fillText(`Outer R: ${(outerRingRadius/scale).toFixed(1)}m`, 
                    centerX + outerRingRadius + 10, centerY - 5);
        ctx.fillText(`Ring Thickness: ${(ringThickness/scale).toFixed(2)}m`, 
                    centerX + outerRingRadius + 10, centerY + 10);
      }
    }
    
    // Location-specific information
    if (showDimensions) {
      const infoY = centerY - outerRingRadius - 80;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Outer Ring R: ${(outerRingRadius/scale).toFixed(1)}m`, centerX - 120, infoY - 35);
      ctx.fillText(`Ecliptic Angle: ${eclipticAngle.toFixed(1)}°`, centerX - 120, infoY - 20);
      ctx.fillText(`Pole Altitude: ${celestialPoleAlt.toFixed(1)}°`, centerX - 120, infoY - 5);
      ctx.fillText(`Rings: 4 concentric (multi-function)`, centerX - 120, infoY + 10);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 120, infoY + 25);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Multi-ring celestial coordinate system', centerX - 120, infoY + 40);
    }
  };

  const drawUnnatamsaYantra = (ctx, centerX, centerY, scale) => {
    if (!specs?.dimensions) return;
    
    // ENHANCED UNNATAMSA YANTRA - Solar altitude measurement quadrant
    const arcRadius = (specs.dimensions.arc_radius || 4) * scale;
    const baseLength = (specs.dimensions.base_length || 6) * scale;
    const wallThickness = (specs.dimensions.wall_thickness || 0.4) * scale;
    const pillarHeight = (specs.dimensions.pillar_height || 8) * scale;
    
    // Location-specific calculations
    const maxSolarAltitude = specs.angles?.max_solar_altitude || 85.3;
    const solsticeAltitudes = {
      summer: specs.angles?.summer_solstice_altitude || 82.5,
      winter: specs.angles?.winter_solstice_altitude || 35.7
    };
    const noonAltitude = specs.angles?.noon_altitude || 59.2;
    const scaleDisplayFactor = specs.dimensions?.latitude_scale_factor || 1.0;
    
    if (viewMode === 'top') {
      // TOP VIEW - L-shaped base structure
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Horizontal base arm
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX, centerY - wallThickness/2, baseLength, wallThickness);
      ctx.strokeRect(centerX, centerY - wallThickness/2, baseLength, wallThickness);
      
      // Vertical base arm
      ctx.fillRect(centerX - wallThickness/2, centerY - baseLength, wallThickness, baseLength);
      ctx.strokeRect(centerX - wallThickness/2, centerY - baseLength, wallThickness, baseLength);
      
      // Central pivot point
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = '#D2B48C';
      ctx.fill();
      
      // Quadrant arc indication (dotted)
      ctx.strokeStyle = '#4682B4';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, arcRadius, 0, Math.PI/2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Alignment indicators
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = 'bold 10px Arial';
        ctx.fillText('EAST', centerX + baseLength/2 - 10, centerY + 15);
        ctx.fillText('NORTH', centerX - 20, centerY - baseLength/2);
        
        // Shadow direction indicator
        ctx.strokeStyle = '#FF6347';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        const shadowAngle = (45 * Math.PI) / 180; // Sample noon shadow
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(shadowAngle) * arcRadius * 0.7, 
                   centerY - Math.sin(shadowAngle) * arcRadius * 0.7);
        ctx.stroke();
        ctx.setLineDash([]);
        
        ctx.fillStyle = '#FF6347';
        ctx.font = '8px Arial';
        ctx.fillText('Shadow', centerX + 20, centerY - 20);
      }
      
    } else if (viewMode === 'side') {
      // ENHANCED SIDE VIEW - Vertical quadrant arc
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      
      // Base platform
      ctx.fillStyle = 'rgba(245, 243, 237, 0.3)';
      ctx.fillRect(centerX - baseLength/2, centerY + 25, baseLength, 15);
      ctx.strokeRect(centerX - baseLength/2, centerY + 25, baseLength, 15);
      
      // Vertical support pillar
      ctx.strokeStyle = '#A0522D';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY + 25);
      ctx.lineTo(centerX, centerY + 25 - pillarHeight);
      ctx.stroke();
      
      // Quarter circle arc (90° altitude measurement)
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, arcRadius, 0, Math.PI/2);
      ctx.stroke();
      
      // Base lines (horizontal and vertical reference)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + arcRadius + 15, centerY);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX, centerY - arcRadius - 15);
      ctx.stroke();
      
      // ENHANCED ALTITUDE MARKINGS with location-specific data
      ctx.strokeStyle = '#CD853F';
      ctx.lineWidth = 1.5;
      
      for (let altitude = 0; altitude <= 90; altitude += 10) {
        const angle = (altitude * Math.PI) / 180;
        const isMajor = altitude % 30 === 0;
        const markLength = isMajor ? 15 : 8;
        
        const x1 = centerX + Math.cos(angle) * (arcRadius - markLength);
        const y1 = centerY - Math.sin(angle) * (arcRadius - markLength);
        const x2 = centerX + Math.cos(angle) * arcRadius;
        const y2 = centerY - Math.sin(angle) * arcRadius;
        
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Degree labels
        if (isMajor && showDimensions) {
          const labelX = centerX + Math.cos(angle) * (arcRadius + 12);
          const labelY = centerY - Math.sin(angle) * (arcRadius + 12);
          
          ctx.fillStyle = '#CD853F';
          ctx.font = 'bold 9px Arial';
          ctx.fillText(`${altitude}°`, labelX - 6, labelY + 3);
        }
      }
      
      // SPECIAL SOLAR ALTITUDE MARKINGS
      // Summer solstice
      const summerAngle = (solsticeAltitudes.summer * Math.PI) / 180;
      const summerX = centerX + Math.cos(summerAngle) * arcRadius;
      const summerY = centerY - Math.sin(summerAngle) * arcRadius;
      
      ctx.strokeStyle = '#FF6347';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(summerX, summerY, 4, 0, 2 * Math.PI);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#FF6347';
        ctx.font = 'bold 8px Arial';
        ctx.fillText(`Summer: ${solsticeAltitudes.summer.toFixed(1)}°`, 
                    summerX + 6, summerY);
      }
      
      // Winter solstice
      const winterAngle = (solsticeAltitudes.winter * Math.PI) / 180;
      const winterX = centerX + Math.cos(winterAngle) * arcRadius;
      const winterY = centerY - Math.sin(winterAngle) * arcRadius;
      
      ctx.strokeStyle = '#4169E1';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(winterX, winterY, 4, 0, 2 * Math.PI);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#4169E1';
        ctx.font = 'bold 8px Arial';
        ctx.fillText(`Winter: ${solsticeAltitudes.winter.toFixed(1)}°`, 
                    winterX + 6, winterY);
      }
      
      // Current noon altitude (equinox approximate)
      const noonAngle = (noonAltitude * Math.PI) / 180;
      const noonX = centerX + Math.cos(noonAngle) * arcRadius;
      const noonY = centerY - Math.sin(noonAngle) * arcRadius;
      
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(noonX, noonY, 3, 0, 2 * Math.PI);
      ctx.stroke();
      
      if (showDimensions) {
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 8px Arial';
        ctx.fillText(`Noon: ${noonAltitude.toFixed(1)}°`, noonX + 6, noonY);
      }
      
      // Gnomon/plumb line indicator
      ctx.strokeStyle = '#8B0000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - arcRadius + 10);
      ctx.lineTo(centerX, centerY);
      ctx.stroke();
      
      // Horizontal reference line label
      if (showDimensions) {
        ctx.fillStyle = '#8B4513';
        ctx.font = '9px Arial';
        ctx.fillText('Horizon', centerX + arcRadius - 20, centerY + 12);
        ctx.fillText('Zenith', centerX - 15, centerY - arcRadius - 8);
      }
    }
    
    // Location-specific information
    if (showDimensions) {
      const infoY = centerY - arcRadius - 70;
      
      ctx.fillStyle = '#2F4F4F';
      ctx.font = 'bold 11px Arial';
      ctx.fillText(`Arc Radius: ${(arcRadius/scale).toFixed(1)}m`, centerX - 100, infoY - 35);
      ctx.fillText(`Base Length: ${(baseLength/scale).toFixed(1)}m`, centerX - 100, infoY - 20);
      ctx.fillText(`Max Solar Alt: ${maxSolarAltitude.toFixed(1)}°`, centerX - 100, infoY - 5);
      ctx.fillText(`Summer Sol: ${solsticeAltitudes.summer.toFixed(1)}°`, centerX - 100, infoY + 10);
      ctx.fillText(`Winter Sol: ${solsticeAltitudes.winter.toFixed(1)}°`, centerX - 100, infoY + 25);
      ctx.fillText(`Scale Factor: ${scaleDisplayFactor.toFixed(3)}`, centerX - 100, infoY + 40);
      
      // Show this is location-specific
      ctx.fillStyle = '#8B0000';
      ctx.font = 'italic 10px Arial';
      ctx.fillText('↑ Solar altitude measurements with seasonal variations', centerX - 100, infoY + 55);
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