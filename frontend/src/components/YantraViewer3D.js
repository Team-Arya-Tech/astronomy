import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Samrat Yantra 3D Component
const SamratYantra3D = ({ specs }) => {
  const gnomonRef = useRef();
  const shadowRef = useRef();
  
  useFrame((state) => {
    // Animate solar movement
    const time = state.clock.getElapsedTime();
    const hour = (time % 24) - 12; // -12 to 12 hours
    
    if (shadowRef.current && specs) {
      // Calculate shadow position based on time
      const shadowAngle = (hour * 15) * Math.PI / 180; // 15 degrees per hour
      const shadowLength = specs.dimensions.gnomon_height / Math.tan(Math.abs(shadowAngle) + 0.1);
      
      shadowRef.current.position.x = Math.sin(shadowAngle) * Math.min(shadowLength, 10);
      shadowRef.current.position.z = Math.cos(shadowAngle) * Math.min(shadowLength, 10);
    }
  });

  if (!specs) return null;

  const { dimensions, angles } = specs;
  const scale = 0.1; // Scale down for better viewing

  return (
    <group>
      {/* Base Platform */}
      <Box
        args={[dimensions.base_length * scale, 0.2 * scale, dimensions.base_width * scale]}
        position={[0, -0.1 * scale, 0]}
      >
        <meshStandardMaterial color="#e0e0e0" />
      </Box>

      {/* Gnomon (triangular sundial pointer) */}
      <group ref={gnomonRef}>
        <Box
          args={[0.1 * scale, dimensions.gnomon_height * scale, dimensions.gnomon_thickness * scale]}
          position={[0, dimensions.gnomon_height * scale / 2, 0]}
          rotation={[0, 0, -angles.gnomon_angle * Math.PI / 180]}
        >
          <meshStandardMaterial color="#1976d2" />
        </Box>
      </group>

      {/* Hour Lines */}
      {Object.entries(angles).map(([key, angle]) => {
        if (!key.startsWith('hour_')) return null;
        
        const radian = angle * Math.PI / 180;
        const lineLength = dimensions.base_length * scale * 0.4;
        
        return (
          <Box
            key={key}
            args={[0.02 * scale, 0.05 * scale, lineLength]}
            position={[
              Math.sin(radian) * lineLength / 2,
              0.02 * scale,
              Math.cos(radian) * lineLength / 2
            ]}
            rotation={[0, -radian, 0]}
          >
            <meshStandardMaterial color="#666" />
          </Box>
        );
      })}

      {/* Animated Shadow */}
      <Box
        ref={shadowRef}
        args={[0.1 * scale, 0.01 * scale, 2 * scale]}
        position={[0, 0.005 * scale, 0]}
      >
        <meshStandardMaterial color="#333" transparent opacity={0.6} />
      </Box>

      {/* Information Text */}
      <Text
        position={[0, dimensions.gnomon_height * scale + 0.5, 0]}
        fontSize={0.2}
        color="#1976d2"
        anchorX="center"
        anchorY="middle"
      >
        {specs.name}
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
      camera={{ position: [5, 5, 5], fov: 50 }}
      style={{ height: '500px', borderRadius: '12px' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />

      {/* Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
      />

      {/* Yantra */}
      {renderYantra()}

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
      </mesh>

      {/* Coordinate Axes (for reference) */}
      <group>
        {/* X-axis (Red) */}
        <Box args={[2, 0.05, 0.05]} position={[1, 0, 0]}>
          <meshStandardMaterial color="red" />
        </Box>
        {/* Y-axis (Green) */}
        <Box args={[0.05, 2, 0.05]} position={[0, 1, 0]}>
          <meshStandardMaterial color="green" />
        </Box>
        {/* Z-axis (Blue) */}
        <Box args={[0.05, 0.05, 2]} position={[0, 0, 1]}>
          <meshStandardMaterial color="blue" />
        </Box>
      </group>
    </Canvas>
  );
};

export default YantraViewer3D;