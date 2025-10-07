import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Typography, IconButton, Tooltip, Slider } from '@mui/material';
import { PlayArrow, Pause, RotateLeft, ZoomIn, ZoomOut } from '@mui/icons-material';

// Function declarations for yantra rendering
function renderAdvancedYantra(scene, yantraType, specs) {
  // Enhanced materials with realistic textures
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a574,
    roughness: 0.8,
    metalness: 0.1,
    transparent: false,
    envMapIntensity: 0.5
  });

  const marbleMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5dc,
    roughness: 0.2,
    metalness: 0.05,
    transparent: false,
    envMapIntensity: 0.8
  });

  const copperMaterial = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    roughness: 0.3,
    metalness: 0.9,
    transparent: false,
    envMapIntensity: 1.0
  });

  const brassMaterial = new THREE.MeshStandardMaterial({
    color: 0xdaa520,
    roughness: 0.4,
    metalness: 0.8,
    transparent: false,
    envMapIntensity: 0.9
  });

  switch (yantraType) {
    case 'samrat':
      renderEnhancedSamratYantra(scene, specs, stoneMaterial, marbleMaterial);
      break;
    case 'rama':
      renderEnhancedRamaYantra(scene, specs, stoneMaterial, brassMaterial);
      break;
    case 'jai_prakash':
      renderEnhancedJaiPrakashYantra(scene, specs, stoneMaterial, copperMaterial);
      break;
    case 'digamsa':
      renderDigamsaYantra(scene, specs, stoneMaterial, copperMaterial);
      break;
    case 'dhruva_protha_chakra':
      renderDhruvaProthaChakra(scene, specs, stoneMaterial, brassMaterial);
      break;
    case 'kapala':
      renderKapalaYantra(scene, specs, stoneMaterial, marbleMaterial);
      break;
    case 'chakra':
      renderChakraYantra(scene, specs, stoneMaterial, copperMaterial);
      break;
    case 'unnatamsa':
      renderUnnatamsaYantra(scene, specs, stoneMaterial, brassMaterial);
      break;
    default:
      renderEnhancedSamratYantra(scene, specs, stoneMaterial, marbleMaterial);
  }
}

const YantraViewer3D = ({ yantraType = 'samrat', specs = null, showControls = true }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);
  const controlsRef = useRef({
    rotation: true,
    timeSpeed: 1,
    sunAngle: 0,
    zoom: 25
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState(12); // 12 PM
  const [sunPosition, setSunPosition] = useState({ x: 0, y: 15, z: 10 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene with enhanced atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f23); // Deep space blue
    scene.fog = new THREE.Fog(0x0f0f23, 50, 100);
    sceneRef.current = scene;

    // Create camera with better positioning
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(25, 20, 25);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer with enhanced quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting system
    setupLighting(scene);

    // Add environment
    setupEnvironment(scene);

    // Render yantra with enhanced materials
    renderAdvancedYantra(scene, yantraType, specs);

    // Enhanced animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (cameraRef.current && controlsRef.current.rotation && isPlaying) {
        // Smooth camera orbit
        const time = Date.now() * 0.0002 * controlsRef.current.timeSpeed;
        const radius = controlsRef.current.zoom;
        cameraRef.current.position.x = Math.sin(time) * radius;
        cameraRef.current.position.z = Math.cos(time) * radius;
        cameraRef.current.position.y = 15 + Math.sin(time * 0.5) * 5;
        cameraRef.current.lookAt(0, 2, 0);
      }

      // Update sun position based on time of day
      updateSunPosition(scene, timeOfDay);
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (renderer) {
        renderer.dispose();
      }
      if (containerRef.current && renderer.domElement) {
        try {
          containerRef.current.removeChild(renderer.domElement);
        } catch (e) {
          // Element might already be removed
        }
      }
    };
  }, [yantraType, specs, isPlaying, timeOfDay]);

  const setupLighting = (scene) => {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Sun light (directional)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(10, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    sunLight.shadow.bias = -0.0001;
    scene.add(sunLight);

    // Moonlight (subtle blue light from opposite direction)
    const moonLight = new THREE.DirectionalLight(0x4169e1, 0.2);
    moonLight.position.set(-10, 15, -10);
    scene.add(moonLight);

    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0xffffff, 0.5, 30);
    pointLight1.position.set(15, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b35, 0.3, 25);
    pointLight2.position.set(-15, 8, -15);
    scene.add(pointLight2);
  };

  const setupEnvironment = (scene) => {
    // Enhanced ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2d2d2d,
      transparent: true,
      opacity: 0.8
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle grid pattern
    const gridHelper = new THREE.GridHelper(60, 60, 0x444444, 0x222222);
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.3;
    scene.add(gridHelper);

    // Add some atmospheric particles
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = Math.random() * 50;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
  };

  const updateSunPosition = (scene, hour) => {
    const sunLight = scene.children.find(child => 
      child instanceof THREE.DirectionalLight && child.color.getHex() === 0xffffff
    );
    
    if (sunLight) {
      // Calculate sun position based on hour (6 AM to 6 PM visible)
      const angle = ((hour - 6) / 12) * Math.PI; // 0 to π for 6AM to 6PM
      const elevation = Math.sin(angle) * 20; // Height varies with time
      const azimuth = Math.cos(angle) * 20; // Horizontal position
      
      sunLight.position.set(azimuth, Math.max(elevation, 5), 10);
      
      // Change light color based on time of day
      if (hour < 7 || hour > 17) {
        sunLight.color.setHex(0xff6b35); // Orange for sunrise/sunset
        sunLight.intensity = 0.6;
      } else if (hour >= 7 && hour <= 17) {
        sunLight.color.setHex(0xffffff); // White for day
        sunLight.intensity = 1.2;
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetCamera = () => {
    if (cameraRef.current) {
      cameraRef.current.position.set(25, 20, 25);
      cameraRef.current.lookAt(0, 0, 0);
      controlsRef.current.zoom = 25;
    }
  };

  const handleTimeChange = (event, newValue) => {
    setTimeOfDay(newValue);
  };

  const handleZoomIn = () => {
    controlsRef.current.zoom = Math.max(10, controlsRef.current.zoom - 5);
  };

  const handleZoomOut = () => {
    controlsRef.current.zoom = Math.min(50, controlsRef.current.zoom + 5);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #0f0f23 0%, #1a1a2e 100%)'
        }} 
      />
      
      {showControls && (
        <>
          {/* Time Control */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16, 
              right: 16,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 2,
              p: 2,
              color: 'white'
            }}
          >
            <Typography variant="body2" gutterBottom>
              Time of Day: {timeOfDay}:00 {timeOfDay >= 12 ? 'PM' : 'AM'}
            </Typography>
            <Slider
              value={timeOfDay}
              onChange={handleTimeChange}
              min={6}
              max={18}
              step={0.5}
              marks={[
                { value: 6, label: '6 AM' },
                { value: 12, label: '12 PM' },
                { value: 18, label: '6 PM' }
              ]}
              sx={{ color: '#42a5f5' }}
            />
          </Box>

          {/* Playback Controls */}
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16,
              display: 'flex',
              gap: 1,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 2,
              p: 1
            }}
          >
            <Tooltip title={isPlaying ? "Pause Animation" : "Play Animation"}>
              <IconButton onClick={togglePlayPause} sx={{ color: 'white' }}>
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Reset Camera">
              <IconButton onClick={resetCamera} sx={{ color: 'white' }}>
                <RotateLeft />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Zoom In">
              <IconButton onClick={handleZoomIn} sx={{ color: 'white' }}>
                <ZoomIn />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Zoom Out">
              <IconButton onClick={handleZoomOut} sx={{ color: 'white' }}>
                <ZoomOut />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Info Panel */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              right: 16,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: 2,
              p: 2,
              color: 'white',
              minWidth: '200px'
            }}
          >
            <Typography variant="h6" gutterBottom>
              {yantraType.charAt(0).toUpperCase() + yantraType.slice(1)} Yantra
            </Typography>
            <Typography variant="body2">
              Ancient Indian Astronomical Instrument
            </Typography>
            {specs && (
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                Latitude: {specs.coordinates?.latitude}°<br/>
                Longitude: {specs.coordinates?.longitude}°
              </Typography>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

function renderEnhancedSamratYantra(scene, specs, stoneMaterial, marbleMaterial) {
  const baseWidth = specs?.dimensions?.base_width || 12;
  const baseLength = specs?.dimensions?.base_length || 15;
  const gnomonHeight = specs?.dimensions?.gnomon_height || 10;

  // Multi-level base platform
  const baseGeometry1 = new THREE.BoxGeometry(baseWidth + 2, 0.8, baseLength + 2);
  const baseMesh1 = new THREE.Mesh(baseGeometry1, stoneMaterial);
  baseMesh1.position.y = 0.4;
  baseMesh1.receiveShadow = true;
  baseMesh1.castShadow = true;
  scene.add(baseMesh1);

  const baseGeometry2 = new THREE.BoxGeometry(baseWidth, 0.6, baseLength);
  const baseMesh2 = new THREE.Mesh(baseGeometry2, marbleMaterial);
  baseMesh2.position.y = 1.1;
  baseMesh2.receiveShadow = true;
  baseMesh2.castShadow = true;
  scene.add(baseMesh2);

  // Enhanced gnomon with triangular design
  const gnomonGeometry = new THREE.ConeGeometry(0.2, gnomonHeight, 4);
  const gnomonMesh = new THREE.Mesh(gnomonGeometry, stoneMaterial);
  gnomonMesh.position.y = gnomonHeight / 2 + 1.4;
  gnomonMesh.rotation.z = Math.PI / 6; // Tilt based on latitude
  gnomonMesh.castShadow = true;
  scene.add(gnomonMesh);

  // Detailed hour markings with numbers
  for (let i = -6; i <= 6; i++) {
    const angle = (i * 15) * Math.PI / 180;
    const markLength = baseLength / 2 - 1;
    
    // Hour line
    const markGeometry = new THREE.BoxGeometry(0.15, 0.2, markLength);
    const markMesh = new THREE.Mesh(markGeometry, stoneMaterial);
    markMesh.position.set(
      Math.sin(angle) * markLength / 2,
      1.5,
      Math.cos(angle) * markLength / 2
    );
    markMesh.rotation.y = angle;
    markMesh.castShadow = true;
    scene.add(markMesh);

    // Hour markers (small stones)
    const hourMarkerGeometry = new THREE.SphereGeometry(0.2, 8, 6);
    const hourMarkerMesh = new THREE.Mesh(hourMarkerGeometry, stoneMaterial);
    hourMarkerMesh.position.set(
      Math.sin(angle) * (markLength + 1),
      1.6,
      Math.cos(angle) * (markLength + 1)
    );
    hourMarkerMesh.castShadow = true;
    scene.add(hourMarkerMesh);
  }

  // Decorative border
  const borderGeometry = new THREE.TorusGeometry(baseWidth / 2 + 1, 0.3, 8, 32);
  const borderMesh = new THREE.Mesh(borderGeometry, stoneMaterial);
  borderMesh.position.y = 0.8;
  borderMesh.rotation.x = Math.PI / 2;
  borderMesh.castShadow = true;
  scene.add(borderMesh);
}

function renderEnhancedRamaYantra(scene, specs, stoneMaterial, brassMaterial) {
  const radius = specs?.dimensions?.radius || 7;
  const height = specs?.dimensions?.height || 5;

  // Multi-tier cylindrical structure
  const cylinderGeometry1 = new THREE.CylinderGeometry(radius + 1, radius + 1, 1, 32);
  const cylinderMesh1 = new THREE.Mesh(cylinderGeometry1, stoneMaterial);
  cylinderMesh1.position.y = 0.5;
  cylinderMesh1.receiveShadow = true;
  cylinderMesh1.castShadow = true;
  scene.add(cylinderMesh1);

  const cylinderGeometry2 = new THREE.CylinderGeometry(radius, radius, height, 32);
  const cylinderMesh2 = new THREE.Mesh(cylinderGeometry2, brassMaterial);
  cylinderMesh2.position.y = height / 2 + 1;
  cylinderMesh2.receiveShadow = true;
  cylinderMesh2.castShadow = true;
  scene.add(cylinderMesh2);

  // Central vertical pole with ornate design
  const poleGeometry = new THREE.CylinderGeometry(0.3, 0.3, height + 3, 12);
  const poleMesh = new THREE.Mesh(poleGeometry, stoneMaterial);
  poleMesh.position.y = (height + 3) / 2 + 1;
  poleMesh.castShadow = true;
  scene.add(poleMesh);

  // Top ornament
  const topGeometry = new THREE.SphereGeometry(0.8, 16, 12);
  const topMesh = new THREE.Mesh(topGeometry, brassMaterial);
  topMesh.position.y = height + 4.5;
  topMesh.castShadow = true;
  scene.add(topMesh);

  // Enhanced radial hour lines with varying heights
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15) * Math.PI / 180;
    const lineHeight = (i % 2 === 0) ? 0.4 : 0.2; // Alternating heights
    
    const lineGeometry = new THREE.BoxGeometry(0.08, lineHeight, radius - 0.5);
    const lineMesh = new THREE.Mesh(lineGeometry, stoneMaterial);
    lineMesh.position.set(
      Math.sin(angle) * (radius - 0.25) / 2,
      height + 1 + lineHeight / 2,
      Math.cos(angle) * (radius - 0.25) / 2
    );
    lineMesh.rotation.y = angle;
    lineMesh.castShadow = true;
    scene.add(lineMesh);
  }

  // Circular markings on the rim
  const rimGeometry = new THREE.TorusGeometry(radius, 0.2, 8, 32);
  const rimMesh = new THREE.Mesh(rimGeometry, stoneMaterial);
  rimMesh.position.y = height + 1;
  rimMesh.castShadow = true;
  scene.add(rimMesh);
}

function renderEnhancedJaiPrakashYantra(scene, specs, stoneMaterial, copperMaterial) {
  const radius = specs?.dimensions?.radius || 6;
  
  // Enhanced hemispherical bowl with interior details
  const sphereGeometry = new THREE.SphereGeometry(radius, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const sphereMesh = new THREE.Mesh(sphereGeometry, copperMaterial);
  sphereMesh.position.y = 0;
  sphereMesh.receiveShadow = true;
  sphereMesh.castShadow = true;
  scene.add(sphereMesh);

  // Ornate rim with decorative elements
  const rimGeometry = new THREE.TorusGeometry(radius, 0.3, 12, 32);
  const rimMesh = new THREE.Mesh(rimGeometry, stoneMaterial);
  rimMesh.position.y = 0;
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.castShadow = true;
  scene.add(rimMesh);

  // Base platform
  const baseGeometry = new THREE.CylinderGeometry(radius + 2, radius + 2, 1, 32);
  const baseMesh = new THREE.Mesh(baseGeometry, stoneMaterial);
  baseMesh.position.y = -0.5;
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  scene.add(baseMesh);

  // Detailed celestial coordinate lines
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180;
    
    // Create more detailed meridian lines
    const points = [];
    for (let j = 0; j <= 50; j++) {
      const theta = (j / 50) * Math.PI / 2;
      points.push(new THREE.Vector3(
        Math.sin(theta) * radius * 0.95 * Math.cos(angle),
        Math.cos(theta) * radius * 0.95,
        Math.sin(theta) * radius * 0.95 * Math.sin(angle)
      ));
    }
    
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x444444,
      linewidth: 2
    });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
  }

  // Central gnomon with artistic design
  const pointerGeometry = new THREE.ConeGeometry(0.15, 2, 8);
  const pointerMesh = new THREE.Mesh(pointerGeometry, stoneMaterial);
  pointerMesh.position.y = 1;
  pointerMesh.castShadow = true;
  scene.add(pointerMesh);

  // Support pillars
  for (let i = 0; i < 4; i++) {
    const angle = (i * 90) * Math.PI / 180;
    const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 8);
    const pillarMesh = new THREE.Mesh(pillarGeometry, stoneMaterial);
    pillarMesh.position.set(
      Math.sin(angle) * (radius + 1.5),
      0.75,
      Math.cos(angle) * (radius + 1.5)
    );
    pillarMesh.castShadow = true;
    scene.add(pillarMesh);
  }
}

function renderDigamsaYantra(scene, specs, stoneMaterial, copperMaterial) {
  const arcRadius = specs?.dimensions?.arc_radius || 3;
  const baseWidth = specs?.dimensions?.base_width || 6;
  const pillarHeight = specs?.dimensions?.pillar_height || 4.5;

  // Square base platform
  const baseGeometry = new THREE.BoxGeometry(baseWidth, 0.6, baseWidth);
  const baseMesh = new THREE.Mesh(baseGeometry, stoneMaterial);
  baseMesh.position.y = 0.3;
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  scene.add(baseMesh);

  // Central vertical pillar
  const pillarGeometry = new THREE.CylinderGeometry(0.3, 0.4, pillarHeight, 12);
  const pillarMesh = new THREE.Mesh(pillarGeometry, stoneMaterial);
  pillarMesh.position.y = pillarHeight / 2 + 0.6;
  pillarMesh.castShadow = true;
  scene.add(pillarMesh);

  // Vertical semicircular arc - create using torus with half geometry
  const arcGeometry = new THREE.TorusGeometry(arcRadius, 0.1, 8, 32, Math.PI);
  const arcMesh = new THREE.Mesh(arcGeometry, copperMaterial);
  arcMesh.position.y = pillarHeight + 0.6;
  arcMesh.rotation.z = Math.PI / 2; // Rotate to vertical
  arcMesh.castShadow = true;
  scene.add(arcMesh);

  // Altitude markings on the arc (every 10 degrees)
  for (let i = 0; i <= 90; i += 10) {
    const angle = (i * Math.PI) / 180;
    const markRadius = arcRadius + 0.15;
    
    const markGeometry = new THREE.SphereGeometry(0.05, 8, 6);
    const markMesh = new THREE.Mesh(markGeometry, stoneMaterial);
    markMesh.position.set(
      0,
      pillarHeight + 0.6 + Math.sin(angle) * markRadius,
      Math.cos(angle) * markRadius
    );
    markMesh.castShadow = true;
    scene.add(markMesh);
  }

  // Azimuth markings around the base (every 30 degrees)
  for (let i = 0; i < 360; i += 30) {
    const angle = (i * Math.PI) / 180;
    const markLength = baseWidth / 2 - 0.5;
    
    const markGeometry = new THREE.BoxGeometry(0.1, 0.2, markLength);
    const markMesh = new THREE.Mesh(markGeometry, copperMaterial);
    markMesh.position.set(
      Math.sin(angle) * markLength / 2,
      0.7,
      Math.cos(angle) * markLength / 2
    );
    markMesh.rotation.y = angle;
    markMesh.castShadow = true;
    scene.add(markMesh);
  }

  // Movable sighting arm (simplified representation)
  const sightingArmGeometry = new THREE.CylinderGeometry(0.03, 0.03, arcRadius * 0.8, 8);
  const sightingArmMesh = new THREE.Mesh(sightingArmGeometry, copperMaterial);
  sightingArmMesh.position.set(0, pillarHeight + 0.6, arcRadius * 0.4);
  sightingArmMesh.rotation.x = Math.PI / 4; // Angled for demonstration
  sightingArmMesh.castShadow = true;
  scene.add(sightingArmMesh);
}

function renderDhruvaProthaChakra(scene, specs, stoneMaterial, brassMaterial) {
  const diskRadius = specs?.dimensions?.disk_radius || 2.5;
  const baseRadius = specs?.dimensions?.base_diameter / 2 || 3.5;
  const pillarHeight = specs?.dimensions?.support_pillar_height || 2;

  // Base platform
  const baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, 0.8, 32);
  const baseMesh = new THREE.Mesh(baseGeometry, stoneMaterial);
  baseMesh.position.y = 0.4;
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  scene.add(baseMesh);

  // Support pillar
  const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.3, pillarHeight, 12);
  const pillarMesh = new THREE.Mesh(pillarGeometry, stoneMaterial);
  pillarMesh.position.y = pillarHeight / 2 + 0.8;
  pillarMesh.castShadow = true;
  scene.add(pillarMesh);

  // Main circular disk
  const diskGeometry = new THREE.CylinderGeometry(diskRadius, diskRadius, 0.15, 64);
  const diskMesh = new THREE.Mesh(diskGeometry, brassMaterial);
  diskMesh.position.y = pillarHeight + 0.8;
  diskMesh.rotation.x = Math.PI / 6; // Tilted based on latitude
  diskMesh.castShadow = true;
  diskMesh.receiveShadow = true;
  scene.add(diskMesh);

  // Central hole for pole star sighting
  const holeGeometry = new THREE.RingGeometry(0, specs?.dimensions?.central_hole_radius || 0.05, 16);
  const holeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000, 
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });
  const holeMesh = new THREE.Mesh(holeGeometry, holeMaterial);
  holeMesh.position.y = pillarHeight + 0.85;
  holeMesh.rotation.x = Math.PI / 6;
  scene.add(holeMesh);

  // Hour markings around the disk circumference
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15) * Math.PI / 180;
    
    // Hour markers
    const markerGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.2);
    const markerMesh = new THREE.Mesh(markerGeometry, stoneMaterial);
    markerMesh.position.set(
      Math.sin(angle) * (diskRadius - 0.1),
      pillarHeight + 0.9,
      Math.cos(angle) * (diskRadius - 0.1)
    );
    markerMesh.rotation.y = angle;
    markerMesh.rotation.x = Math.PI / 6;
    markerMesh.castShadow = true;
    scene.add(markerMesh);
  }

  // Rotation axis representation
  const axisGeometry = new THREE.CylinderGeometry(0.05, 0.05, diskRadius * 2.2, 12);
  const axisMesh = new THREE.Mesh(axisGeometry, brassMaterial);
  axisMesh.position.y = pillarHeight + 0.8;
  axisMesh.rotation.z = Math.PI / 2;
  axisMesh.rotation.x = Math.PI / 6;
  axisMesh.castShadow = true;
  scene.add(axisMesh);

  // Counterweight
  const counterweightGeometry = new THREE.SphereGeometry(0.3, 16, 12);
  const counterweightMesh = new THREE.Mesh(counterweightGeometry, stoneMaterial);
  counterweightMesh.position.set(-diskRadius - 0.5, pillarHeight + 0.8, 0);
  counterweightMesh.castShadow = true;
  scene.add(counterweightMesh);
}

function renderKapalaYantra(scene, specs, stoneMaterial, marbleMaterial) {
  const bowlRadius = specs?.dimensions?.bowl_radius || 2;
  const rimWidth = specs?.dimensions?.rim_width || 0.2;
  const platformRadius = specs?.dimensions?.base_platform_radius || 3;

  // Base platform
  const platformGeometry = new THREE.CylinderGeometry(platformRadius, platformRadius, 0.5, 32);
  const platformMesh = new THREE.Mesh(platformGeometry, stoneMaterial);
  platformMesh.position.y = 0.25;
  platformMesh.receiveShadow = true;
  platformMesh.castShadow = true;
  scene.add(platformMesh);

  // Hemispherical bowl (inverted)
  const bowlGeometry = new THREE.SphereGeometry(bowlRadius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const bowlMesh = new THREE.Mesh(bowlGeometry, marbleMaterial);
  bowlMesh.position.y = 0.5;
  bowlMesh.rotation.x = Math.PI; // Flip to create bowl shape
  bowlMesh.receiveShadow = true;
  bowlMesh.castShadow = false; // Bowl interior should not cast shadows
  scene.add(bowlMesh);

  // Bowl rim
  const rimGeometry = new THREE.TorusGeometry(bowlRadius, rimWidth / 2, 8, 32);
  const rimMesh = new THREE.Mesh(rimGeometry, stoneMaterial);
  rimMesh.position.y = 0.5;
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.castShadow = true;
  scene.add(rimMesh);

  // Central gnomon
  const gnomonHeight = specs?.dimensions?.gnomon_height || 1.6;
  const gnomonGeometry = new THREE.CylinderGeometry(0.02, 0.02, gnomonHeight, 12);
  const gnomonMesh = new THREE.Mesh(gnomonGeometry, stoneMaterial);
  gnomonMesh.position.y = 0.5 + gnomonHeight / 2;
  gnomonMesh.rotation.z = (specs?.angles?.gnomon_angle || 28) * Math.PI / 180;
  gnomonMesh.castShadow = true;
  scene.add(gnomonMesh);

  // Time markings around the rim (6 AM to 6 PM)
  for (let hour = 6; hour <= 18; hour++) {
    const angle = ((hour - 12) * 15) * Math.PI / 180;
    const markerRadius = bowlRadius + rimWidth;
    
    const timeMarkerGeometry = new THREE.SphereGeometry(0.08, 8, 6);
    const timeMarkerMesh = new THREE.Mesh(timeMarkerGeometry, stoneMaterial);
    timeMarkerMesh.position.set(
      Math.sin(angle) * markerRadius,
      0.5,
      Math.cos(angle) * markerRadius
    );
    timeMarkerMesh.castShadow = true;
    scene.add(timeMarkerMesh);
  }

  // Seasonal curves inside the bowl (simplified as rings)
  for (let month = 1; month <= 12; month += 3) {
    const declination = 23.44 * Math.sin((30 * (month - 3)) * Math.PI / 180);
    const curveRadius = bowlRadius * Math.cos(declination * Math.PI / 180) * 0.8;
    
    if (curveRadius > 0.3) {
      const curveGeometry = new THREE.TorusGeometry(curveRadius, 0.02, 8, 32);
      const curveMesh = new THREE.Mesh(curveGeometry, stoneMaterial);
      curveMesh.position.y = 0.3;
      curveMesh.rotation.x = Math.PI / 2;
      scene.add(curveMesh);
    }
  }

  // Drainage hole at bottom
  const drainGeometry = new THREE.RingGeometry(0, 0.025, 16);
  const drainMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x000000, 
    side: THREE.DoubleSide 
  });
  const drainMesh = new THREE.Mesh(drainGeometry, drainMaterial);
  drainMesh.position.y = 0.52;
  drainMesh.rotation.x = Math.PI / 2;
  scene.add(drainMesh);
}

function renderChakraYantra(scene, specs, stoneMaterial, copperMaterial) {
  const outerRadius = specs?.dimensions?.outer_ring_radius || 1.5;
  const innerRadius = specs?.dimensions?.inner_ring_radius || 1.2;
  const ringThickness = specs?.dimensions?.ring_thickness || 0.05;
  const baseRadius = specs?.dimensions?.base_support_radius || 2;
  const mountHeight = specs?.dimensions?.mounting_post_height || 1.8;

  // Base support platform
  const baseGeometry = new THREE.CylinderGeometry(baseRadius, baseRadius, 0.4, 32);
  const baseMesh = new THREE.Mesh(baseGeometry, stoneMaterial);
  baseMesh.position.y = 0.2;
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  scene.add(baseMesh);

  // Central mounting post
  const postGeometry = new THREE.CylinderGeometry(0.15, 0.2, mountHeight, 12);
  const postMesh = new THREE.Mesh(postGeometry, stoneMaterial);
  postMesh.position.y = mountHeight / 2 + 0.4;
  postMesh.castShadow = true;
  scene.add(postMesh);

  // Outer equatorial ring (tilted)
  const outerRingGeometry = new THREE.TorusGeometry(outerRadius, ringThickness, 8, 32);
  const outerRingMesh = new THREE.Mesh(outerRingGeometry, copperMaterial);
  outerRingMesh.position.y = mountHeight + 0.4;
  outerRingMesh.rotation.x = (specs?.angles?.equatorial_ring_tilt || 28) * Math.PI / 180;
  outerRingMesh.castShadow = true;
  scene.add(outerRingMesh);

  // Inner ring
  const innerRingGeometry = new THREE.TorusGeometry(innerRadius, ringThickness, 8, 32);
  const innerRingMesh = new THREE.Mesh(innerRingGeometry, copperMaterial);
  innerRingMesh.position.y = mountHeight + 0.4;
  innerRingMesh.rotation.x = (specs?.angles?.equatorial_ring_tilt || 28) * Math.PI / 180;
  innerRingMesh.castShadow = true;
  scene.add(innerRingMesh);

  // Meridian ring (vertical)
  const meridianRingGeometry = new THREE.TorusGeometry(outerRadius * 0.9, ringThickness, 8, 32);
  const meridianRingMesh = new THREE.Mesh(meridianRingGeometry, copperMaterial);
  meridianRingMesh.position.y = mountHeight + 0.4;
  meridianRingMesh.rotation.z = Math.PI / 2;
  meridianRingMesh.castShadow = true;
  scene.add(meridianRingMesh);

  // Horizon ring (horizontal)
  const horizonRingGeometry = new THREE.TorusGeometry(outerRadius * 0.8, ringThickness, 8, 32);
  const horizonRingMesh = new THREE.Mesh(horizonRingGeometry, copperMaterial);
  horizonRingMesh.position.y = mountHeight + 0.4;
  horizonRingMesh.rotation.x = Math.PI / 2;
  horizonRingMesh.castShadow = true;
  scene.add(horizonRingMesh);

  // Degree markings on rings (every 30 degrees)
  for (let i = 0; i < 360; i += 30) {
    const angle = i * Math.PI / 180;
    
    // Markers on outer ring
    const markerGeometry = new THREE.SphereGeometry(0.03, 8, 6);
    const markerMesh = new THREE.Mesh(markerGeometry, stoneMaterial);
    markerMesh.position.set(
      Math.cos(angle) * outerRadius,
      mountHeight + 0.4,
      Math.sin(angle) * outerRadius
    );
    markerMesh.castShadow = true;
    scene.add(markerMesh);
  }

  // Central axis representation
  const axisGeometry = new THREE.CylinderGeometry(0.02, 0.02, outerRadius * 2.2, 12);
  const axisMesh = new THREE.Mesh(axisGeometry, copperMaterial);
  axisMesh.position.y = mountHeight + 0.4;
  axisMesh.rotation.z = Math.PI / 2;
  axisMesh.castShadow = true;
  scene.add(axisMesh);

  // Support brackets connecting rings to post
  for (let i = 0; i < 4; i++) {
    const angle = (i * 90) * Math.PI / 180;
    const bracketGeometry = new THREE.BoxGeometry(0.05, 0.05, innerRadius);
    const bracketMesh = new THREE.Mesh(bracketGeometry, stoneMaterial);
    bracketMesh.position.set(
      Math.cos(angle) * innerRadius / 2,
      mountHeight + 0.4,
      Math.sin(angle) * innerRadius / 2
    );
    bracketMesh.rotation.y = angle;
    bracketMesh.castShadow = true;
    scene.add(bracketMesh);
  }
}

function renderUnnatamsaYantra(scene, specs, stoneMaterial, brassMaterial) {
  const quadrantRadius = specs?.dimensions?.quadrant_radius || 2;
  const baseLength = specs?.dimensions?.base_length || 3;
  const baseWidth = specs?.dimensions?.base_width || 2.4;
  const postHeight = specs?.dimensions?.vertical_post_height || 2;

  // Rectangular base platform
  const baseGeometry = new THREE.BoxGeometry(baseLength, 0.6, baseWidth);
  const baseMesh = new THREE.Mesh(baseGeometry, stoneMaterial);
  baseMesh.position.y = 0.3;
  baseMesh.receiveShadow = true;
  baseMesh.castShadow = true;
  scene.add(baseMesh);

  // Vertical support post
  const postGeometry = new THREE.CylinderGeometry(0.2, 0.25, postHeight, 12);
  const postMesh = new THREE.Mesh(postGeometry, stoneMaterial);
  postMesh.position.y = postHeight / 2 + 0.6;
  postMesh.castShadow = true;
  scene.add(postMesh);

  // Quarter-circle arc (90 degrees)
  const arcGeometry = new THREE.TorusGeometry(quadrantRadius, 0.08, 8, 32, Math.PI / 2);
  const arcMesh = new THREE.Mesh(arcGeometry, brassMaterial);
  arcMesh.position.y = postHeight + 0.6;
  arcMesh.rotation.z = -Math.PI / 2; // Rotate to start from vertical
  arcMesh.rotation.y = Math.PI; // Face south
  arcMesh.castShadow = true;
  scene.add(arcMesh);

  // Altitude scale markings (every 10 degrees from 0° to 90°)
  for (let i = 0; i <= 90; i += 10) {
    const angle = (i * Math.PI) / 180;
    const markRadius = quadrantRadius + 0.1;
    
    const markGeometry = new THREE.SphereGeometry(0.04, 8, 6);
    const markMesh = new THREE.Mesh(markGeometry, stoneMaterial);
    markMesh.position.set(
      0,
      postHeight + 0.6 + Math.sin(angle) * markRadius,
      -Math.cos(angle) * markRadius // Negative Z to face south
    );
    markMesh.castShadow = true;
    scene.add(markMesh);
  }

  // Movable sighting arm
  const sightingArmGeometry = new THREE.CylinderGeometry(0.02, 0.02, quadrantRadius * 0.9, 8);
  const sightingArmMesh = new THREE.Mesh(sightingArmGeometry, brassMaterial);
  sightingArmMesh.position.set(0, postHeight + 0.6, -quadrantRadius * 0.45);
  sightingArmMesh.rotation.x = Math.PI / 6; // Angled for demonstration
  sightingArmMesh.castShadow = true;
  scene.add(sightingArmMesh);

  // Hour markings on the base for solar tracking
  const hourAngles = [-60, -30, 0, 30, 60]; // Simplified hour angles
  hourAngles.forEach((hourAngle, index) => {
    const angle = hourAngle * Math.PI / 180;
    const markLength = baseLength / 3;
    
    const hourMarkGeometry = new THREE.BoxGeometry(0.06, 0.15, markLength);
    const hourMarkMesh = new THREE.Mesh(hourMarkGeometry, stoneMaterial);
    hourMarkMesh.position.set(
      Math.sin(angle) * markLength / 2,
      0.65,
      -Math.cos(angle) * markLength / 2
    );
    hourMarkMesh.rotation.y = angle;
    hourMarkMesh.castShadow = true;
    scene.add(hourMarkMesh);
  });

  // Counterweight for balance
  const counterweightGeometry = new THREE.SphereGeometry(0.2, 12, 8);
  const counterweightMesh = new THREE.Mesh(counterweightGeometry, stoneMaterial);
  counterweightMesh.position.set(0, postHeight + 0.6, quadrantRadius + 0.3);
  counterweightMesh.castShadow = true;
  scene.add(counterweightMesh);

  // Base orientation marker (pointing south)
  const orientationGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
  const orientationMesh = new THREE.Mesh(orientationGeometry, brassMaterial);
  orientationMesh.position.set(0, 0.75, -baseWidth / 2 + 0.1);
  orientationMesh.rotation.x = Math.PI / 2;
  orientationMesh.castShadow = true;
  scene.add(orientationMesh);
}

export default YantraViewer3D;