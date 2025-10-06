"""
YANTRA.AI - WebAR Virtual Jantar Mantar
Immersive AR experience for visualizing ancient astronomical instruments in real locations
"""

import json
import numpy as np
from typing import Dict, List, Tuple
from dataclasses import dataclass
import base64

@dataclass
class ARMarker:
    """AR marker configuration"""
    id: str
    pattern_url: str
    size: float  # Size in meters
    position: Tuple[float, float, float]
    rotation: Tuple[float, float, float]

@dataclass
class ARYantraModel:
    """3D model configuration for AR"""
    yantra_type: str
    model_url: str
    scale: float
    materials: Dict[str, str]
    animations: List[str]

class VirtualJantarMantarAR:
    """
    WebAR system for experiencing ancient astronomical instruments
    in your real environment using AR.js and A-Frame
    """
    
    def __init__(self):
        self.ar_patterns = {
            'samrat_yantra': 'patterns/samrat_marker.patt',
            'rama_yantra': 'patterns/rama_marker.patt',
            'jai_prakash_yantra': 'patterns/jai_prakash_marker.patt'
        }
        
        self.yantra_models = {
            'samrat_yantra': {
                'model': 'models/samrat_yantra.gltf',
                'scale': '0.1 0.1 0.1',
                'position': '0 0 0',
                'rotation': '0 0 0'
            },
            'rama_yantra': {
                'model': 'models/rama_yantra.gltf', 
                'scale': '0.1 0.1 0.1',
                'position': '0 0 0',
                'rotation': '0 0 0'
            },
            'jai_prakash_yantra': {
                'model': 'models/jai_prakash_yantra.gltf',
                'scale': '0.1 0.1 0.1',
                'position': '0 0 0',
                'rotation': '0 0 0'
            }
        }
    
    def generate_ar_scene(self, yantra_specs: Dict, user_location: Dict) -> str:
        """Generate A-Frame AR scene HTML"""
        
        yantra_type = yantra_specs['name'].lower().replace(' ', '_').split('_')[0] + '_yantra'
        
        # Generate dynamic yantra model based on specifications
        model_config = self.create_dynamic_yantra_model(yantra_specs)
        
        # Create solar animation based on user location
        solar_animation = self.create_solar_animation(user_location)
        
        html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YANTRA.AI - Virtual Jantar Mantar AR</title>
    
    <!-- A-Frame and AR.js -->
    <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/AR-js-org/AR.js/aframe/build/aframe-ar.min.js"></script>
    
    <!-- Custom AR Components -->
    <script>
        // Solar animation component
        AFRAME.registerComponent('solar-animation', {{
            schema: {{
                duration: {{type: 'number', default: 24000}}, // 24 seconds = 24 hours
                latitude: {{type: 'number', default: 28.6139}},
                declination: {{type: 'number', default: 0}}
            }},
            
            init: function() {{
                this.el.setAttribute('animation', {{
                    property: 'rotation',
                    to: '0 360 0',
                    dur: this.data.duration,
                    loop: true,
                    easing: 'linear'
                }});
            }}
        }});
        
        // Yantra info component
        AFRAME.registerComponent('yantra-info', {{
            schema: {{
                name: {{type: 'string'}},
                accuracy: {{type: 'string'}},
                location: {{type: 'string'}}
            }},
            
            init: function() {{
                this.el.addEventListener('click', () => {{
                    alert(`${{this.data.name}}\\nAccuracy: ${{this.data.accuracy}}\\nLocation: ${{this.data.location}}`);
                }});
            }}
        }});
        
        // Shadow calculation component
        AFRAME.registerComponent('shadow-calculator', {{
            schema: {{
                gnomonHeight: {{type: 'number', default: 1.0}},
                sunElevation: {{type: 'number', default: 45}}
            }},
            
            tick: function() {{
                const shadowLength = this.data.gnomonHeight / Math.tan(
                    this.data.sunElevation * Math.PI / 180
                );
                
                this.el.setAttribute('geometry', {{
                    primitive: 'box',
                    width: 0.1,
                    height: 0.01, 
                    depth: shadowLength
                }});
            }}
        }});
    </script>
    
    <style>
        body {{
            margin: 0;
            background: black;
            font-family: Arial, sans-serif;
        }}
        
        .ar-overlay {{
            position: fixed;
            top: 20px;
            left: 20px;
            right: 20px;
            z-index: 100;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-size: 14px;
        }}
        
        .ar-controls {{
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100;
            display: flex;
            gap: 10px;
        }}
        
        .ar-button {{
            background: #1976d2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }}
        
        .ar-button:hover {{
            background: #1565c0;
        }}
        
        .loading {{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 18px;
            z-index: 200;
        }}
    </style>
</head>
<body>
    <div class="loading" id="loading">
        🌌 Loading YANTRA.AI AR Experience...
    </div>
    
    <div class="ar-overlay" id="info-panel">
        <h3>🏛️ Virtual Jantar Mantar</h3>
        <p><strong>{yantra_specs['name']}</strong></p>
        <p>📍 {user_location.get('latitude', 0):.4f}°N, {user_location.get('longitude', 0):.4f}°E</p>
        <p>🎯 Point camera at marker to view yantra</p>
        <p>☀️ Solar simulation: {solar_animation['description']}</p>
    </div>
    
    <div class="ar-controls">
        <button class="ar-button" onclick="toggleSolarAnimation()">☀️ Solar Animation</button>
        <button class="ar-button" onclick="showInfo()">ℹ️ Information</button>
        <button class="ar-button" onclick="resetView()">🔄 Reset</button>
    </div>

    <a-scene
        vr-mode-ui="enabled: false"
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
        renderer="logarithmicDepthBuffer: true; colorManagement: true;"
        loading-screen="enabled: false"
    >
        <!-- Assets -->
        <a-assets>
            <!-- Textures -->
            <img id="sky-texture" src="textures/sky_gradient.jpg" crossorigin="anonymous">
            <img id="ground-texture" src="textures/stone_texture.jpg" crossorigin="anonymous">
            <img id="metal-texture" src="textures/metal_texture.jpg" crossorigin="anonymous">
            
            <!-- 3D Models (would be actual GLTF files) -->
            <a-asset-item id="yantra-model" src="{model_config['model_url']}"></a-asset-item>
            
            <!-- Audio -->
            <audio id="ambient-sound" src="audio/historical_ambience.mp3" preload="auto"></audio>
        </a-assets>

        <!-- AR Marker -->
        <a-marker
            type="pattern"
            url="{self.ar_patterns.get(yantra_type, 'patterns/default_marker.patt')}"
            smooth="true"
            smoothCount="10"
            smoothTolerance="0.01"
            smoothThreshold="5"
            id="yantra-marker"
        >
            <!-- Main Yantra Model -->
            <a-entity
                id="yantra-main"
                gltf-model="#yantra-model"
                scale="{model_config['scale']}"
                position="{model_config['position']}"
                rotation="{model_config['rotation']}"
                yantra-info="name: {yantra_specs['name']}; 
                           accuracy: {yantra_specs.get('accuracy_metrics', {}).get('time_accuracy_minutes', 'N/A')}min; 
                           location: {user_location.get('latitude', 0):.2f}°N {user_location.get('longitude', 0):.2f}°E"
                animation__mouseenter="property: scale; to: 1.1 1.1 1.1; startEvents: mouseenter; dur: 200"
                animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 200"
            >
                <!-- Yantra-specific elements -->
                {self.generate_yantra_specific_elements(yantra_specs)}
            </a-entity>

            <!-- Virtual Sun -->
            <a-sphere
                id="virtual-sun"
                radius="0.2"
                color="#FDB813"
                position="5 8 0"
                solar-animation="duration: {solar_animation['duration']}; 
                                latitude: {user_location.get('latitude', 0)}; 
                                declination: {solar_animation['declination']}"
                material="shader: standard; emissive: #FDB813; emissiveIntensity: 0.5"
                light="type: directional; color: #FDB813; intensity: 0.8"
            >
                <!-- Sun rays effect -->
                <a-animation
                    attribute="material.emissiveIntensity"
                    from="0.3"
                    to="0.7"
                    direction="alternate"
                    dur="2000"
                    repeat="indefinite"
                ></a-animation>
            </a-sphere>

            <!-- Celestial Sphere Grid -->
            <a-sphere
                id="celestial-sphere"
                radius="10"
                material="shader: standard; transparent: true; opacity: 0.1; wireframe: true"
                position="0 0 0"
                visible="false"
            ></a-sphere>

            <!-- Coordinate Grid -->
            <a-entity id="coordinate-grid" visible="false">
                <!-- North-South line -->
                <a-box position="0 0.01 0" width="0.05" height="0.02" depth="8" color="red" opacity="0.7"></a-box>
                <!-- East-West line -->
                <a-box position="0 0.01 0" width="8" height="0.02" depth="0.05" color="blue" opacity="0.7"></a-box>
                
                <!-- Direction labels -->
                <a-text value="N" position="0 0.5 3" align="center" color="red" scale="2 2 2"></a-text>
                <a-text value="S" position="0 0.5 -3" align="center" color="red" scale="2 2 2"></a-text>
                <a-text value="E" position="3 0.5 0" align="center" color="blue" scale="2 2 2"></a-text>
                <a-text value="W" position="-3 0.5 0" align="center" color="blue" scale="2 2 2"></a-text>
            </a-entity>

            <!-- Information Panel -->
            <a-plane
                id="info-panel-3d"
                position="0 3 0"
                width="4"
                height="2"
                color="#1976d2"
                opacity="0.8"
                visible="false"
            >
                <a-text
                    value="YANTRA.AI\\nVirtual Jantar Mantar\\n{yantra_specs['name']}\\nLat: {user_location.get('latitude', 0):.4f}° Lon: {user_location.get('longitude', 0):.4f}°"
                    position="0 0 0.01"
                    align="center"
                    color="white"
                    scale="0.5 0.5 0.5"
                ></a-text>
            </a-plane>

            <!-- Ambient lighting -->
            <a-light type="ambient" color="#404040" intensity="0.4"></a-light>
            <a-light type="point" position="2 4 4" color="#ffffff" intensity="0.6"></a-light>
        </a-marker>

        <!-- Camera -->
        <a-entity camera 
                  look-controls-enabled="false" 
                  arjs-look-controls="smoothingFactor: 0.1"
                  cursor="rayOrigin: mouse"
                  raycaster="objects: .clickable">
        </a-entity>
    </a-scene>

    <script>
        // AR Experience Controller
        let solarAnimationActive = true;
        let infoVisible = false;
        
        // Hide loading screen when AR is ready
        document.querySelector('a-scene').addEventListener('loaded', function() {{
            document.getElementById('loading').style.display = 'none';
        }});
        
        // Toggle solar animation
        function toggleSolarAnimation() {{
            const sun = document.getElementById('virtual-sun');
            if (solarAnimationActive) {{
                sun.removeAttribute('solar-animation');
                solarAnimationActive = false;
            }} else {{
                sun.setAttribute('solar-animation', '');
                solarAnimationActive = true;
            }}
        }}
        
        // Show information panel
        function showInfo() {{
            const infoPanel = document.getElementById('info-panel-3d');
            const grid = document.getElementById('coordinate-grid');
            const celestialSphere = document.getElementById('celestial-sphere');
            
            infoVisible = !infoVisible;
            infoPanel.setAttribute('visible', infoVisible);
            grid.setAttribute('visible', infoVisible);
            celestialSphere.setAttribute('visible', infoVisible);
        }}
        
        // Reset view
        function resetView() {{
            const yantra = document.getElementById('yantra-main');
            yantra.setAttribute('rotation', '{model_config['rotation']}');
            yantra.setAttribute('scale', '{model_config['scale']}');
        }}
        
        // Marker found/lost events
        document.querySelector('a-marker').addEventListener('markerFound', function() {{
            console.log('Yantra marker detected!');
            document.getElementById('info-panel').innerHTML += '<br>✅ Yantra marker detected!';
            
            // Play ambient sound
            document.getElementById('ambient-sound').play().catch(e => console.log('Audio play failed:', e));
        }});
        
        document.querySelector('a-marker').addEventListener('markerLost', function() {{
            console.log('Yantra marker lost');
            // Pause ambient sound
            document.getElementById('ambient-sound').pause();
        }});
        
        // Geolocation for enhanced accuracy
        if (navigator.geolocation) {{
            navigator.geolocation.getCurrentPosition(function(position) {{
                console.log('User location:', position.coords.latitude, position.coords.longitude);
                // Could adjust solar animation based on real location
            }});
        }}
        
        // Device orientation for enhanced tracking
        if (window.DeviceOrientationEvent) {{
            window.addEventListener('deviceorientation', function(event) {{
                // Could use for compass-based yantra alignment
                const compass = event.alpha; // 0-360 degrees
                // Update yantra orientation based on device compass
            }});
        }}
    </script>
</body>
</html>
        """
        
        return html
    
    def create_dynamic_yantra_model(self, yantra_specs: Dict) -> Dict:
        """Create dynamic 3D model configuration based on yantra specifications"""
        
        yantra_type = yantra_specs['name'].lower().replace(' ', '_').split('_')[0] + '_yantra'
        dimensions = yantra_specs.get('dimensions', {})
        
        # Scale yantra to fit in AR view (typically 0.1x actual size)
        ar_scale = 0.1
        
        return {
            'model_url': f'models/{yantra_type}.gltf',
            'scale': f'{ar_scale} {ar_scale} {ar_scale}',
            'position': '0 0 0',
            'rotation': '0 0 0',
            'dimensions': dimensions
        }
    
    def create_solar_animation(self, user_location: Dict) -> Dict:
        """Create solar animation based on user's geographical location"""
        
        latitude = user_location.get('latitude', 0)
        
        # Adjust animation based on latitude
        if abs(latitude) > 60:
            duration = 30000  # Slower at polar regions
            description = "Polar region solar motion"
        elif abs(latitude) < 23.5:
            duration = 20000  # Faster near equator
            description = "Tropical solar motion"
        else:
            duration = 24000  # Standard temperate zone
            description = "Temperate zone solar motion"
        
        # Current approximate solar declination (simplified)
        import datetime
        day_of_year = datetime.datetime.now().timetuple().tm_yday
        declination = 23.45 * np.sin(np.radians(360 * (284 + day_of_year) / 365))
        
        return {
            'duration': duration,
            'declination': declination,
            'description': description
        }
    
    def generate_yantra_specific_elements(self, yantra_specs: Dict) -> str:
        """Generate yantra-specific AR elements"""
        
        yantra_name = yantra_specs['name'].lower()
        
        if 'samrat' in yantra_name:
            return self.generate_samrat_ar_elements(yantra_specs)
        elif 'rama' in yantra_name:
            return self.generate_rama_ar_elements(yantra_specs)
        elif 'jai_prakash' in yantra_name:
            return self.generate_jai_prakash_ar_elements(yantra_specs)
        else:
            return ""
    
    def generate_samrat_ar_elements(self, specs: Dict) -> str:
        """Generate Samrat Yantra specific AR elements"""
        
        dimensions = specs.get('dimensions', {})
        angles = specs.get('angles', {})
        
        return f"""
            <!-- Gnomon -->
            <a-box
                position="0 {dimensions.get('gnomon_height', 1) * 0.05} 0"
                width="0.05"
                height="{dimensions.get('gnomon_height', 1) * 0.1}"
                depth="0.02"
                color="#1976d2"
                rotation="0 0 {-angles.get('gnomon_angle', 0)}"
                material="metalness: 0.8; roughness: 0.2"
            ></a-box>
            
            <!-- Shadow indicator -->
            <a-box
                id="shadow-indicator"
                position="0 0.001 0"
                width="0.02"
                height="0.005"
                depth="2"
                color="#333333"
                opacity="0.6"
                shadow-calculator="gnomonHeight: {dimensions.get('gnomon_height', 1)}; sunElevation: 45"
            ></a-box>
            
            <!-- Time markers -->
            <a-text value="12:00" position="0 0.1 1" align="center" color="white" scale="0.3 0.3 0.3"></a-text>
            <a-text value="06:00" position="-1 0.1 0" align="center" color="white" scale="0.3 0.3 0.3"></a-text>
            <a-text value="18:00" position="1 0.1 0" align="center" color="white" scale="0.3 0.3 0.3"></a-text>
        """
    
    def generate_rama_ar_elements(self, specs: Dict) -> str:
        """Generate Rama Yantra specific AR elements"""
        
        dimensions = specs.get('dimensions', {})
        
        return f"""
            <!-- Central pillar -->
            <a-cylinder
                position="0 {dimensions.get('wall_height', 2) * 0.05} 0"
                radius="{dimensions.get('central_pillar_radius', 0.2) * 0.1}"
                height="{dimensions.get('wall_height', 2) * 0.1}"
                color="#1976d2"
                material="metalness: 0.8; roughness: 0.2"
            ></a-cylinder>
            
            <!-- Altitude markers -->
            <a-text value="0°" position="0 0.05 {dimensions.get('inner_radius', 1) * 0.1}" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
            <a-text value="45°" position="0 0.3 {dimensions.get('inner_radius', 1) * 0.07}" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
            <a-text value="90°" position="0 0.5 0" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
        """
    
    def generate_jai_prakash_ar_elements(self, specs: Dict) -> str:
        """Generate Jai Prakash Yantra specific AR elements"""
        
        dimensions = specs.get('dimensions', {})
        
        return f"""
            <!-- Celestial equator -->
            <a-torus
                position="0 0 0"
                radius-outer="{dimensions.get('hemisphere_radius', 4) * 0.07}"
                radius-tubular="0.01"
                color="#42a5f5"
                rotation="90 0 0"
                opacity="0.7"
            ></a-torus>
            
            <!-- Declination circles -->
            <a-torus
                position="0 {dimensions.get('hemisphere_radius', 4) * 0.02} 0"
                radius-outer="{dimensions.get('hemisphere_radius', 4) * 0.05}"
                radius-tubular="0.005"
                color="#66bb6a"
                rotation="90 0 0"
                opacity="0.5"
            ></a-torus>
            
            <!-- Hour markings -->
            <a-text value="6h" position="{dimensions.get('hemisphere_radius', 4) * 0.06} 0.05 0" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
            <a-text value="12h" position="0 0.05 {dimensions.get('hemisphere_radius', 4) * 0.06}" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
            <a-text value="18h" position="{-dimensions.get('hemisphere_radius', 4) * 0.06} 0.05 0" align="center" color="white" scale="0.2 0.2 0.2"></a-text>
        """
    
    def generate_ar_markers(self, yantra_type: str) -> bytes:
        """Generate custom AR marker patterns"""
        
        # This would generate actual .patt files for AR.js
        # For now, return a placeholder pattern
        
        pattern_data = f"""# YANTRA.AI AR Marker - {yantra_type}
# Generated marker pattern for {yantra_type}
255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255
255   0   0   0   0   0   0   0   0   0   0   0   0   0   0 255
255   0 255 255 255 255 255 255 255 255 255 255 255 255   0 255
255   0 255   0   0   0   0   0   0   0   0   0   0 255   0 255
255   0 255   0 255 255 255 255 255 255 255 255   0 255   0 255
255   0 255   0 255   0   0   0   0   0   0 255   0 255   0 255
255   0 255   0 255   0 255 255 255 255   0 255   0 255   0 255
255   0 255   0 255   0 255   0   0 255   0 255   0 255   0 255
255   0 255   0 255   0 255   0   0 255   0 255   0 255   0 255
255   0 255   0 255   0 255 255 255 255   0 255   0 255   0 255
255   0 255   0 255   0   0   0   0   0   0 255   0 255   0 255
255   0 255   0 255 255 255 255 255 255 255 255   0 255   0 255
255   0 255   0   0   0   0   0   0   0   0   0   0 255   0 255
255   0 255 255 255 255 255 255 255 255 255 255 255 255   0 255
255   0   0   0   0   0   0   0   0   0   0   0   0   0   0 255
255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255
"""
        
        return pattern_data.encode('utf-8')
    
    def create_ar_experience_config(self, yantra_specs: Dict, 
                                   user_preferences: Dict) -> Dict:
        """Create complete AR experience configuration"""
        
        return {
            'experience_id': f"yantra_ar_{yantra_specs['name'].replace(' ', '_').lower()}",
            'yantra_specs': yantra_specs,
            'ar_settings': {
                'detection_mode': 'mono_and_matrix',
                'matrix_code_type': '3x3',
                'camera_parameters': 'default',
                'smooth_tracking': True,
                'smooth_count': 10,
                'smooth_tolerance': 0.01
            },
            'visual_settings': {
                'show_coordinate_grid': user_preferences.get('show_grid', True),
                'show_celestial_sphere': user_preferences.get('show_sphere', False),
                'solar_animation_speed': user_preferences.get('animation_speed', 1.0),
                'info_panel_visible': user_preferences.get('show_info', True)
            },
            'audio_settings': {
                'ambient_sound': user_preferences.get('ambient_sound', True),
                'narration': user_preferences.get('narration', False),
                'sound_effects': user_preferences.get('sound_effects', True)
            },
            'interaction_settings': {
                'touch_interactions': True,
                'voice_commands': user_preferences.get('voice_commands', False),
                'gesture_recognition': user_preferences.get('gestures', False)
            }
        }

# React component integration helpers
def create_ar_component_config():
    """Create configuration for React AR component integration"""
    
    return {
        'component_name': 'VirtualJantarMantarAR',
        'props': {
            'yantraSpecs': 'object',
            'userLocation': 'object', 
            'arSettings': 'object',
            'onMarkerFound': 'function',
            'onMarkerLost': 'function',
            'onInteraction': 'function'
        },
        'events': [
            'markerFound',
            'markerLost', 
            'yantraInteraction',
            'solarAnimationToggle',
            'infoToggle'
        ]
    }

# Example usage
if __name__ == "__main__":
    ar_system = VirtualJantarMantarAR()
    
    # Sample yantra specifications
    sample_specs = {
        'name': 'Samrat Yantra (Great Sundial)',
        'coordinates': {'latitude': 28.6139, 'longitude': 77.2090, 'elevation': 216},
        'dimensions': {
            'base_length': 10.0,
            'base_width': 8.0,
            'gnomon_height': 5.45,
            'gnomon_thickness': 0.3
        },
        'angles': {
            'gnomon_angle': 28.6139,
            'base_orientation': 0
        },
        'accuracy_metrics': {
            'time_accuracy_minutes': 2.0
        }
    }
    
    # Sample user location
    user_location = {
        'latitude': 28.6139,
        'longitude': 77.2090,
        'elevation': 216
    }
    
    # Generate AR scene
    ar_html = ar_system.generate_ar_scene(sample_specs, user_location)
    
    # Save AR experience
    with open('virtual_jantar_mantar_ar.html', 'w', encoding='utf-8') as f:
        f.write(ar_html)
    
    print("Virtual Jantar Mantar AR experience generated!")
    print("Open 'virtual_jantar_mantar_ar.html' on a mobile device with camera to experience.")
    print("🌌 YANTRA.AI - Where Ancient Astronomy Meets Augmented Reality!")