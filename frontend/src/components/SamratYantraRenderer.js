import * as THREE from 'three';

/**
 * Accurate Samrat Yantra 3D Renderer
 * 
 * The Samrat Yantra consists of:
 * 1. Gnomon - Triangular wall with hypotenuse parallel to Earth's axis
 * 2. East Quadrant - For AM hours (6 AM to 12 PM) 
 * 3. West Quadrant - For PM hours (12 PM to 6 PM)
 * 4. Both quadrants lie parallel to the plane of the equator
 */

export class SamratYantraRenderer {
  constructor() {
    this.materials = this.createMaterials();
  }

  createMaterials() {
    return {
      stone: new THREE.MeshStandardMaterial({
        color: 0xd4a574,
        roughness: 0.8,
        metalness: 0.1,
        transparent: false
      }),
      
      marble: new THREE.MeshStandardMaterial({
        color: 0xf5f5dc,
        roughness: 0.2,
        metalness: 0.05,
        transparent: false
      }),

      shadow: new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.3
      })
    };
  }

  /**
   * Renders the complete Samrat Yantra structure
   * @param {THREE.Scene} scene - Three.js scene
   * @param {Object} specs - Yantra specifications
   */
  render(scene, specs = {}) {
    // Extract dimensions and angles
    const dimensions = this.calculateDimensions(specs);
    
    // Clear any existing yantra objects
    this.clearPreviousYantra(scene);
    
    // Create the main components
    this.createFoundation(scene, dimensions);
    this.createGnomon(scene, dimensions);
    this.createEastQuadrant(scene, dimensions);
    this.createWestQuadrant(scene, dimensions);
    this.createHourMarkings(scene, dimensions);
    this.createArchitecturalDetails(scene, dimensions);
  }

  /**
   * Calculate accurate dimensions based on specifications
   */
  calculateDimensions(specs) {
    const latitude = specs?.coordinates?.latitude || 28.6; // Delhi latitude
    const gnomonAngle = latitude; // Gnomon angle equals latitude
    
    return {
      // Base dimensions
      baseLength: specs?.dimensions?.base_length || 16,
      baseWidth: specs?.dimensions?.base_width || 12,
      foundationHeight: 0.8,
      
      // Gnomon dimensions  
      gnomonHeight: specs?.dimensions?.gnomon_height || 8,
      gnomonThickness: 0.6,
      gnomonAngle: gnomonAngle * Math.PI / 180, // Convert to radians
      
      // Quadrant dimensions
      quadrantRadius: specs?.dimensions?.quadrant_radius || 6,
      quadrantHeight: 2.5,
      quadrantDepth: 0.8,
      
      // Hour marking dimensions
      hourMarkHeight: 0.15,
      hourMarkWidth: 0.05,
      hourMarkLength: 0.8,
      
      // Material assignments
      stoneMaterial: this.materials.stone,
      marbleMaterial: this.materials.marble
    };
  }

  /**
   * Create the foundation platform
   */
  createFoundation(scene, dims) {
    const foundationGeometry = new THREE.BoxGeometry(
      dims.baseLength * 1.2, 
      dims.foundationHeight, 
      dims.baseWidth * 1.1
    );
    
    const foundationMesh = new THREE.Mesh(foundationGeometry, dims.stoneMaterial);
    foundationMesh.position.y = dims.foundationHeight / 2;
    foundationMesh.receiveShadow = true;
    foundationMesh.castShadow = true;
    foundationMesh.userData = { component: 'samrat-yantra' };
    scene.add(foundationMesh);
  }

  /**
   * Create the triangular gnomon wall with hypotenuse parallel to Earth's axis
   */
  createGnomon(scene, dims) {
    // Calculate gnomon dimensions based on latitude
    const gnomonBase = dims.gnomonHeight * Math.cos(dims.gnomonAngle);
    const gnomonVertical = dims.gnomonHeight * Math.sin(dims.gnomonAngle);
    
    // Use simpler box geometry approach to avoid BufferGeometry issues
    const gnomonGeometry = new THREE.BoxGeometry(gnomonBase, dims.gnomonHeight * 0.8, dims.baseWidth);
    const gnomonMesh = new THREE.Mesh(gnomonGeometry, dims.stoneMaterial);
    
    // Position and rotate to create the triangular wall effect
    gnomonMesh.position.set(gnomonBase / 2, dims.foundationHeight + dims.gnomonHeight * 0.4, 0);
    gnomonMesh.rotation.z = -dims.gnomonAngle;
    gnomonMesh.castShadow = true;
    gnomonMesh.receiveShadow = true;
    gnomonMesh.userData = { component: 'samrat-yantra' };
    scene.add(gnomonMesh);

    // Add the critical hypotenuse edge marker
    this.createHypotenuseEdge(scene, dims, gnomonBase, gnomonVertical);
  }

  /**
   * Create the hypotenuse edge - the most critical part for shadow casting
   */
  createHypotenuseEdge(scene, dims, gnomonBase, gnomonVertical) {
    const edgeGeometry = new THREE.CylinderGeometry(0.02, 0.02, dims.baseWidth, 16);
    const edgeMesh = new THREE.Mesh(edgeGeometry, dims.marbleMaterial);
    
    // Position along the hypotenuse
    edgeMesh.position.set(
      gnomonBase / 2,
      dims.foundationHeight + gnomonVertical / 2,
      0
    );
    edgeMesh.rotation.z = dims.gnomonAngle;
    edgeMesh.rotation.x = Math.PI / 2;
    edgeMesh.castShadow = true;
    edgeMesh.userData = { component: 'samrat-yantra' };
    scene.add(edgeMesh);
  }

  /**
   * Create East Quadrant (AM hours: 6 AM to 12 PM)
   * Positioned parallel to the equatorial plane
   */
  createEastQuadrant(scene, dims) {
    const quadrantGroup = new THREE.Group();
    
    // Main quadrant surface - semicircular and inclined to equatorial plane
    const quadrantGeometry = new THREE.CylinderGeometry(
      dims.quadrantRadius, 
      dims.quadrantRadius, 
      dims.quadrantDepth, 
      32, 1, false, 0, Math.PI
    );
    
    const quadrantMesh = new THREE.Mesh(quadrantGeometry, dims.marbleMaterial);
    quadrantMesh.position.set(dims.baseLength * 0.4, dims.quadrantHeight, 0);
    quadrantMesh.rotation.y = Math.PI / 2; // Face towards gnomon
    quadrantMesh.rotation.x = dims.gnomonAngle; // Parallel to equatorial plane
    quadrantMesh.receiveShadow = true;
    quadrantMesh.castShadow = true;
    quadrantGroup.add(quadrantMesh);

    // Support structure
    const supportGeometry = new THREE.BoxGeometry(dims.quadrantRadius * 1.5, dims.quadrantHeight, 0.4);
    const supportMesh = new THREE.Mesh(supportGeometry, dims.stoneMaterial);
    supportMesh.position.set(dims.baseLength * 0.4, dims.quadrantHeight / 2 + dims.foundationHeight, 0);
    supportMesh.castShadow = true;
    supportMesh.receiveShadow = true;
    quadrantGroup.add(supportMesh);

    quadrantGroup.userData = { component: 'samrat-yantra' };
    scene.add(quadrantGroup);
  }

  /**
   * Create West Quadrant (PM hours: 12 PM to 6 PM) 
   * Mirror of East Quadrant
   */
  createWestQuadrant(scene, dims) {
    const quadrantGroup = new THREE.Group();
    
    // Main quadrant surface - semicircular and inclined to equatorial plane
    const quadrantGeometry = new THREE.CylinderGeometry(
      dims.quadrantRadius, 
      dims.quadrantRadius, 
      dims.quadrantDepth, 
      32, 1, false, 0, Math.PI
    );
    
    const quadrantMesh = new THREE.Mesh(quadrantGeometry, dims.marbleMaterial);
    quadrantMesh.position.set(-dims.baseLength * 0.4, dims.quadrantHeight, 0);
    quadrantMesh.rotation.y = -Math.PI / 2; // Face towards gnomon
    quadrantMesh.rotation.x = dims.gnomonAngle; // Parallel to equatorial plane
    quadrantMesh.receiveShadow = true;
    quadrantMesh.castShadow = true;
    quadrantGroup.add(quadrantMesh);

    // Support structure
    const supportGeometry = new THREE.BoxGeometry(dims.quadrantRadius * 1.5, dims.quadrantHeight, 0.4);
    const supportMesh = new THREE.Mesh(supportGeometry, dims.stoneMaterial);
    supportMesh.position.set(-dims.baseLength * 0.4, dims.quadrantHeight / 2 + dims.foundationHeight, 0);
    supportMesh.castShadow = true;
    supportMesh.receiveShadow = true;
    quadrantGroup.add(supportMesh);

    quadrantGroup.userData = { component: 'samrat-yantra' };
    scene.add(quadrantGroup);
  }

  /**
   * Create hour markings on both quadrants
   */
  createHourMarkings(scene, dims) {
    // East quadrant hour markings (6 AM to 12 PM)
    for (let hour = 6; hour <= 12; hour++) {
      const hourAngle = (hour - 9) * 15 * Math.PI / 180; // Relative to 9 AM
      this.createHourMark(scene, dims, hour, hourAngle, true);
    }

    // West quadrant hour markings (12 PM to 6 PM)  
    for (let hour = 12; hour <= 18; hour++) {
      const hourAngle = (hour - 15) * 15 * Math.PI / 180; // Relative to 3 PM
      this.createHourMark(scene, dims, hour, hourAngle, false);
    }
  }

  /**
   * Create individual hour marking
   */
  createHourMark(scene, dims, hour, angle, isEast) {
    const markGeometry = new THREE.BoxGeometry(
      dims.hourMarkWidth, 
      dims.hourMarkHeight, 
      dims.hourMarkLength
    );
    
    const markMesh = new THREE.Mesh(markGeometry, dims.stoneMaterial);
    
    const radius = dims.quadrantRadius * 0.8;
    const side = isEast ? 1 : -1;
    
    // Position on the curved quadrant surface
    markMesh.position.set(
      side * dims.baseLength * 0.4 + Math.cos(angle) * radius * side,
      dims.quadrantHeight + 0.2,
      Math.sin(angle) * radius
    );
    
    markMesh.rotation.y = angle + (isEast ? 0 : Math.PI);
    markMesh.castShadow = true;
    markMesh.userData = { component: 'samrat-yantra', hour: hour };
    scene.add(markMesh);

    // Add hour number marker
    const numberGeometry = new THREE.SphereGeometry(0.06, 8, 6);
    const numberMesh = new THREE.Mesh(numberGeometry, dims.marbleMaterial);
    numberMesh.position.set(
      side * dims.baseLength * 0.4 + Math.cos(angle) * (radius + 0.3) * side,
      dims.quadrantHeight + 0.3,
      Math.sin(angle) * (radius + 0.3)
    );
    numberMesh.castShadow = true;
    numberMesh.userData = { component: 'samrat-yantra', hour: hour };
    scene.add(numberMesh);
  }

  /**
   * Add architectural details and decorative elements
   */
  createArchitecturalDetails(scene, dims) {
    // Corner pillars
    const pillarPositions = [
      [dims.baseLength * 0.6, dims.baseWidth * 0.5],
      [-dims.baseLength * 0.6, dims.baseWidth * 0.5],
      [dims.baseLength * 0.6, -dims.baseWidth * 0.5],
      [-dims.baseLength * 0.6, -dims.baseWidth * 0.5]
    ];

    pillarPositions.forEach(([x, z]) => {
      const pillarGeometry = new THREE.CylinderGeometry(0.25, 0.3, 2.0, 12);
      const pillarMesh = new THREE.Mesh(pillarGeometry, dims.stoneMaterial);
      pillarMesh.position.set(x, dims.foundationHeight + 1.0, z);
      pillarMesh.castShadow = true;
      pillarMesh.receiveShadow = true;
      pillarMesh.userData = { component: 'samrat-yantra' };
      scene.add(pillarMesh);

      // Pillar cap
      const capGeometry = new THREE.CylinderGeometry(0.35, 0.25, 0.2, 12);
      const capMesh = new THREE.Mesh(capGeometry, dims.marbleMaterial);
      capMesh.position.set(x, dims.foundationHeight + 2.1, z);
      capMesh.castShadow = true;
      capMesh.userData = { component: 'samrat-yantra' };
      scene.add(capMesh);
    });

    // Perimeter walls
    this.createPerimeterWalls(scene, dims);
  }

  /**
   * Create perimeter walls
   */
  createPerimeterWalls(scene, dims) {
    // North wall
    const northWallGeometry = new THREE.BoxGeometry(dims.baseLength * 1.1, 0.8, 0.3);
    const northWallMesh = new THREE.Mesh(northWallGeometry, dims.stoneMaterial);
    northWallMesh.position.set(0, dims.foundationHeight + 0.4, dims.baseWidth * 0.55);
    northWallMesh.castShadow = true;
    northWallMesh.receiveShadow = true;
    northWallMesh.userData = { component: 'samrat-yantra' };
    scene.add(northWallMesh);

    // South wall
    const southWallMesh = new THREE.Mesh(northWallGeometry, dims.stoneMaterial);
    southWallMesh.position.set(0, dims.foundationHeight + 0.4, -dims.baseWidth * 0.55);
    southWallMesh.castShadow = true;
    southWallMesh.receiveShadow = true;
    southWallMesh.userData = { component: 'samrat-yantra' };
    scene.add(southWallMesh);
  }

  /**
   * Clear any previous yantra objects from the scene
   */
  clearPreviousYantra(scene) {
    const objectsToRemove = [];
    scene.traverse((object) => {
      if (object.userData && object.userData.component === 'samrat-yantra') {
        objectsToRemove.push(object);
      }
    });
    
    objectsToRemove.forEach(object => {
      scene.remove(object);
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    });
  }

  /**
   * Update shadow position based on sun position (for animation)
   */
  updateShadowPosition(scene, sunPosition) {
    // This method can be used to animate the shadow based on time of day
    // Implementation would calculate shadow projection on quadrants
  }

  /**
   * Get information about the yantra structure
   */
  getYantraInfo() {
    return {
      name: "Samrat Yantra (Great Sundial)",
      description: "A large sundial with triangular gnomon and curved quadrants",
      components: [
        "Triangular Gnomon - Shadow casting wall with hypotenuse parallel to Earth's axis",
        "East Quadrant - Curved surface for AM hours (6 AM to 12 PM)",
        "West Quadrant - Curved surface for PM hours (12 PM to 6 PM)",
        "Hour Markings - Time scales on both quadrants",
        "Foundation Platform - Base structure supporting the instrument"
      ],
      accuracy: "±2 minutes",
      principle: "Shadow of gnomon falls on quadrant scales indicating local solar time"
    };
  }
}

export default SamratYantraRenderer;