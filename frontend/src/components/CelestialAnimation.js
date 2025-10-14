import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Typography } from '@mui/material';

// Realistic Earth Component with continents and improved appearance
const Earth = ({ position }) => {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();
  
  // Earth rotation animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Earth rotation (24 hours = full rotation)
    if (earthRef.current) {
      earthRef.current.rotation.y = time * 0.3; // Moderate rotation speed
    }
    
    // Cloud layer rotation (slightly faster)
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.35;
    }
    
    // Subtle atmosphere pulsing
    if (atmosphereRef.current) {
      atmosphereRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.01);
    }
  });

  return (
    <group position={position}>
      {/* Earth Core with realistic colors */}
      <mesh ref={earthRef} position={[0, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#1e3a5f"
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      
      {/* Continents - Green/Brown landmasses */}
      <group ref={earthRef}>
        {/* North America */}
        <mesh position={[0, 0.8, 2.2]} rotation={[0.3, -0.5, 0]} castShadow>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#2d5016" roughness={0.8} />
        </mesh>
        
        {/* South America */}
        <mesh position={[0.6, -0.5, 2.1]} rotation={[0.2, -0.3, 0]} castShadow>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#4a6741" roughness={0.8} />
        </mesh>
        
        {/* Africa */}
        <mesh position={[-0.3, 0.2, 2.3]} rotation={[0.1, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#8B4513" roughness={0.8} />
        </mesh>
        
        {/* Europe */}
        <mesh position={[-0.4, 0.9, 2.2]} rotation={[0.2, 0.1, 0]} castShadow>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#2d5016" roughness={0.8} />
        </mesh>
        
        {/* Asia */}
        <mesh position={[-1.2, 0.6, 1.8]} rotation={[0.1, 0.8, 0]} castShadow>
          <sphereGeometry args={[0.5, 20, 20]} />
          <meshStandardMaterial color="#4a6741" roughness={0.8} />
        </mesh>
        
        {/* India Subcontinent - Highlighted */}
        <mesh position={[-0.9, 0.3, 2.0]} rotation={[0.1, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.6} emissive="#332000" emissiveIntensity={0.1} />
        </mesh>
        
        {/* Australia */}
        <mesh position={[-1.4, -0.8, 1.6]} rotation={[0.2, 0.9, 0]} castShadow>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#CD853F" roughness={0.8} />
        </mesh>
      </group>
      
      {/* Cloud Layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.52, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Earth's Atmosphere - Blue glow */}
      <mesh ref={atmosphereRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Atmospheric glow effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.65, 16, 16]} />
        <meshBasicMaterial
          color="#4fc3f7"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* India marker with label */}
      <Text
        position={[-0.7, 0.6, 2.8]}
        fontSize={0.15}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        भारत
      </Text>
    </group>
  );
};

// Realistic 3D Sun with solar flares and surface details
const Sun = ({ position }) => {
  const sunRef = useRef();
  const coronaRef = useRef();
  const flareRef = useRef();
  const prominenceRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Sun rotation with surface activity
    if (sunRef.current) {
      sunRef.current.rotation.y = time * 0.1;
      sunRef.current.rotation.x = Math.sin(time * 0.5) * 0.05;
    }
    
    // Corona pulsing and flaring
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.15);
      coronaRef.current.material.opacity = 0.4 + Math.sin(time * 3) * 0.2;
    }
    
    // Solar flares animation
    if (flareRef.current) {
      flareRef.current.rotation.z = time * 0.3;
      flareRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.2);
    }
    
    // Solar prominences
    if (prominenceRef.current) {
      prominenceRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Sun Core - Realistic fiery surface */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshBasicMaterial 
          color="#FF6B00"
          emissive="#FF4500"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Solar surface activity layer */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.6}
          emissive="#FF8C00"
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Solar Corona - Multi-layered */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFFF88"
          transparent
          opacity={0.3}
          emissive="#FFD700"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Extended Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.6, 24, 24]} />
        <meshBasicMaterial
          color="#FFFFAA"
          transparent
          opacity={0.1}
          emissive="#FFFF00"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Solar Flares */}
      <group ref={flareRef}>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 2.5 + Math.sin(i * 2) * 0.5;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                Math.sin(i * 3) * 0.3
              ]}
              rotation={[0, 0, angle]}
            >
              <cylinderGeometry args={[0.02, 0.08, 1.2, 8]} />
              <meshBasicMaterial 
                color="#FFFF00" 
                transparent 
                opacity={0.8}
                emissive="#FF4500"
                emissiveIntensity={0.6}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Solar Prominences */}
      <group ref={prominenceRef}>
        {Array.from({ length: 6 }, (_, i) => {
          const angle = (i / 6) * Math.PI * 2 + Math.PI/6;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 2.0,
                Math.sin(angle) * 2.0,
                Math.sin(i * 2) * 0.5
              ]}
              rotation={[Math.random() * 0.5, Math.random() * 0.5, angle]}
            >
              <torusGeometry args={[0.3, 0.08, 8, 16]} />
              <meshBasicMaterial 
                color="#FF8C00" 
                transparent 
                opacity={0.7}
                emissive="#FF6B00"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Sun label */}
      <Text
        position={[0, -3.2, 0]}
        fontSize={0.25}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        सूर्य (SUN)
      </Text>
    </group>
  );
};

// Enhanced Moon with realistic surface and larger size
const Moon = ({ earthPosition }) => {
  const moonRef = useRef();
  const orbitRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Moon orbital motion around Earth
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * 1.5; // Realistic orbit speed
    }
    
    // Moon rotation (tidally locked, so matches orbital period)
    if (moonRef.current) {
      moonRef.current.rotation.y = time * 1.5; // Same as orbit for tidal locking
    }
  });

  return (
    <group position={earthPosition} ref={orbitRef}>
      <group position={[6, 0, 0]}>
        {/* Moon Base */}
        <mesh ref={moonRef} castShadow receiveShadow>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#E6E6E6"
            roughness={0.95}
            metalness={0.0}
          />
        </mesh>
        
        {/* Lunar Craters */}
        <group ref={moonRef}>
          {/* Major craters */}
          <mesh position={[0.3, 0.4, 0.6]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#CCCCCC" roughness={0.98} />
          </mesh>
          <mesh position={[-0.4, -0.2, 0.65]} castShadow>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#BBBBBB" roughness={0.98} />
          </mesh>
          <mesh position={[0.2, -0.5, 0.55]} castShadow>
            <sphereGeometry args={[0.06, 10, 10]} />
            <meshStandardMaterial color="#DDDDDD" roughness={0.98} />
          </mesh>
          <mesh position={[-0.1, 0.6, 0.5]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#C8C8C8" roughness={0.98} />
          </mesh>
          
          {/* Mare (dark patches) */}
          <mesh position={[0.1, 0.1, 0.75]} castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#999999" roughness={0.95} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0.65]} castShadow>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#AAAAAA" roughness={0.95} />
          </mesh>
        </group>
        
        {/* Moon's orbital path */}
        <mesh rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[6, 0.02, 8, 64]} />
          <meshBasicMaterial color="#888888" transparent opacity={0.2} />
        </mesh>
        
        {/* Moon label */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.12}
          color="#E6E6E6"
          anchorX="center"
          anchorY="middle"
        >
          चन्द्र (MOON)
        </Text>
      </group>
    </group>
  );
};

// Shadow Demonstration Surface
const ShadowPlane = () => {
  return (
    <group position={[0, -6, 0]}>
      {/* Large shadow-receiving plane */}
      <mesh receiveShadow rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      
      {/* Shadow demonstration text */}
      <Text
        position={[0, 0.1, -10]}
        fontSize={0.4}
        color="#555555"
        anchorX="center"
        anchorY="middle"
        rotation={[-Math.PI/2, 0, 0]}
      >
        CELESTIAL SHADOWS
      </Text>
    </group>
  );
};

// Celestial Coordinate System
const CelestialGrid = () => {
  return (
    <group>
      {/* Celestial sphere (wireframe) */}
      <mesh>
        <sphereGeometry args={[15, 24, 12]} />
        <meshBasicMaterial color="#444444" wireframe transparent opacity={0.1} />
      </mesh>
      
      {/* Ecliptic plane */}
      <mesh rotation={[Math.PI/12, 0, 0]}>
        <torusGeometry args={[12, 0.02, 8, 64]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.4} />
      </mesh>
      
      {/* Celestial equator */}
      <mesh>
        <torusGeometry args={[10, 0.015, 8, 64]} />
        <meshBasicMaterial color="#4169E1" transparent opacity={0.3} />
      </mesh>
      
      {/* Cardinal directions */}
      <Text position={[0, 0, 12]} fontSize={0.3} color="#FF0000">N</Text>
      <Text position={[0, 0, -12]} fontSize={0.3} color="#FF0000">S</Text>
      <Text position={[12, 0, 0]} fontSize={0.3} color="#00FF00">E</Text>
      <Text position={[-12, 0, 0]} fontSize={0.3} color="#00FF00">W</Text>
    </group>
  );
};

// Floating Information Panels
const InfoPanels = () => {
  const panelRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (panelRef.current) {
      panelRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={panelRef} position={[8, 3, 0]}>
      <Text
        fontSize={0.15}
        color="#D4AF37"
        anchorX="left"
        anchorY="top"
        maxWidth={3}
      >
        ANCIENT ASTRONOMY{'\n'}
        • Solar Position Tracking{'\n'}
        • Celestial Coordinates{'\n'}
        • Time Measurement{'\n'}
        • Shadow Geometry{'\n'}
        • Latitude Correction
      </Text>
    </group>
  );
};

// Main Celestial Animation Component
const CelestialScene = () => {
  const earthPosition = useMemo(() => [0, 0, 0], []);
  const sunPosition = useMemo(() => [-8, 2, 0], []);

  return (
    <>
      {/* Enhanced Lighting System */}
      <ambientLight intensity={0.15} color="#404040" />
      
      {/* Main Sun Light - Creates realistic shadows */}
      <directionalLight
        position={sunPosition}
        intensity={3}
        color="#FFA500"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0001}
      />
      
      {/* Sun's Point Light for illumination */}
      <pointLight 
        position={sunPosition} 
        intensity={2} 
        color="#FFB366" 
        distance={50}
        decay={0.5}
      />
      
      {/* Soft fill light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.3}
        color="#FFFFFF"
      />

      {/* Enhanced Celestial Bodies */}
      <Sun position={sunPosition} />
      <Earth position={earthPosition} />
      <Moon earthPosition={earthPosition} />
      
      {/* Shadow demonstration plane */}
      <ShadowPlane />
      
      {/* Simplified Celestial Reference */}
      <CelestialGrid />
      
      {/* Information Panels */}
      <InfoPanels />
      
      {/* Enhanced Background Stars */}
      <Stars
        radius={150}
        depth={100}
        count={8000}
        factor={6}
        saturation={0}
        fade
        speed={0.3}
      />
      
      {/* Controls with better limits */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={60}
        autoRotate={true}
        autoRotateSpeed={0.3}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  );
};

// Main Component Export
const CelestialAnimation = ({ height = '600px' }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        borderRadius: 2,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000011 0%, #001122 50%, #000033 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,215,0,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 1
        }
      }}
    >
      <Canvas
        camera={{ position: [15, 8, 15], fov: 50 }}
        shadows={{ enabled: true, type: 'PCFSoftShadowMap' }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <CelestialScene />
      </Canvas>
      
      {/* Overlay UI Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          color: '#D4AF37',
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: 2,
          borderRadius: 1,
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          🌟 Live Celestial Simulation
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Interactive Earth-Sun-Moon system with{'\n'}
          real-time shadow casting for yantras
        </Typography>
      </Box>
      
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          color: '#F5E6D3',
          zIndex: 2,
          textAlign: 'right',
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: 2,
          borderRadius: 1,
          backdropFilter: 'blur(10px)'
        }}
      >
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          🎮 Drag to rotate • Scroll to zoom • Auto-rotating view
        </Typography>
      </Box>
    </Box>
  );
};

export default CelestialAnimation;