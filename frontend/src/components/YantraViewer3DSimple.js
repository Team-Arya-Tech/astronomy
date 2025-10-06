import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const YantraViewer3D = ({ yantraType = 'samrat', specs = null }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(20, 15, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff8dc, 1);
    sunLight.position.set(10, 15, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(40, 40, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Render yantra
    renderYantra(scene, yantraType, specs);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (cameraRef.current) {
        // Gentle camera rotation
        cameraRef.current.position.x = Math.sin(Date.now() * 0.0001) * 25;
        cameraRef.current.position.z = Math.cos(Date.now() * 0.0001) * 25;
        cameraRef.current.lookAt(0, 2, 0);
      }
      
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
  }, [yantraType, specs]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '400px',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

function renderYantra(scene, yantraType, specs) {
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4a574,
    roughness: 0.9,
    metalness: 0.1
  });

  const marbleMaterial = new THREE.MeshStandardMaterial({
    color: 0xf5f5dc,
    roughness: 0.3,
    metalness: 0.2
  });

  const copperMaterial = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    roughness: 0.4,
    metalness: 0.8
  });

  switch (yantraType) {
    case 'samrat':
      renderSamratYantra(scene, specs, stoneMaterial, marbleMaterial);
      break;
    case 'rama':
      renderRamaYantra(scene, specs, stoneMaterial, marbleMaterial);
      break;
    case 'jai_prakash':
      renderJaiPrakashYantra(scene, specs, stoneMaterial, copperMaterial);
      break;
    default:
      renderSamratYantra(scene, specs, stoneMaterial, marbleMaterial);
  }
}

function renderSamratYantra(scene, specs, stoneMaterial, marbleMaterial) {
  const baseWidth = specs?.dimensions?.base_width || 10;
  const baseLength = specs?.dimensions?.base_length || 12;
  const gnomonHeight = specs?.dimensions?.gnomon_height || 8;

  // Base platform
  const baseGeometry = new THREE.BoxGeometry(baseWidth, 0.5, baseLength);
  const baseMesh = new THREE.Mesh(baseGeometry, marbleMaterial);
  baseMesh.position.y = 0.25;
  baseMesh.receiveShadow = true;
  scene.add(baseMesh);

  // Gnomon (triangular sundial)
  const gnomonGeometry = new THREE.ConeGeometry(0.1, gnomonHeight, 3);
  const gnomonMesh = new THREE.Mesh(gnomonGeometry, stoneMaterial);
  gnomonMesh.position.y = gnomonHeight / 2 + 0.5;
  gnomonMesh.rotation.z = Math.PI / 6; // Tilt based on latitude
  gnomonMesh.castShadow = true;
  scene.add(gnomonMesh);

  // Hour markings
  for (let i = -6; i <= 6; i++) {
    const angle = (i * 15) * Math.PI / 180; // 15 degrees per hour
    const markLength = baseLength / 2 - 1;
    
    const markGeometry = new THREE.BoxGeometry(0.1, 0.1, markLength);
    const markMesh = new THREE.Mesh(markGeometry, stoneMaterial);
    markMesh.position.set(
      Math.sin(angle) * markLength / 2,
      0.6,
      Math.cos(angle) * markLength / 2
    );
    markMesh.rotation.y = angle;
    scene.add(markMesh);
  }
}

function renderRamaYantra(scene, specs, stoneMaterial, marbleMaterial) {
  const radius = specs?.dimensions?.radius || 6;
  const height = specs?.dimensions?.height || 4;

  // Cylindrical base
  const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 32);
  const cylinderMesh = new THREE.Mesh(cylinderGeometry, marbleMaterial);
  cylinderMesh.position.y = height / 2;
  cylinderMesh.receiveShadow = true;
  scene.add(cylinderMesh);

  // Central vertical pole
  const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, height + 2, 8);
  const poleMesh = new THREE.Mesh(poleGeometry, stoneMaterial);
  poleMesh.position.y = (height + 2) / 2;
  poleMesh.castShadow = true;
  scene.add(poleMesh);

  // Radial hour lines
  for (let i = 0; i < 12; i++) {
    const angle = (i * 30) * Math.PI / 180; // 30 degrees per hour
    
    const lineGeometry = new THREE.BoxGeometry(0.05, 0.2, radius - 0.5);
    const lineMesh = new THREE.Mesh(lineGeometry, stoneMaterial);
    lineMesh.position.set(
      Math.sin(angle) * (radius - 0.25) / 2,
      height + 0.1,
      Math.cos(angle) * (radius - 0.25) / 2
    );
    lineMesh.rotation.y = angle;
    scene.add(lineMesh);
  }
}

function renderJaiPrakashYantra(scene, specs, stoneMaterial, copperMaterial) {
  const radius = specs?.dimensions?.radius || 5;
  
  // Hemispherical bowl
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const sphereMesh = new THREE.Mesh(sphereGeometry, copperMaterial);
  sphereMesh.position.y = 0;
  sphereMesh.receiveShadow = true;
  scene.add(sphereMesh);

  // Rim
  const rimGeometry = new THREE.TorusGeometry(radius, 0.2, 8, 32);
  const rimMesh = new THREE.Mesh(rimGeometry, stoneMaterial);
  rimMesh.position.y = 0;
  rimMesh.rotation.x = Math.PI / 2;
  scene.add(rimMesh);

  // Celestial coordinate lines
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45) * Math.PI / 180;
    
    // Meridian lines
    const curve = new THREE.EllipseCurve(
      0, 0,
      radius * 0.9, radius * 0.9,
      angle, angle + Math.PI,
      false,
      0
    );
    
    const points = curve.getPoints(50);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    line.rotation.x = Math.PI / 2;
    line.position.y = 0.1;
    scene.add(line);
  }

  // Central pointer
  const pointerGeometry = new THREE.ConeGeometry(0.1, 1, 6);
  const pointerMesh = new THREE.Mesh(pointerGeometry, stoneMaterial);
  pointerMesh.position.y = 0.5;
  pointerMesh.castShadow = true;
  scene.add(pointerMesh);
}

export default YantraViewer3D;