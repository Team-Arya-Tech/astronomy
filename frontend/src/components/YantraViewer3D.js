import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Samrat Yantra 3D Component with Accurate Geometry and Shadows
const SamratYantra3D = ({ specs }) => {
  const gnomonRef = useRef();
  const shadowRef = useRef();
  const shadowGroupRef = useRef();
  
  useFrame((state) => {
    // ENHANCED REAL-TIME SHADOW CALCULATION
    const time = state.clock.getElapsedTime();
    
    // Simulate time progression (6 AM to 6 PM cycle over 20 seconds)
    const dayProgress = (time % 20) / 20; // 0 to 1 over 20 seconds
    const currentHour = 6 + (dayProgress * 12); // 6 AM to 6 PM
    
    if (shadowGroupRef.current && specs && specs.angles) {
      // Get the closest hour angle from API data
      const hourKey = `hour_${Math.floor(currentHour).toString().padStart(2, '0')}`;
      let shadowAngleDeg = specs.angles[hourKey];
      
      // Interpolate between hours for smooth animation
      if (shadowAngleDeg !== undefined) {
        const nextHour = Math.ceil(currentHour);
        const nextHourKey = `hour_${nextHour.toString().padStart(2, '0')}`;
        const nextAngleDeg = specs.angles[nextHourKey];
        
        if (nextAngleDeg !== undefined) {
          const t = currentHour - Math.floor(currentHour);
          shadowAngleDeg = shadowAngleDeg + t * (nextAngleDeg - shadowAngleDeg);
        }
        
        // Convert to radians and calculate shadow position
        const shadowAngleRad = (90 - shadowAngleDeg) * Math.PI / 180;
        const gnomonHeight = specs.dimensions.gnomon_height || 18;
        const scale = 0.05; // Current scale factor
        
        // Calculate shadow length based on sun elevation
        const sunElevation = Math.max(0.1, Math.sin((currentHour - 6) * Math.PI / 12));
        const shadowLength = (gnomonHeight * scale) / Math.tan(sunElevation);
        
        // Position shadow on the base
        const maxShadowLength = specs.dimensions.base_length * scale * 0.4;
        const clampedShadowLength = Math.min(shadowLength, maxShadowLength);
        
        shadowGroupRef.current.position.x = Math.sin(shadowAngleRad) * clampedShadowLength;
        shadowGroupRef.current.position.z = Math.cos(shadowAngleRad) * clampedShadowLength;
        
        // Rotate gnomon shadow to point correctly
        shadowGroupRef.current.rotation.y = -shadowAngleRad;
      }
    }
  });

  if (!specs) return null;

  const { dimensions, angles } = specs;
  const scale = 0.05; // Scale down for better viewing
  
  // Enhanced geometric calculations
  const baseLength = dimensions.base_length * scale;
  const baseWidth = dimensions.base_width * scale;
  const gnomonHeight = dimensions.gnomon_height * scale;
  const gnomonThickness = dimensions.gnomon_thickness * scale;
  const gnomonAngle = angles.gnomon_angle || 28.7; // Latitude angle

  return (
    <group>
      {/* ENHANCED BASE PLATFORM with proper proportions */}
      <Box
        args={[baseLength, 0.3 * scale, baseWidth]}
        position={[0, -0.15 * scale, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#f5f5dc" 
          roughness={0.8}
          metalness={0.1}
        />
      </Box>

      {/* BASE STEPS/PLATFORM DETAIL */}
      <Box
        args={[baseLength * 1.1, 0.1 * scale, baseWidth * 1.1]}
        position={[0, -0.35 * scale, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color="#e6e6e6" 
          roughness={0.9}
        />
      </Box>

      {/* ACCURATE GNOMON STRUCTURE - Triangular Wall */}
      <group ref={gnomonRef}>
        {/* Main Gnomon Wall (properly angled triangular wall) */}
        <mesh
          position={[0, gnomonHeight / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[gnomonThickness, gnomonHeight, gnomonThickness * 2]} />
          <meshStandardMaterial 
            color="#8b7355" 
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>
        
        {/* Hypotenuse Edge (the actual shadow-casting edge) */}
        <mesh
          position={[0, gnomonHeight / 2, gnomonThickness]}
          rotation={[Math.PI/2 - (gnomonAngle * Math.PI / 180), 0, 0]}
          castShadow
        >
          <boxGeometry args={[gnomonThickness, gnomonHeight / Math.sin(gnomonAngle * Math.PI / 180), gnomonThickness * 0.2]} />
          <meshStandardMaterial 
            color="#a0522d" 
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>
        
        {/* North-South alignment indicator */}
        <Box
          args={[gnomonThickness * 3, 0.1 * scale, gnomonThickness * 0.5]}
          position={[0, 0.05 * scale, 0]}
          castShadow
        >
          <meshStandardMaterial color="#8B0000" />
        </Box>
      </group>

      {/* ENHANCED HOUR LINES with proper angles from API */}
      {Object.entries(angles).map(([key, angle]) => {
        if (!key.startsWith('hour_') || key.includes('angle')) return null;
        
        const hour = parseInt(key.split('_')[1]);
        if (hour < 6 || hour > 18) return null; // Only daylight hours
        
        const radian = (90 - angle) * Math.PI / 180; // Convert to standard coordinates
        const lineLength = baseLength * 0.35;
        const lineWidth = 0.03 * scale;
        
        return (
          <group key={key}>
            <Box
              args={[lineWidth, 0.02 * scale, lineLength]}
              position={[
                Math.sin(radian) * lineLength / 2,
                0.01 * scale,
                Math.cos(radian) * lineLength / 2
              ]}
              rotation={[0, -radian, 0]}
              castShadow
            >
              <meshStandardMaterial color="#666" roughness={0.8} />
            </Box>
            
            {/* Hour markers */}
            <Text
              position={[
                Math.sin(radian) * lineLength * 0.8,
                0.05 * scale,
                Math.cos(radian) * lineLength * 0.8
              ]}
              fontSize={0.1}
              color="#444"
              anchorX="center"
              anchorY="middle"
              rotation={[0, -radian, 0]}
            >
              {hour}
            </Text>
          </group>
        );
      })}

      {/* ENHANCED SHADOW SYSTEM */}
      <group ref={shadowGroupRef}>
        {/* Main shadow indicator */}
        <Box
          args={[0.05 * scale, 0.005 * scale, gnomonHeight * 0.8]}
          position={[0, 0.002 * scale, gnomonHeight * 0.4]}
          castShadow={false}
          receiveShadow={false}
        >
          <meshStandardMaterial 
            color="#2c2c2c" 
            transparent 
            opacity={0.7}
          />
        </Box>
        
        {/* Shadow tip indicator */}
        <Cylinder
          args={[0.02 * scale, 0.02 * scale, 0.01 * scale, 8]}
          position={[0, 0.005 * scale, gnomonHeight * 0.8]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial 
            color="#ff4444" 
            transparent 
            opacity={0.8}
          />
        </Cylinder>
      </group>

      {/* CARDINAL DIRECTION MARKERS */}
      <group>
        {/* North */}
        <Text
          position={[0, 0.1 * scale, baseWidth * 0.6]}
          fontSize={0.15}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          N
        </Text>
        
        {/* South */}
        <Text
          position={[0, 0.1 * scale, -baseWidth * 0.6]}
          fontSize={0.15}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          S
        </Text>
        
        {/* East */}
        <Text
          position={[baseLength * 0.6, 0.1 * scale, 0]}
          fontSize={0.15}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          E
        </Text>
        
        {/* West */}
        <Text
          position={[-baseLength * 0.6, 0.1 * scale, 0]}
          fontSize={0.15}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          W
        </Text>
      </group>

      {/* INFORMATION DISPLAY */}
      <Text
        position={[0, gnomonHeight + 0.3, 0]}
        fontSize={0.12}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
      >
        Samrat Yantra - {gnomonAngle.toFixed(1)}°N
      </Text>
      
      <Text
        position={[0, gnomonHeight + 0.15, 0]}
        fontSize={0.08}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        Gnomon Height: {(gnomonHeight/scale).toFixed(1)}m
      </Text>
    </group>
  );
};

// Rama Yantra 3D Component
const RamaYantra3D = ({ specs }) => {
  if (!specs) return null;

  const { dimensions } = specs;
  const scale = 0.1;

  return (
    <group>
      {/* Outer Wall */}
      <Cylinder
        args={[dimensions.outer_radius * scale, dimensions.outer_radius * scale, dimensions.wall_height * scale, 32]}
        position={[0, dimensions.wall_height * scale / 2, 0]}
      >
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} />
      </Cylinder>

      {/* Inner Measurement Area */}
      <Cylinder
        args={[dimensions.inner_radius * scale, dimensions.inner_radius * scale, 0.1 * scale, 32]}
        position={[0, 0.05 * scale, 0]}
      >
        <meshStandardMaterial color="#f5f5f5" />
      </Cylinder>

      {/* Central Pillar */}
      <Cylinder
        args={[dimensions.central_pillar_radius * scale, dimensions.central_pillar_radius * scale, dimensions.wall_height * scale, 16]}
        position={[0, dimensions.wall_height * scale / 2, 0]}
      >
        <meshStandardMaterial color="#1976d2" />
      </Cylinder>

      {/* Sector Dividers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        const radius = dimensions.outer_radius * scale;
        
        return (
          <Box
            key={i}
            args={[0.02 * scale, dimensions.wall_height * scale, radius]}
            position={[
              Math.sin(angle) * radius / 2,
              dimensions.wall_height * scale / 2,
              Math.cos(angle) * radius / 2
            ]}
            rotation={[0, -angle, 0]}
          >
            <meshStandardMaterial color="#666" />
          </Box>
        );
      })}

      <Text
        position={[0, dimensions.wall_height * scale + 0.3, 0]}
        fontSize={0.15}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
      >
        {specs.name}
      </Text>
    </group>
  );
};

// Jai Prakash Yantra 3D Component
const JaiPrakashYantra3D = ({ specs }) => {
  if (!specs) return null;

  const { dimensions } = specs;
  const scale = 0.1;

  return (
    <group>
      {/* Hemispherical Bowl */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[dimensions.hemisphere_radius * scale, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8f4f8" side={THREE.DoubleSide} transparent opacity={0.9} />
      </mesh>

      {/* Rim */}
      <Torus
        args={[dimensions.hemisphere_radius * scale, dimensions.rim_thickness * scale / 2, 8, 32]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#1976d2" />
      </Torus>

      {/* Declination Circles */}
      {[-20, -10, 0, 10, 20].map((declination, i) => {
        const radius = dimensions.hemisphere_radius * scale * Math.cos(declination * Math.PI / 180);
        const height = dimensions.hemisphere_radius * scale * Math.sin(declination * Math.PI / 180);
        
        return (
          <Torus
            key={i}
            args={[radius, 0.01 * scale, 4, 32]}
            position={[0, height, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#666" />
          </Torus>
        );
      })}

      {/* Hour Circles */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30) * Math.PI / 180;
        
        return (
          <Box
            key={i}
            args={[0.01 * scale, dimensions.hemisphere_radius * scale, 0.01 * scale]}
            position={[
              Math.sin(angle) * dimensions.hemisphere_radius * scale / 2,
              dimensions.hemisphere_radius * scale / 2,
              Math.cos(angle) * dimensions.hemisphere_radius * scale / 2
            ]}
            rotation={[0, -angle, 0]}
          >
            <meshStandardMaterial color="#444" />
          </Box>
        );
      })}

      <Text
        position={[0, dimensions.hemisphere_radius * scale + 0.3, 0]}
        fontSize={0.15}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
      >
        {specs.name}
      </Text>
    </group>
  );
};

// Main 3D Yantra Viewer Component
const YantraViewer3D = ({ yantraSpecs, yantraType }) => {
  const renderYantra = () => {
    switch (yantraType) {
      case 'samrat_yantra':
        return <SamratYantra3D specs={yantraSpecs} />;
      case 'rama_yantra':
        return <RamaYantra3D specs={yantraSpecs} />;
      case 'jai_prakash_yantra':
        return <JaiPrakashYantra3D specs={yantraSpecs} />;
      default:
        return null;
    }
  };

  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [8, 6, 8], fov: 45 }}
      style={{ height: '600px', borderRadius: '12px' }}
      shadows
    >
      {/* ENHANCED LIGHTING SYSTEM for Realistic Shadows */}
      
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Main directional light (Sun simulation) */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0001}
        color="#fffae6"
      />
      
      {/* Secondary fill light */}
      <directionalLight
        position={[-10, 15, -5]}
        intensity={0.4}
        color="#e6f3ff"
      />
      
      {/* Ground reflection light */}
      <pointLight 
        position={[0, 2, 0]} 
        intensity={0.3} 
        color="#fff8dc"
        decay={2}
        distance={20}
      />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={25}
        maxPolarAngle={Math.PI * 0.48} // Prevent going under ground
      />

      {/* Yantra */}
      {renderYantra()}

      {/* ENHANCED GROUND PLANE with realistic material */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.8, 0]} 
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#f5f5dc"
          roughness={0.9}
          metalness={0.0}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Ground texture pattern (stone/marble effect) */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.795, 0]} 
        receiveShadow
      >
        <planeGeometry args={[35, 35]} />
        <meshStandardMaterial 
          color="#ede7d9"
          roughness={0.8}
          metalness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* ENVIRONMENT ENHANCEMENTS */}
      
      {/* Sky dome for realistic lighting */}
      <mesh>
        <sphereGeometry args={[100, 32, 16]} />
        <meshBasicMaterial 
          color="#87CEEB" 
          side={THREE.BackSide}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Horizon line */}
      <Torus
        args={[50, 0.1, 4, 64]}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color="#d3d3d3" transparent opacity={0.3} />
      </Torus>

      {/* Cardinal Direction Indicators (larger scale) */}
      <group>
        {/* North */}
        <Text
          position={[0, 2, 15]}
          fontSize={0.8}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          NORTH
        </Text>
        
        {/* South */}
        <Text
          position={[0, 2, -15]}
          fontSize={0.8}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
        >
          SOUTH
        </Text>
        
        {/* East */}
        <Text
          position={[15, 2, 0]}
          fontSize={0.8}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
          rotation={[0, -Math.PI/2, 0]}
        >
          EAST
        </Text>
        
        {/* West */}
        <Text
          position={[-15, 2, 0]}
          fontSize={0.8}
          color="#8B0000"
          anchorX="center"
          anchorY="middle"
          rotation={[0, Math.PI/2, 0]}
        >
          WEST
        </Text>
      </group>

      {/* TIME AND SHADOW INFORMATION */}
      <Text
        position={[0, 8, 0]}
        fontSize={0.5}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
      >
        3D Samrat Yantra - Real-time Shadow Simulation
      </Text>
      
      <Text
        position={[0, 7.2, 0]}
        fontSize={0.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        Shadow moves across hour markings based on sun position
      </Text>

      {/* Optional: Coordinate axes (can be hidden for cleaner view) */}
      {false && (
        <group>
          <Box args={[2, 0.05, 0.05]} position={[1, 0, 0]}>
            <meshStandardMaterial color="red" transparent opacity={0.5} />
          </Box>
          <Box args={[0.05, 2, 0.05]} position={[0, 1, 0]}>
            <meshStandardMaterial color="green" transparent opacity={0.5} />
          </Box>
          <Box args={[0.05, 0.05, 2]} position={[0, 0, 1]}>
            <meshStandardMaterial color="blue" transparent opacity={0.5} />
          </Box>
        </group>
      )}
    </Canvas>
  );
};

export default YantraViewer3D;