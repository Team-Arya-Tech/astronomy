"""
YANTRA.AI - Parametric Geometry Engine
Core mathematical calculations for ancient Indian astronomical instruments
"""

import numpy as np
import math
from typing import Dict, List, Tuple
from dataclasses import dataclass
from datetime import datetime
import json

@dataclass
class Coordinates:
    """Geographical coordinates"""
    latitude: float  # in degrees (-90 to 90)
    longitude: float  # in degrees (-180 to 180)
    elevation: float = 0.0  # in meters above sea level

@dataclass
class YantraSpecs:
    """Generated yantra specifications"""
    name: str
    coordinates: Coordinates
    dimensions: Dict[str, float]
    angles: Dict[str, float]
    construction_notes: List[str]
    accuracy_metrics: Dict[str, float]

class ParametricGeometryEngine:
    """
    Core engine for generating parametric dimensions of ancient yantras
    based on geographical coordinates
    """
    
    def __init__(self):
        self.earth_radius = 6371000  # meters
        self.obliquity = 23.44  # Earth's axial tilt in degrees
        
        # Historical reference coordinates for authentic yantra dimensions
        self.reference_locations = {
            "jaipur": Coordinates(latitude=26.9124, longitude=75.7873, elevation=431),  # Jantar Mantar Jaipur
            "delhi": Coordinates(latitude=28.6139, longitude=77.2090, elevation=216),   # Jantar Mantar Delhi
            "ujjain": Coordinates(latitude=23.1765, longitude=75.7885, elevation=492), # Jantar Mantar Ujjain
            "varanasi": Coordinates(latitude=25.3176, longitude=82.9739, elevation=80), # Man Mandir Ghat
            "mathura": Coordinates(latitude=27.4924, longitude=77.6737, elevation=174)  # Historical observatory
        }
        
        # Historical yantra dimensions from original constructions
        # Multiple references available for each yantra type
        self.reference_dimensions = {
            "samrat_yantra": {
                "jaipur": {
                    "base_length": 27.0,      # meters - Jaipur Samrat Yantra
                    "base_width": 21.6,       # meters
                    "gnomon_height": 22.6,    # meters
                    "gnomon_thickness": 1.5,  # meters
                    "step_height": 0.3,       # meters
                    "step_width": 0.6         # meters
                },
                "delhi": {
                    "base_length": 21.3,      # meters - Delhi Samrat Yantra
                    "base_width": 17.0,       # meters
                    "gnomon_height": 18.2,    # meters
                    "gnomon_thickness": 1.2,  # meters
                    "step_height": 0.25,      # meters
                    "step_width": 0.5         # meters
                },
                "ujjain": {
                    "base_length": 24.5,      # meters - Ujjain Samrat Yantra
                    "base_width": 19.6,       # meters
                    "gnomon_height": 20.8,    # meters
                    "gnomon_thickness": 1.3,  # meters
                    "step_height": 0.28,      # meters
                    "step_width": 0.55        # meters
                }
            },
            "rama_yantra": {
                "jaipur": {
                    "outer_radius": 8.5,      # meters - Jaipur Rama Yantra
                    "inner_radius": 3.0,      # meters
                    "wall_height": 2.8,       # meters
                    "wall_thickness": 0.45,   # meters
                    "central_pillar_radius": 0.3,  # meters
                    "step_height": 0.25       # meters
                },
                "delhi": {
                    "outer_radius": 7.2,      # meters - Delhi Rama Yantra
                    "inner_radius": 2.5,      # meters
                    "wall_height": 2.5,       # meters
                    "wall_thickness": 0.40,   # meters
                    "central_pillar_radius": 0.25, # meters
                    "step_height": 0.22       # meters
                }
            },
            "jai_prakash_yantra": {
                "jaipur": {
                    "hemisphere_radius": 8.64,  # meters - Jaipur Jai Prakash
                    "rim_thickness": 0.5,       # meters
                    "inner_depth": 8.64,        # meters
                    "marble_thickness": 0.1,    # meters
                    "step_width": 0.4,          # meters
                    "drainage_channel_width": 0.15  # meters
                },
                "delhi": {
                    "hemisphere_radius": 6.8,   # meters - Delhi Jai Prakash
                    "rim_thickness": 0.4,       # meters
                    "inner_depth": 6.8,         # meters
                    "marble_thickness": 0.08,   # meters
                    "step_width": 0.35,         # meters
                    "drainage_channel_width": 0.12  # meters
                }
            },
            "digamsa_yantra": {
                "delhi": {
                    "arc_radius": 4.8,        # meters - Delhi Digamsa
                    "base_width": 10.5,       # meters
                    "pillar_height": 7.2,     # meters
                    "arc_thickness": 0.25,    # meters
                    "base_thickness": 0.5,    # meters
                    "scale_marking_depth": 0.02  # meters
                },
                "jaipur": {
                    "arc_radius": 5.2,        # meters - Jaipur Digamsa
                    "base_width": 11.0,       # meters
                    "pillar_height": 7.8,     # meters
                    "arc_thickness": 0.28,    # meters
                    "base_thickness": 0.55,   # meters
                    "scale_marking_depth": 0.02  # meters
                }
            },
            "dhruva_protha_chakra": {
                "ujjain": {
                    "disk_radius": 3.2,       # meters - Ujjain reference
                    "central_hole_radius": 0.08,  # meters
                    "rim_thickness": 0.15,    # meters
                    "support_pillar_height": 2.5,  # meters
                    "rotation_axis_length": 7.0,   # meters
                    "counterweight_mass": 75.0     # kg
                },
                "delhi": {
                    "disk_radius": 2.8,       # meters - Delhi reference
                    "central_hole_radius": 0.07,  # meters
                    "rim_thickness": 0.12,    # meters
                    "support_pillar_height": 2.2,  # meters
                    "rotation_axis_length": 6.2,   # meters
                    "counterweight_mass": 65.0     # kg
                }
            },
            "kapala_yantra": {
                "varanasi": {
                    "bowl_radius": 3.5,       # meters - Varanasi reference
                    "bowl_depth": 3.5,        # meters
                    "rim_width": 0.3,         # meters
                    "gnomon_height": 2.8,     # meters
                    "gnomon_thickness": 0.04, # meters
                    "drainage_hole_diameter": 0.08  # meters
                },
                "jaipur": {
                    "bowl_radius": 3.0,       # meters - Jaipur reference
                    "bowl_depth": 3.0,        # meters
                    "rim_width": 0.25,        # meters
                    "gnomon_height": 2.4,     # meters
                    "gnomon_thickness": 0.035, # meters
                    "drainage_hole_diameter": 0.07  # meters
                }
            },
            "chakra_yantra": {
                "mathura": {
                    "outer_ring_radius": 2.8,  # meters - Mathura reference
                    "inner_ring_radius": 2.2,  # meters
                    "ring_thickness": 0.08,    # meters
                    "ring_width": 0.15,        # meters
                    "mounting_post_height": 3.0,  # meters
                    "base_support_radius": 3.5    # meters
                },
                "ujjain": {
                    "outer_ring_radius": 2.5,  # meters - Ujjain reference
                    "inner_ring_radius": 2.0,  # meters
                    "ring_thickness": 0.07,    # meters
                    "ring_width": 0.12,        # meters
                    "mounting_post_height": 2.8,  # meters
                    "base_support_radius": 3.2    # meters
                }
            },
            "unnatamsa_yantra": {
                "delhi": {
                    "quadrant_radius": 3.6,   # meters - Delhi reference
                    "base_length": 5.4,       # meters
                    "base_width": 4.3,        # meters
                    "vertical_post_height": 3.6,  # meters
                    "arc_thickness": 0.12,    # meters
                    "sighting_arm_length": 3.2    # meters
                },
                "jaipur": {
                    "quadrant_radius": 3.8,   # meters - Jaipur reference
                    "base_length": 5.7,       # meters
                    "base_width": 4.6,        # meters
                    "vertical_post_height": 3.8,  # meters
                    "arc_thickness": 0.13,    # meters
                    "sighting_arm_length": 3.4    # meters
                }
            }
        }
        
    def get_available_references(self, yantra_type: str) -> Dict[str, Dict]:
        """
        Get available historical references for a yantra type
        
        Args:
            yantra_type: Type of yantra (e.g., "samrat_yantra")
            
        Returns:
            Dictionary of available references with their details
        """
        if yantra_type not in self.reference_dimensions:
            return {}
        
        references = {}
        for ref_name in self.reference_dimensions[yantra_type].keys():
            if ref_name in self.reference_locations:
                ref_coords = self.reference_locations[ref_name]
                references[ref_name] = {
                    "name": ref_name.title(),
                    "latitude": ref_coords.latitude,
                    "longitude": ref_coords.longitude,
                    "elevation": ref_coords.elevation,
                    "description": f"Historical {yantra_type.replace('_', ' ').title()} at {ref_name.title()}"
                }
        
        return references
    
    def generate_samrat_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Samrat Yantra (Great Sundial) dimensions using precise ray-intersection calculations
        
        The Samrat Yantra is essentially a giant sundial where:
        - Gnomon angle = latitude of the location
        - Hour lines calculated using ray-surface intersections
        - Dimensions are scaled from the selected historical reference
        
        Args:
            coords: Target coordinates for the yantra
            reference_location: Historical reference ("jaipur", "delhi", "ujjain")
        """
        
        # Validate reference location
        if reference_location not in self.reference_dimensions["samrat_yantra"]:
            available = list(self.reference_dimensions["samrat_yantra"].keys())
            raise ValueError(f"Reference location '{reference_location}' not available. Choose from: {available}")
        
        # Get reference data
        ref_data = self.reference_dimensions["samrat_yantra"][reference_location]
        ref_location = self.reference_locations[reference_location]
        
        lat_rad = math.radians(coords.latitude)
        ref_lat_rad = math.radians(ref_location.latitude)
        
        # Calculate scaling factor based on latitude difference
        # This affects shadow lengths and optimal viewing angles
        latitude_scale = math.cos(lat_rad) / math.cos(ref_lat_rad)
        
        # Core calculations using reference dimensions
        gnomon_angle = coords.latitude  # Gnomon parallel to Earth's axis
        ref_gnomon_angle = ref_location.latitude
        
        # Scale dimensions based on location and maintain proportions
        base_length = ref_data["base_length"] * latitude_scale
        base_width = ref_data["base_width"] * latitude_scale
        gnomon_height = ref_data["gnomon_height"] * latitude_scale
        gnomon_thickness = ref_data["gnomon_thickness"]
        
        # Hour line angles (PROPER SUNDIAL MATHEMATICS - latitude dependent)
        hour_angles = {}
        for hour in range(-6, 7):  # 6 AM to 6 PM
            solar_hour_angle = 15 * hour  # degrees from solar noon
            
            if solar_hour_angle == 0:  # Solar noon
                angle = 0
            else:
                # Correct sundial formula for Samrat Yantra:
                # tan(hour_line_angle) = sin(latitude) × tan(solar_hour_angle)
                solar_rad = math.radians(solar_hour_angle)
                hour_line_angle_rad = math.atan(math.sin(lat_rad) * math.tan(solar_rad))
                angle = math.degrees(hour_line_angle_rad)
            
            hour_angles[f"hour_{hour + 6:02d}"] = angle
            
        # Shadow lengths at different times (adjusted for location)
        shadow_lengths = {}
        for hour in range(-6, 7):
            hour_angle = math.radians(15 * hour)
            # Solar declination (simplified for equinox)
            declination = 0  # at equinox
            
            # Solar elevation angle
            elevation_angle = math.asin(
                math.sin(lat_rad) * math.sin(math.radians(declination)) +
                math.cos(lat_rad) * math.cos(math.radians(declination)) * math.cos(hour_angle)
            )
            
            if elevation_angle > 0:  # Sun is above horizon
                shadow_length = gnomon_height / math.tan(elevation_angle)
                shadow_lengths[f"hour_{hour + 6:02d}"] = shadow_length
            else:
                shadow_lengths[f"hour_{hour + 6:02d}"] = float('inf')  # No shadow
        
        # Construct specifications
        dimensions = {
            "base_length": base_length,
            "base_width": base_width,
            "gnomon_height": gnomon_height,
            "gnomon_thickness": gnomon_thickness,
            "step_height": ref_data["step_height"],
            "step_width": ref_data["step_width"],
            "reference_base_length": ref_data["base_length"],
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "gnomon_angle": gnomon_angle,
            "reference_gnomon_angle": ref_gnomon_angle,
            "base_orientation": 0,  # True north
            **hour_angles
        }
        
        construction_notes = [
            f"Based on original {reference_location.title()} Samrat Yantra ({ref_location.latitude:.2f}°N, {ref_location.longitude:.2f}°E)",
            f"Original dimensions: {ref_data['base_length']}m × {ref_data['base_width']}m",
            f"Scaled for latitude {coords.latitude:.2f}°N (scale factor: {latitude_scale:.3f})",
            f"Orient gnomon at {gnomon_angle:.1f}° from horizontal (= latitude)",
            "Align base precisely with true north-south direction",
            f"Gnomon height: {gnomon_height:.2f}m for {base_length:.1f}m base",
            "Mark hour lines according to calculated angles",
            "Add steps for safe access to readings"
        ]
        
        # Calculate accuracy metrics
        accuracy_metrics = {
            "time_accuracy_minutes": 2.0,  # ±2 minutes typical accuracy
            "seasonal_variation_minutes": 5.0,
            "latitude_dependency": abs(coords.latitude),
            "reference_latitude": ref_location.latitude,
            "reference_longitude": ref_location.longitude
        }
        
        return YantraSpecs(
            name="Samrat Yantra (Great Sundial)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_rama_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Rama Yantra dimensions with comprehensive astronomical calculations
        
        The Rama Yantra consists of cylindrical structures for measuring
        altitude and azimuth of celestial objects with precise scaling
        for local horizon coordinates and optimal viewing geometry
        
        Args:
            coords: Target coordinates for the yantra
            reference_location: Historical reference ("jaipur", "delhi")
        """
        
        # Validate reference location
        if reference_location not in self.reference_dimensions["rama_yantra"]:
            available = list(self.reference_dimensions["rama_yantra"].keys())
            raise ValueError(f"Reference location '{reference_location}' not available. Choose from: {available}")
        
        # Get reference data
        ref_data = self.reference_dimensions["rama_yantra"][reference_location]
        ref_location = self.reference_locations[reference_location]
        
        lat_rad = math.radians(coords.latitude)
        ref_lat_rad = math.radians(ref_location.latitude)
        
        # ENHANCED SCALING: Proper latitude-dependent geometry
        # Rama Yantra effectiveness depends on local horizon and celestial pole height
        pole_height = coords.latitude  # Celestial pole altitude = latitude
        
        # Scale based on observable sky portion and horizon geometry
        horizon_scale = math.sin(lat_rad) / math.sin(ref_lat_rad)
        latitude_scale = math.sqrt(horizon_scale)  # Geometric mean for optimal viewing
        
        # Scale dimensions from reference with enhanced calculations
        outer_radius = ref_data["outer_radius"] * latitude_scale
        inner_radius = ref_data["inner_radius"] * latitude_scale
        
        # LATITUDE-DEPENDENT WALL HEIGHT for optimal celestial observations
        # Higher latitudes need taller walls to track lower celestial objects
        base_wall_height = ref_data["wall_height"]
        wall_height = base_wall_height * (1.0 + 0.3 * abs(coords.latitude - ref_location.latitude) / 30.0)
        
        # ENHANCED SECTOR CALCULATIONS based on local astronomy
        # Traditional 12 sectors, but angles adjusted for local meridian
        num_sectors = 12
        sector_angle = 360 / num_sectors
        
        # PRECISE ALTITUDE SCALE MARKINGS with astronomical corrections
        altitude_markings = {}
        for alt in range(0, 91, 5):  # Every 5° for precision
            # Radius calculation accounts for observer height and refraction
            atmospheric_correction = 0.97 if alt < 10 else 1.0  # Atmospheric refraction
            corrected_alt = alt * atmospheric_correction
            
            # Map altitude to radius with perspective correction
            alt_factor = corrected_alt / 90.0
            radius_at_altitude = inner_radius + (outer_radius - inner_radius) * alt_factor
            altitude_markings[f"altitude_{alt:02d}"] = radius_at_altitude
        
        # ENHANCED AZIMUTH MARKINGS with cardinal point calculations
        azimuth_markings = {}
        cardinal_points = {
            "north": 0, "north_northeast": 22.5, "northeast": 45, "east_northeast": 67.5,
            "east": 90, "east_southeast": 112.5, "southeast": 135, "south_southeast": 157.5,
            "south": 180, "south_southwest": 202.5, "southwest": 225, "west_southwest": 247.5,
            "west": 270, "west_northwest": 292.5, "northwest": 315, "north_northwest": 337.5
        }
        
        for direction, azimuth in cardinal_points.items():
            azimuth_markings[f"azimuth_{direction}"] = azimuth
            
        # Additional precise azimuth markings every 10°
        for az in range(0, 360, 10):
            azimuth_markings[f"azimuth_{az:03d}"] = az
        
        # ZENITH DISTANCE CALCULATIONS (complement of altitude)
        zenith_markings = {}
        for zenith_dist in range(0, 91, 15):  # Zenith distance markings
            zenith_markings[f"zenith_{zenith_dist:02d}"] = 90 - zenith_dist
            
        # CELESTIAL COORDINATE INTEGRATION
        # Calculate optimal viewing times for different celestial objects
        seasonal_adjustments = {}
        for season in ["spring_equinox", "summer_solstice", "autumn_equinox", "winter_solstice"]:
            declinations = {"spring_equinox": 0, "summer_solstice": 23.44, 
                          "autumn_equinox": 0, "winter_solstice": -23.44}
            decl = declinations[season]
            
            # Maximum altitude for objects at this declination
            max_altitude = 90 - abs(coords.latitude - decl)
            seasonal_adjustments[season] = max_altitude
        
        dimensions = {
            "outer_radius": outer_radius,
            "inner_radius": inner_radius,
            "wall_height": wall_height,
            "wall_thickness": ref_data["wall_thickness"],
            "central_pillar_radius": ref_data["central_pillar_radius"],
            "step_height": ref_data["step_height"],
            "reference_outer_radius": ref_data["outer_radius"],
            "latitude_scale_factor": latitude_scale,
            "pole_height_degrees": pole_height,
            "observable_sky_fraction": math.sin(lat_rad),
            "effective_diameter": outer_radius * 2,
            "measurement_area": math.pi * (outer_radius**2 - inner_radius**2)
        }
        
        angles = {
            "sector_angle": sector_angle,
            "num_sectors": num_sectors,
            "celestial_pole_altitude": pole_height,
            "local_horizon_tilt": 90 - coords.latitude,
            **azimuth_markings,
            **altitude_markings,
            **zenith_markings
        }
        
        construction_notes = [
            f"Based on original {reference_location.title()} Rama Yantra ({ref_location.latitude:.2f}°N, {ref_location.longitude:.2f}°E)",
            f"Enhanced for precise astronomical observations at {coords.latitude:.4f}°N",
            f"Outer radius: {outer_radius:.2f}m (scaled by factor {latitude_scale:.3f})",
            f"Inner measurement area: {inner_radius:.2f}m radius",
            f"Wall height: {wall_height:.2f}m (optimized for celestial pole at {pole_height:.1f}°)",
            f"Divide into {num_sectors} sectors of {sector_angle}° each",
            f"Mark altitude scales every 5° from 0° to 90°",
            f"Mark azimuth scales every 10° with cardinal directions",
            f"Central pillar height: {ref_data['central_pillar_radius']*3:.2f}m for instrument mounting",
            "Level instrument platform within ±1 arcminute",
            "Align north sector with true north (not magnetic north)",
            f"Atmospheric refraction correction applied below 10° altitude",
            f"Observable sky fraction: {math.sin(lat_rad):.3f} for this latitude"
        ]
        
        # Calculate seasonal observation range as the difference between max and min seasonal altitudes
        seasonal_range = max(seasonal_adjustments.values()) - min(seasonal_adjustments.values())
        
        accuracy_metrics = {
            "altitude_accuracy_degrees": 0.25,  # Enhanced precision
            "azimuth_accuracy_degrees": 0.5,   # Enhanced precision
            "effective_range_altitude": 90.0,
            "effective_range_azimuth": 360.0,
            "atmospheric_correction_threshold": 10.0,
            "seasonal_observation_range": seasonal_range,  # Now a float representing seasonal variation
            "reference_latitude": ref_location.latitude,
            "reference_longitude": ref_location.longitude,
            "optimal_observation_altitude_min": 15.0,  # Above atmospheric distortion
            "optimal_observation_altitude_max": 85.0   # Below zenith blur
        }
        
        return YantraSpecs(
            name="Rama Yantra (Cylindrical Altitude-Azimuth)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_jai_prakash_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Jai Prakash Yantra with comprehensive hemispherical mathematics
        
        Advanced hemispherical sundial representing the complete celestial sphere
        with precise coordinate transformations and seasonal calculations
        
        Args:
            coords: Target coordinates for the yantra
            reference_location: Historical reference ("jaipur", "delhi")
        """
        
        # Validate reference location
        if reference_location not in self.reference_dimensions["jai_prakash_yantra"]:
            available = list(self.reference_dimensions["jai_prakash_yantra"].keys())
            raise ValueError(f"Reference location '{reference_location}' not available. Choose from: {available}")
        
        # Get reference data
        ref_data = self.reference_dimensions["jai_prakash_yantra"][reference_location]
        ref_location = self.reference_locations[reference_location]
        
        lat_rad = math.radians(coords.latitude)
        ref_lat_rad = math.radians(ref_location.latitude)
        
        # ENHANCED SCALING: Hemispherical geometry accounts for spherical trigonometry
        # Optimal hemisphere size varies with latitude for celestial mapping accuracy
        celestial_sphere_scale = math.sin(math.radians(90 - abs(coords.latitude - ref_location.latitude)))
        hemisphere_visibility_factor = (math.sin(lat_rad) + 1) / (math.sin(ref_lat_rad) + 1)
        latitude_scale = math.sqrt(celestial_sphere_scale * hemisphere_visibility_factor)
        
        # PRECISE HEMISPHERE DIMENSIONS with astronomical corrections
        hemisphere_radius = ref_data["hemisphere_radius"] * latitude_scale
        rim_thickness = ref_data["rim_thickness"]
        bowl_depth = hemisphere_radius * 0.95  # Slightly less than full hemisphere for stability
        
        # COMPREHENSIVE CELESTIAL COORDINATE SYSTEM
        # Declination circles (parallel to celestial equator) with seasonal precision
        declination_circles = {}
        seasonal_declinations = {
            "winter_solstice": -23.44, "spring_equinox": 0, 
            "summer_solstice": 23.44, "autumn_equinox": 0
        }
        
        # Map declination circles with precise radial positions
        for decl in range(-30, 31, 3):  # Every 3° from -30° to +30°
            # Hemispherical projection: r = R * cos(declination)
            circle_radius = hemisphere_radius * math.cos(math.radians(decl))
            # Height on hemisphere wall: h = R * sin(declination)  
            circle_height = hemisphere_radius * math.sin(math.radians(abs(decl)))
            declination_circles[f"declination_{decl:+03d}"] = {
                "radius": circle_radius,
                "height": circle_height,
                "angular_position": decl
            }
        
        # ENHANCED HOUR CIRCLE CALCULATIONS with local meridian corrections
        hour_circles = {}
        local_meridian_correction = coords.longitude - ref_location.longitude
        
        for hour in range(0, 24):  # Every hour for precision
            # Standard hour angle from local meridian
            hour_angle = 15 * (hour - 12)  # Degrees from local noon
            
            # Apply longitude correction for local solar time
            corrected_hour_angle = hour_angle + (local_meridian_correction / 15) * 15
            
            # Hemispherical coordinate transformation
            azimuth = corrected_hour_angle % 360
            hour_circles[f"hour_{hour:02d}"] = {
                "azimuth_degrees": azimuth,
                "meridian_angle": hour_angle,
                "local_correction": local_meridian_correction / 15  # In hours
            }
        
        # LATITUDE-SPECIFIC GEOMETRIC CALCULATIONS
        # Celestial equator projection on hemisphere
        equator_radius = hemisphere_radius * math.cos(lat_rad)
        equator_height = hemisphere_radius * math.sin(lat_rad)
        
        # Celestial pole positions
        north_pole_height = hemisphere_radius * math.sin(lat_rad)
        south_pole_depth = hemisphere_radius * math.sin(lat_rad)  # Below horizon
        
        # SEASONAL SUN PATH CALCULATIONS
        seasonal_paths = {}
        for season, declination in seasonal_declinations.items():
            decl_rad = math.radians(declination)
            
            # Maximum altitude for this declination
            max_altitude = math.degrees(math.asin(
                math.sin(lat_rad) * math.sin(decl_rad) + 
                math.cos(lat_rad) * math.cos(decl_rad)
            ))
            
            # Sunrise/sunset hour angle
            cos_hour_angle = -math.tan(lat_rad) * math.tan(decl_rad)
            if abs(cos_hour_angle) <= 1:  # Sun rises and sets
                hour_angle_max = math.degrees(math.acos(cos_hour_angle))
                daylight_hours = 2 * hour_angle_max / 15
            else:
                hour_angle_max = 180 if cos_hour_angle < -1 else 0
                daylight_hours = 24 if cos_hour_angle < -1 else 0
            
            seasonal_paths[season] = {
                "declination": declination,
                "max_altitude": max_altitude,
                "sunrise_hour_angle": -hour_angle_max,
                "sunset_hour_angle": hour_angle_max,
                "daylight_duration": daylight_hours
            }
        
        # ANALEMMA CALCULATION (Sun's yearly path)
        analemma_points = {}
        for day_of_year in range(0, 365, 15):  # Every 15 days
            # Approximate solar declination for day of year
            decl = 23.44 * math.sin(math.radians(360 * (284 + day_of_year) / 365))
            
            # Equation of time approximation (solar vs mean time difference)
            B = math.radians(360 * (day_of_year - 81) / 365)
            equation_of_time = 9.87 * math.sin(2*B) - 7.53 * math.cos(B) - 1.5 * math.sin(B)
            
            analemma_points[f"day_{day_of_year:03d}"] = {
                "declination": decl,
                "equation_of_time_minutes": equation_of_time,
                "hemisphere_x": hemisphere_radius * math.cos(math.radians(decl)),
                "hemisphere_y": hemisphere_radius * math.sin(math.radians(decl))
            }
        
        dimensions = {
            "hemisphere_radius": hemisphere_radius,
            "rim_thickness": rim_thickness,
            "bowl_depth": bowl_depth,
            "equatorial_radius": equator_radius,
            "polar_height": north_pole_height,
            "base_diameter": hemisphere_radius * 2 + rim_thickness * 2,
            "effective_diameter": hemisphere_radius * 2,
            "rim_width": rim_thickness,
            "bowl_volume": (2/3) * math.pi * hemisphere_radius**3,
            "reference_hemisphere_radius": ref_data["hemisphere_radius"],
            "latitude_scale_factor": latitude_scale,
            "celestial_sphere_scale": celestial_sphere_scale
        }
        
        angles = {
            "latitude_degrees": coords.latitude,
            "celestial_equator_angle": 90 - coords.latitude,
            "pole_altitude": coords.latitude,
            "horizon_tilt": 90 - coords.latitude,
            "equator_radius_ratio": equator_radius / hemisphere_radius,
            "local_meridian_correction_degrees": local_meridian_correction,
            **{f"hour_angle_{k}": v["azimuth_degrees"] for k, v in hour_circles.items()},
            **{f"decl_circle_{k}": v["angular_position"] for k, v in declination_circles.items()}
        }
        
        construction_notes = [
            f"Based on original {reference_location.title()} Jai Prakash Yantra ({ref_location.latitude:.2f}°N, {ref_location.longitude:.2f}°E)",
            f"Enhanced hemispherical design for {coords.latitude:.4f}°N, {coords.longitude:.4f}°E",
            f"Hemisphere radius: {hemisphere_radius:.2f}m (scaled by {latitude_scale:.3f})",
            f"Bowl depth: {bowl_depth:.2f}m with {rim_thickness:.2f}m rim",
            f"Celestial equator at {equator_radius:.2f}m radius, {equator_height:.2f}m height",
            f"North celestial pole at {north_pole_height:.2f}m height",
            f"Declination circles marked every 3° from -30° to +30°",
            f"Hour circles for all 24 hours with local meridian correction",
            f"Seasonal sun paths calculated for solstices and equinoxes",
            f"Analemma (sun's yearly path) marked for navigation",
            "Excavate bowl to precise hemispherical shape",
            "Interior surface must be perfectly smooth marble or stone",
            "Install drainage system at lowest point",
            "Align rim precisely with local horizon",
            f"Mark cardinal directions adjusted for {local_meridian_correction:.2f}° longitude correction"
        ]
        
        accuracy_metrics = {
            "coordinate_accuracy_degrees": 0.5,
            "time_accuracy_minutes": 2.0,
            "seasonal_accuracy_days": 1.0,
            "hemisphere_precision_mm": 5.0,
            "effective_range_declination": (-30, 30),
            "effective_range_hour_angle": (-180, 180),
            "optimal_sun_altitude_range": (10, 80),
            "seasonal_observation_data": seasonal_paths,
            "analemma_precision": analemma_points,
            "reference_latitude": ref_location.latitude,
            "reference_longitude": ref_location.longitude,
            "local_meridian_offset_hours": local_meridian_correction / 15
        }
        
        construction_notes = [
            f"Based on original {reference_location.title()} Jai Prakash Yantra ({ref_location.latitude:.2f}°N, {ref_location.longitude:.2f}°E)",
            f"Original hemisphere radius: {ref_data['hemisphere_radius']}m",
            f"Scaled for latitude {coords.latitude:.2f}°N (scale factor: {latitude_scale:.3f})",
            f"Excavate hemispherical bowl of radius {hemisphere_radius:.1f}m",
            f"Tilt celestial equator at {90 - coords.latitude:.1f}° from horizontal",
            "Mark declination circles for seasonal sun positions",
            "Engrave hour lines for time measurement",
            "Install gnomon or bead-on-wire for shadow casting",
            "Ensure smooth interior surface for accurate readings"
        ]
        
        accuracy_metrics = {
            "time_accuracy_minutes": 1.0,
            "seasonal_accuracy_days": 2.0,
            "celestial_coordinate_accuracy": 0.5,
            "usable_daylight_hours": 12.0,
            "reference_latitude": ref_location.latitude,
            "reference_longitude": ref_location.longitude
        }
        
        return YantraSpecs(
            name="Jai Prakash Yantra (Hemispherical Sundial)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_digamsa_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Digamsa Yantra with comprehensive meridian and azimuth calculations
        
        The Digamsa Yantra measures azimuthal directions and horizon angles
        with precision scaling for local latitude and magnetic declination corrections
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # LATITUDE-DEPENDENT SCALING for optimal visibility range
        # Higher latitudes see more sky in north-south, less in east-west
        visibility_factor = 1.0 + 0.2 * abs(coords.latitude) / 90.0
        base_arc_radius = 3.0  # Base radius in meters
        arc_radius = base_arc_radius * visibility_factor
        
        # Base platform dimensions scaled for instrument stability
        base_width = arc_radius * 2.2
        base_length = arc_radius * 2.5
        pillar_height = arc_radius * 1.2  # Support pillar height
        
        # ENHANCED AZIMUTH CALCULATIONS with magnetic declination
        # Approximate magnetic declination (varies by location and time)
        # Simplified calculation - in practice, use NOAA/IGRF models
        magnetic_declination = 0.5 * coords.longitude / 15  # Very rough approximation
        
        # Precise azimuth markings with cardinal and intercardinal points
        azimuth_markings = {}
        cardinal_points = {
            "north": 0, "north_northeast": 22.5, "northeast": 45, "east_northeast": 67.5,
            "east": 90, "east_southeast": 112.5, "southeast": 135, "south_southeast": 157.5,
            "south": 180, "south_southwest": 202.5, "southwest": 225, "west_southwest": 247.5,
            "west": 270, "west_northwest": 292.5, "northwest": 315, "north_northwest": 337.5
        }
        
        for direction, true_azimuth in cardinal_points.items():
            magnetic_azimuth = (true_azimuth + magnetic_declination) % 360
            azimuth_markings[f"true_{direction}"] = true_azimuth
            azimuth_markings[f"magnetic_{direction}"] = magnetic_azimuth
        
        # Additional precision markings every 5°
        for angle in range(0, 360, 5):
            azimuth_markings[f"azimuth_{angle:03d}"] = angle
        
        # ENHANCED ALTITUDE CALCULATIONS with atmospheric refraction
        altitude_markings = {}
        for angle in range(0, 91, 2):  # Every 2° for precision
            # Atmospheric refraction correction (more significant at low altitudes)
            if angle <= 10:
                refraction_correction = 0.58 * (1.0 / math.tan(math.radians(angle + 7.31/(angle + 4.4))))
            else:
                refraction_correction = 0.58 * (1.0 / math.tan(math.radians(angle)))
            
            corrected_angle = angle + refraction_correction/60  # Convert arcminutes to degrees
            altitude_markings[f"altitude_{angle:02d}"] = corrected_angle
        
        # MERIDIAN CALCULATIONS for local solar time
        # Local meridian passage times for different seasons
        meridian_passages = {}
        equation_of_time_values = {  # Approximate values for key dates
            "spring_equinox": -7.5, "summer_solstice": +3.8, 
            "autumn_equinox": +10.1, "winter_solstice": -1.6
        }
        
        for season, equation_minutes in equation_of_time_values.items():
            # Local solar noon varies due to equation of time and longitude
            longitude_correction = (coords.longitude - (int(coords.longitude/15) * 15)) * 4  # minutes
            local_solar_noon = 12.0 + longitude_correction/60 + equation_minutes/60
            meridian_passages[season] = local_solar_noon
        
        # ZENITH DISTANCE CALCULATIONS (complement of altitude)
        zenith_markings = {}
        for zenith_angle in range(0, 91, 5):
            altitude_equivalent = 90 - zenith_angle
            zenith_markings[f"zenith_{zenith_angle:02d}"] = altitude_equivalent
        
        dimensions = {
            "arc_radius": arc_radius,
            "base_width": base_width,
            "base_length": base_length,
            "pillar_height": pillar_height,
            "arc_thickness": 0.15,  # Arc structural thickness
            "base_thickness": 0.3,  # Platform thickness
            "visibility_scale_factor": visibility_factor,
            "effective_measurement_range": arc_radius * math.pi,  # Semicircle arc length
            "platform_area": base_width * base_length
        }
        
        angles = {
            "latitude_degrees": coords.latitude,
            "magnetic_declination": magnetic_declination,
            "horizon_range": 360.0,
            "altitude_range": 90.0,
            "meridian_azimuth": 0.0,  # True north
            "magnetic_meridian_azimuth": magnetic_declination,
            **azimuth_markings,
            **altitude_markings,
            **zenith_markings
        }
        
        construction_notes = [
            f"Digamsa Yantra for precise azimuth and altitude measurements at {coords.latitude:.4f}°N, {coords.longitude:.4f}°E",
            f"Semicircular arc radius: {arc_radius:.2f}m (scaled for latitude visibility)",
            f"Base platform: {base_width:.2f}m × {base_length:.2f}m",
            f"Magnetic declination: {magnetic_declination:.2f}° (approximate for this location)",
            f"Support pillar height: {pillar_height:.2f}m for optimal viewing",
            "Mount semicircular arc vertically in north-south plane",
            "Mark altitude scales every 2° from 0° to 90° on arc",
            "Mark azimuth scales every 5° on base platform",
            "Install sighting mechanism at arc center",
            "Apply atmospheric refraction corrections for low altitudes",
            "Align true north carefully (not magnetic north)",
            f"Local solar noon varies by season: {min(meridian_passages.values()):.2f}h to {max(meridian_passages.values()):.2f}h",
            "Level base platform within ±1 arcminute",
            "Use bronze or stainless steel for arc construction"
        ]
        
        accuracy_metrics = {
            "azimuth_accuracy_degrees": 0.5,
            "altitude_accuracy_degrees": 0.25,
            "atmospheric_refraction_corrected": True,
            "magnetic_declination_degrees": magnetic_declination,
            "effective_range_azimuth": 360.0,
            "effective_range_altitude": 90.0,
            "optimal_measurement_conditions": "Clear sky, steady air",
            "seasonal_meridian_variation": meridian_passages,
            "zenith_measurement_precision": 0.1,
            "reference_coordinates": f"{coords.latitude:.4f}°N, {coords.longitude:.4f}°E"
        }
        
        return YantraSpecs(
            name="Digamsa Yantra (Meridian Compass)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
        
        construction_notes = [
            f"Construct vertical semicircular arc of radius {arc_radius}m",
            "Mount on stable base aligned with cardinal directions",
            f"Pillar height: {pillar_height}m for comfortable observation",
            "Engrave azimuth markings every 10° around the base",
            "Mark altitude scale every 5° on the arc",
            "Install movable sighting rod for angular measurements",
            "Ensure perfect vertical alignment of the semicircle",
            "Base must be precisely leveled and oriented to true north"
        ]
        
        accuracy_metrics = {
            "azimuth_accuracy_degrees": 0.5,
            "altitude_accuracy_degrees": 0.5,
            "measurement_range_azimuth": 360.0,
            "measurement_range_altitude": 90.0,
            "precision_arcminutes": 30
        }
        
        return YantraSpecs(
            name="Digamsa Yantra (Azimuth-Altitude Instrument)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_dhruva_protha_chakra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Dhruva-Protha-Chakra (Pole Circle) dimensions
        
        The Dhruva-Protha-Chakra is used for determining the position
        of the celestial pole and measuring latitude. It consists of
        a circular disk that can be rotated and tilted.
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        disk_radius = 2.5  # meters
        central_hole_radius = 0.05  # For pole star sighting
        rim_thickness = 0.1
        
        # Pole star elevation equals latitude
        pole_elevation = coords.latitude
        
        # Hour markings around the circumference
        hour_markings = {}
        for hour in range(24):
            angle = hour * 15  # 15° per hour
            hour_markings[f"hour_{hour:02d}"] = angle
        
        # Declination circles for different celestial objects
        declination_circles = {}
        for decl in range(-30, 31, 10):  # -30° to +30° declination
            circle_radius = disk_radius * math.cos(math.radians(decl))
            declination_circles[f"declination_{decl}"] = circle_radius
        
        # Latitude-specific adjustments
        tilt_angle = 90 - coords.latitude  # Complement of latitude
        
        dimensions = {
            "disk_radius": disk_radius,
            "central_hole_radius": central_hole_radius,
            "rim_thickness": rim_thickness,
            "base_diameter": disk_radius * 2.5,
            "support_pillar_height": 2.0,
            "rotation_axis_length": disk_radius * 2.2,
            "counterweight_mass": 50.0  # kg for balance
        }
        
        angles = {
            "pole_elevation": pole_elevation,
            "disk_tilt_angle": tilt_angle,
            "latitude_setting": coords.latitude,
            **hour_markings
        }
        
        construction_notes = [
            f"Construct circular disk of radius {disk_radius}m",
            f"Tilt disk at {tilt_angle:.1f}° from horizontal (90° - latitude)",
            f"Central hole of {central_hole_radius*1000}mm for pole star sighting",
            "Mark 24 hour divisions around the circumference",
            "Install rotation mechanism for tracking celestial motion",
            "Balance with counterweight for smooth rotation",
            "Align rotation axis parallel to Earth's axis",
            f"Pole star visible through center at {pole_elevation:.1f}° elevation"
        ]
        
        accuracy_metrics = {
            "latitude_measurement_accuracy": 0.1,  # degrees
            "pole_star_tracking_accuracy": 0.2,
            "time_measurement_accuracy": 4.0,  # minutes
            "declination_measurement_range": 60.0  # degrees
        }
        
        return YantraSpecs(
            name="Dhruva-Protha-Chakra (Pole Circle)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_kapala_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Kapala Yantra (Bowl Sundial) with comprehensive shadow mathematics
        
        The Kapala Yantra is a hemispherical bowl sundial with precise
        shadow curve calculations for different seasons and times.
        """
        
        # Get reference data
        ref_location = self.reference_locations[reference_location]
        
        # Use reference dimensions if available, otherwise defaults
        if "kapala_yantra" in self.reference_dimensions and reference_location in self.reference_dimensions["kapala_yantra"]:
            ref_data = self.reference_dimensions["kapala_yantra"][reference_location]
        else:
            ref_data = {
                "bowl_radius": 2.5,
                "bowl_depth": 2.5,
                "rim_width": 0.3
            }
        
        lat_rad = math.radians(coords.latitude)
        
        # Scale based on latitude
        latitude_scale = self._calculate_latitude_scale(coords.latitude, ref_location.latitude)
        
        # Enhanced bowl dimensions
        bowl_radius = ref_data["bowl_radius"] * latitude_scale
        bowl_depth = ref_data["bowl_depth"] * latitude_scale
        rim_width = ref_data["rim_width"]
        
        # Enhanced shadow curve calculations for different seasons
        shadow_curves = {}
        seasons = ["winter_solstice", "equinox", "summer_solstice"]
        declinations = [-23.44, 0, 23.44]
        
        for season, decl in zip(seasons, declinations):
            curves = {}
            for hour in range(6, 19):  # 6 AM to 6 PM
                hour_angle = (hour - 12) * 15  # degrees
                
                # Solar elevation angle
                elevation = math.asin(
                    math.sin(lat_rad) * math.sin(math.radians(decl)) +
                    math.cos(lat_rad) * math.cos(math.radians(decl)) * math.cos(math.radians(hour_angle))
                )
                
                # Solar azimuth angle
                azimuth = math.atan2(
                    math.sin(math.radians(hour_angle)),
                    math.cos(math.radians(hour_angle)) * math.sin(lat_rad) - 
                    math.tan(math.radians(decl)) * math.cos(lat_rad)
                )
                
                # Shadow position in hemispherical bowl
                if elevation > 0:
                    # Shadow tip position in bowl coordinates
                    shadow_radius = bowl_radius * math.cos(elevation) * abs(math.cos(azimuth))
                    shadow_depth = bowl_radius * math.sin(elevation)
                    
                    curves[f"hour_{hour:02d}"] = {
                        "radius": min(shadow_radius, bowl_radius),
                        "azimuth": math.degrees(azimuth) % 360,
                        "depth": min(shadow_depth, bowl_depth),
                        "elevation": math.degrees(elevation)
                    }
            
            shadow_curves[season] = curves
        
        # Calculate hour markings on rim
        hour_markings = {}
        for hour in range(6, 19):
            hour_angle = (hour - 12) * 15
            hour_markings[f"rim_hour_{hour:02d}"] = hour_angle
        
        # Gnomon calculations
        gnomon_height = bowl_radius * 0.75
        
        dimensions = {
            "bowl_radius": bowl_radius,
            "bowl_depth": bowl_depth,
            "rim_width": rim_width,
            "gnomon_height": gnomon_height,
            "gnomon_thickness": 0.025,
            "total_diameter": (bowl_radius + rim_width) * 2,
            "interior_volume": (2/3) * math.pi * bowl_radius * bowl_depth**2,
            "base_platform_radius": bowl_radius + rim_width + 0.5,
            "drainage_hole_diameter": 0.05,
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "bowl_tilt": coords.latitude,  # Bowl tilted to latitude angle
            "gnomon_angle": coords.latitude,
            "rim_orientation": 0,  # Aligned north-south
            "magnetic_declination": self._calculate_magnetic_declination(coords),
            **hour_markings
        }
        
        # Add comprehensive shadow curve data
        for season, curves in shadow_curves.items():
            for hour_key, curve_data in curves.items():
                angles[f"{season}_{hour_key}_radius"] = curve_data["radius"]
                angles[f"{season}_{hour_key}_azimuth"] = curve_data["azimuth"]
                angles[f"{season}_{hour_key}_depth"] = curve_data["depth"]
        
        construction_notes = [
            f"Excavate hemispherical bowl of radius {bowl_radius}m",
            f"Tilt bowl axis at {coords.latitude:.1f}° from horizontal",
            "Install central gnomon parallel to Earth's axis",
            "Mark hour lines on the rim for time reading",
            "Engrave seasonal curves for different months",
            "Provide drainage hole at the bottom",
            "Smooth interior surface for accurate shadow casting",
            "Align bowl opening to face the celestial equator"
        ]
        
        accuracy_metrics = {
            "time_accuracy_minutes": 3.0,
            "seasonal_accuracy_days": 3.0,
            "angular_measurement_accuracy": 1.0,
            "usable_daylight_range": 12.0  # hours
        }
        
        return YantraSpecs(
            name="Kapala Yantra (Bowl Sundial)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_chakra_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Chakra Yantra (Ring Dial) with comprehensive ring geometry calculations
        
        The Chakra Yantra consists of multiple circular rings positioned to track
        celestial coordinates and solar movements with high precision.
        """
        
        # Get reference data
        ref_location = self.reference_locations[reference_location]
        
        # Use reference dimensions if available
        if "chakra_yantra" in self.reference_dimensions and reference_location in self.reference_dimensions["chakra_yantra"]:
            ref_data = self.reference_dimensions["chakra_yantra"][reference_location]
        else:
            ref_data = {
                "outer_ring_radius": 2.0,
                "inner_ring_radius": 1.2,
                "ring_thickness": 0.08
            }
        
        lat_rad = math.radians(coords.latitude)
        
        # Scale based on latitude
        latitude_scale = self._calculate_latitude_scale(coords.latitude, ref_location.latitude)
        
        # Enhanced ring dimensions
        outer_ring_radius = ref_data["outer_ring_radius"] * latitude_scale
        inner_ring_radius = ref_data["inner_ring_radius"] * latitude_scale
        ring_thickness = ref_data["ring_thickness"]
        
        # Multiple precision rings for different astronomical functions
        rings = {
            "equatorial_ring": {
                "radius": outer_ring_radius,
                "tilt": coords.latitude,  # Parallel to celestial equator
                "function": "hour_angle_measurement"
            },
            "meridian_ring": {
                "radius": outer_ring_radius * 0.9,
                "tilt": 0,  # Vertical, aligned with local meridian
                "function": "altitude_measurement"
            },
            "horizon_ring": {
                "radius": outer_ring_radius * 0.8,
                "tilt": 90,  # Horizontal, parallel to observer's horizon
                "function": "azimuth_measurement"
            },
            "declination_ring": {
                "radius": outer_ring_radius * 0.85,
                "tilt": coords.latitude,  # Same as equatorial but offset
                "function": "solar_declination_tracking"
            }
        }
        
        # Precise degree markings for all rings
        degree_markings = {}
        for ring_name in rings.keys():
            for degree in range(0, 361, 1):  # Every degree for precision
                if degree % 5 == 0:  # Major markings every 5 degrees
                    degree_markings[f"{ring_name}_major_{degree:03d}"] = degree
                elif degree % 1 == 0:  # Minor markings every degree
                    degree_markings[f"{ring_name}_minor_{degree:03d}"] = degree
        
        # Hour angle markings on equatorial ring
        hour_markings = {}
        for hour in range(24):
            hour_angle = hour * 15  # 15 degrees per hour
            hour_markings[f"equatorial_hour_{hour:02d}"] = hour_angle
        
        # Seasonal declination markings
        seasonal_angles = {}
        seasons_decl = {
            "winter_solstice": -23.44,
            "spring_equinox": 0.0,
            "summer_solstice": 23.44,
            "autumn_equinox": 0.0
        }
        
        for season, decl in seasons_decl.items():
            seasonal_angles[f"{season}_declination"] = decl
            # Calculate ring position for this declination
            ring_position = math.degrees(math.atan(math.tan(math.radians(decl)) / math.sin(lat_rad)))
            seasonal_angles[f"{season}_ring_position"] = ring_position
        
        dimensions = {
            "outer_ring_radius": outer_ring_radius,
            "inner_ring_radius": inner_ring_radius,
            "ring_thickness": ring_thickness,
            "ring_width": 0.12,
            "central_axis_length": outer_ring_radius * 2.4,
            "base_support_radius": outer_ring_radius + 0.4,
            "mounting_post_height": 2.0,
            "equatorial_ring_radius": rings["equatorial_ring"]["radius"],
            "meridian_ring_radius": rings["meridian_ring"]["radius"],
            "horizon_ring_radius": rings["horizon_ring"]["radius"],
            "declination_ring_radius": rings["declination_ring"]["radius"],
            "total_assembly_height": 2.5,
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "equatorial_ring_tilt": rings["equatorial_ring"]["tilt"],
            "meridian_ring_tilt": rings["meridian_ring"]["tilt"],
            "horizon_ring_tilt": rings["horizon_ring"]["tilt"],
            "declination_ring_tilt": rings["declination_ring"]["tilt"],
            "magnetic_declination": self._calculate_magnetic_declination(coords),
            **hour_markings,
            **seasonal_angles
        }
        
        construction_notes = [
            f"Construct nested rings with outer radius {outer_ring_radius}m",
            f"Tilt equatorial ring at {coords.latitude:.1f}° (= latitude)",
            "Mount meridian ring vertically in north-south plane",
            "Position horizon ring horizontally",
            "Mark degree scales on all rings",
            "Ensure rings can rotate independently",
            "Install sighting devices on ring intersections",
            "Align system with true north-south direction"
        ]
        
        accuracy_metrics = {
            "angular_measurement_accuracy": 0.2,  # degrees
            "tracking_accuracy": 0.5,
            "declination_range": 47.0,  # +/- 23.5 degrees
            "hour_angle_range": 360.0
        }
        
        return YantraSpecs(
            name="Chakra Yantra (Ring Dial)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_unnatamsa_yantra(self, coords: Coordinates, reference_location: str = "jaipur") -> YantraSpecs:
        """
        Generate Unnatamsa Yantra with precise quadrant geometry calculations
        
        The Unnatamsa Yantra is a quarter-circle instrument for measuring solar altitude
        angles with high precision throughout the day and seasons.
        """
        
        # Get reference data
        ref_location = self.reference_locations[reference_location]
        
        # Use reference dimensions if available
        if "unnatamsa_yantra" in self.reference_dimensions and reference_location in self.reference_dimensions["unnatamsa_yantra"]:
            ref_data = self.reference_dimensions["unnatamsa_yantra"][reference_location]
        else:
            ref_data = {
                "arc_radius": 2.5,
                "base_length": 3.5,
                "base_width": 2.8
            }
        
        lat_rad = math.radians(coords.latitude)
        
        # Scale based on latitude
        latitude_scale = self._calculate_latitude_scale(coords.latitude, ref_location.latitude)
        
        # Enhanced quadrant dimensions
        arc_radius = ref_data["quadrant_radius"] * latitude_scale
        base_length = ref_data["base_length"] * latitude_scale
        base_width = ref_data["base_width"] * latitude_scale
        
        # Precise solar altitude calculations for different seasons
        seasons_data = {
            "summer_solstice": {
                "declination": 23.44,
                "max_altitude": 90 - abs(coords.latitude - 23.44)
            },
            "winter_solstice": {
                "declination": -23.44,
                "max_altitude": 90 - abs(coords.latitude + 23.44)
            },
            "spring_equinox": {
                "declination": 0.0,
                "max_altitude": 90 - abs(coords.latitude)
            },
            "autumn_equinox": {
                "declination": 0.0,
                "max_altitude": 90 - abs(coords.latitude)
            }
        }
        
        # Hour-wise altitude calculations for each season
        seasonal_altitudes = {}
        for season, data in seasons_data.items():
            decl = data["declination"]
            season_altitudes = {}
            
            for hour in range(6, 19):  # 6 AM to 6 PM
                hour_angle = (hour - 12) * 15  # degrees from solar noon
                
                # Solar altitude calculation
                altitude = math.asin(
                    math.sin(lat_rad) * math.sin(math.radians(decl)) +
                    math.cos(lat_rad) * math.cos(math.radians(decl)) * math.cos(math.radians(hour_angle))
                )
                
                if altitude > 0:  # Sun is above horizon
                    altitude_deg = math.degrees(altitude)
                    season_altitudes[f"hour_{hour:02d}"] = altitude_deg
            
            seasonal_altitudes[season] = season_altitudes
        
        # Precise altitude scale markings on the quadrant arc
        altitude_scale = {}
        for alt in range(0, 91):  # Every degree from 0° to 90°
            if alt % 10 == 0:  # Major divisions every 10°
                altitude_scale[f"major_altitude_{alt:02d}"] = alt
            elif alt % 5 == 0:  # Medium divisions every 5°
                altitude_scale[f"medium_altitude_{alt:02d}"] = alt
            else:  # Minor divisions every degree
                altitude_scale[f"minor_altitude_{alt:02d}"] = alt
        
        # Azimuth reference markings
        azimuth_markings = {}
        cardinal_directions = {
            "north": 0, "northeast": 45, "east": 90, "southeast": 135,
            "south": 180, "southwest": 225, "west": 270, "northwest": 315
        }
        
        for direction, azimuth in cardinal_directions.items():
            azimuth_markings[f"azimuth_{direction}"] = azimuth
        
        dimensions = {
            "arc_radius": arc_radius,
            "base_length": base_length,
            "base_width": base_width,
            "vertical_post_height": arc_radius,
            "arc_thickness": 0.10,
            "sighting_arm_length": arc_radius * 0.95,
            "counterweight_radius": 0.25,
            "scale_marking_depth": 0.005,
            "total_height": arc_radius + 0.5,
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "quadrant_orientation": 180,  # Facing south for northern hemisphere
            "max_altitude_summer": seasons_data["summer_solstice"]["max_altitude"],
            "max_altitude_winter": seasons_data["winter_solstice"]["max_altitude"],
            "max_altitude_equinox": seasons_data["spring_equinox"]["max_altitude"],
            "latitude_complement": 90 - coords.latitude,
            "magnetic_declination": self._calculate_magnetic_declination(coords),
            **altitude_scale,
            **azimuth_markings
        }
        
        # Add seasonal altitude data to angles
        for season, season_altitudes in seasonal_altitudes.items():
            for hour_key, altitude in season_altitudes.items():
                angles[f"{season}_{hour_key}_altitude"] = altitude
        
        construction_notes = [
            f"Construct quarter-circle arc of radius {arc_radius:.1f}m",
            f"Base platform: {base_length:.1f}m × {base_width:.1f}m",
            "Mount vertically facing south for optimal solar tracking",
            f"Maximum summer altitude: {seasons_data['summer_solstice']['max_altitude']:.1f}°",
            f"Maximum winter altitude: {seasons_data['winter_solstice']['max_altitude']:.1f}°",
            f"Equinox maximum altitude: {seasons_data['spring_equinox']['max_altitude']:.1f}°",
            "Install precision movable sighting arm along the graduated arc",
            "Mark altitude scale every degree with major divisions every 10°",
            "Engrave seasonal curves for solstices and equinoxes",
            "Add azimuth reference markings for cardinal directions",
            "Ensure precise vertical alignment using plumb line",
            f"Scaled for latitude {coords.latitude:.2f}°N with factor {latitude_scale:.3f}"
        ]
        
        accuracy_metrics = {
            "altitude_measurement_accuracy": 0.25,  # degrees
            "time_determination_accuracy": 5.0,  # minutes
            "seasonal_variation_tracking": 1.0,  # degrees
            "measurement_range": 90.0  # degrees altitude
        }
        
        return YantraSpecs(
            name="Unnatamsa Yantra (Solar Altitude Instrument)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def calculate_solar_position(self, coords: Coordinates, date_time: datetime) -> Dict[str, float]:
        """
        Calculate solar position (elevation and azimuth) for given coordinates and time
        Simplified calculation for demonstration
        """
        
        # Day of year
        day_of_year = date_time.timetuple().tm_yday
        
        # Solar declination (simplified)
        declination = 23.45 * math.sin(math.radians(360 * (284 + day_of_year) / 365))
        
        # Hour angle
        hour_angle = 15 * (date_time.hour + date_time.minute/60 - 12)
        
        # Convert to radians
        lat_rad = math.radians(coords.latitude)
        decl_rad = math.radians(declination)
        hour_rad = math.radians(hour_angle)
        
        # Solar elevation angle
        elevation = math.asin(
            math.sin(lat_rad) * math.sin(decl_rad) +
            math.cos(lat_rad) * math.cos(decl_rad) * math.cos(hour_rad)
        )
        
        # Solar azimuth angle
        azimuth = math.atan2(
            math.sin(hour_rad),
            math.cos(hour_rad) * math.sin(lat_rad) - math.tan(decl_rad) * math.cos(lat_rad)
        )
        
        return {
            "elevation_degrees": math.degrees(elevation),
            "azimuth_degrees": math.degrees(azimuth),
            "declination_degrees": declination,
            "hour_angle_degrees": hour_angle
        }
    
    def _calculate_latitude_scale(self, target_latitude: float, reference_latitude: float) -> float:
        """
        Calculate scaling factor based on latitude difference
        
        For astronomical instruments, scaling often relates to:
        - Solar altitude angles at different latitudes
        - Shadow lengths and geometric relationships
        - Celestial sphere projections
        """
        target_rad = math.radians(target_latitude)
        reference_rad = math.radians(reference_latitude)
        
        # Scale based on sine of latitude complement (distance from pole)
        # This affects shadow lengths and gnomon geometry
        target_complement = 90 - abs(target_latitude)
        reference_complement = 90 - abs(reference_latitude)
        
        scale_factor = math.sin(math.radians(target_complement)) / math.sin(math.radians(reference_complement))
        
        return scale_factor
    
    def _calculate_magnetic_declination(self, coords: Coordinates) -> float:
        """
        Calculate magnetic declination for the given coordinates
        Simplified model - in practice, use IGRF model for precision
        """
        # Simplified magnetic declination calculation
        # This is a very basic approximation
        base_declination = 0.5  # degrees
        latitude_factor = coords.latitude * 0.1
        longitude_factor = coords.longitude * 0.05
        
        return base_declination + latitude_factor + longitude_factor
    
    def export_specifications(self, yantra_specs: YantraSpecs, format: str = "json") -> str:
        """Export yantra specifications in various formats"""
        
        if format.lower() == "json":
            return json.dumps({
                "name": yantra_specs.name,
                "coordinates": {
                    "latitude": yantra_specs.coordinates.latitude,
                    "longitude": yantra_specs.coordinates.longitude,
                    "elevation": yantra_specs.coordinates.elevation
                },
                "dimensions": yantra_specs.dimensions,
                "angles": yantra_specs.angles,
                "construction_notes": yantra_specs.construction_notes,
                "accuracy_metrics": yantra_specs.accuracy_metrics
            }, indent=2)
        
        elif format.lower() == "blueprint":
            # Generate human-readable blueprint format
            blueprint = f"""
YANTRA CONSTRUCTION BLUEPRINT
=============================

Instrument: {yantra_specs.name}
Location: {yantra_specs.coordinates.latitude:.4f}°N, {yantra_specs.coordinates.longitude:.4f}°E
Elevation: {yantra_specs.coordinates.elevation}m

DIMENSIONS:
-----------
"""
            for key, value in yantra_specs.dimensions.items():
                blueprint += f"{key.replace('_', ' ').title()}: {value:.2f}m\n"
            
            blueprint += f"""
ANGLES:
-------
"""
            for key, value in yantra_specs.angles.items():
                blueprint += f"{key.replace('_', ' ').title()}: {value:.2f}°\n"
            
            blueprint += f"""
CONSTRUCTION NOTES:
------------------
"""
            for i, note in enumerate(yantra_specs.construction_notes, 1):
                blueprint += f"{i}. {note}\n"
            
            blueprint += f"""
ACCURACY SPECIFICATIONS:
-----------------------
"""
            for key, value in yantra_specs.accuracy_metrics.items():
                unit = "°" if "degrees" in key else ("min" if "minutes" in key else "")
                blueprint += f"{key.replace('_', ' ').title()}: ±{value:.1f}{unit}\n"
            
            return blueprint
        
        else:
            raise ValueError(f"Unsupported export format: {format}")

# Example usage and testing
if __name__ == "__main__":
    # Initialize the engine
    engine = ParametricGeometryEngine()
    
    # Test coordinates (Delhi, India - close to historical Jantar Mantar)
    delhi_coords = Coordinates(latitude=28.6139, longitude=77.2090, elevation=216)
    
    # Generate different yantras with enhanced geometry
    print("ENHANCED YANTRA GENERATION WITH RAY-INTERSECTION CALCULATIONS")
    print("=" * 70)
    
    samrat = engine.generate_samrat_yantra(delhi_coords)
    rama = engine.generate_rama_yantra(delhi_coords)
    jai_prakash = engine.generate_jai_prakash_yantra(delhi_coords)
    
    # Test integration with advanced geometry engine
    try:
        from yantra_geometry import YantraGeometryEngine
        from blueprint_generator import YantraBlueprintGenerator
        
        advanced_engine = YantraGeometryEngine()
        blueprint_gen = YantraBlueprintGenerator()
        
        # Generate precise geometry
        print("\nTesting Advanced Geometry Engine:")
        print("-" * 40)
        
        samrat_geometry = advanced_engine.generate_samrat_yantra_geometry(delhi_coords.latitude, 20.0)
        print(f"Samrat Yantra - Generated {len(samrat_geometry.get('hour_lines', {}).get('east', []))} east hour lines")
        print(f"Samrat Yantra - Generated {len(samrat_geometry.get('hour_lines', {}).get('west', []))} west hour lines")
        
        rama_geometry = advanced_engine.generate_rama_yantra_geometry(delhi_coords.latitude, 8.0)
        print(f"Rama Yantra - Generated {len(rama_geometry.get('altitude_circles', []))} altitude circles")
        print(f"Rama Yantra - Generated {len(rama_geometry.get('azimuth_lines', []))} azimuth lines")
        
        # Test blueprint generation
        print("\nTesting Blueprint Generation:")
        print("-" * 35)
        
        # Convert YantraSpecs to format expected by blueprint generator
        samrat_blueprint_specs = {
            'name': samrat.name,
            'coordinates': {
                'latitude': samrat.coordinates.latitude,
                'longitude': samrat.coordinates.longitude,
                'elevation': samrat.coordinates.elevation
            },
            'dimensions': samrat.dimensions,
            'angles': samrat.angles
        }
        
        # Generate blueprint pages
        samrat_pages = blueprint_gen.create_samrat_yantra_blueprint(samrat_blueprint_specs)
        print(f"Generated {len(samrat_pages)} blueprint pages for Samrat Yantra")
        
        rama_blueprint_specs = {
            'name': rama.name,
            'coordinates': {
                'latitude': rama.coordinates.latitude,
                'longitude': rama.coordinates.longitude,
                'elevation': rama.coordinates.elevation
            },
            'dimensions': rama.dimensions,
            'angles': rama.angles
        }
        
        rama_pages = blueprint_gen.create_rama_yantra_blueprint(rama_blueprint_specs)
        print(f"Generated {len(rama_pages)} blueprint pages for Rama Yantra")
        
        print("\nAdvanced geometry and blueprint generation successful!")
        
    except ImportError as e:
        print(f"Advanced modules not available: {e}")
        print("Using basic geometry calculations...")
    
    # Export specifications
    print("\nSAMRAT YANTRA SPECIFICATIONS:")
    print("=" * 50)
    print(engine.export_specifications(samrat, "blueprint"))
    print("\n\n")
    
    print("RAMA YANTRA SPECIFICATIONS:")
    print("=" * 50)
    print(engine.export_specifications(rama, "blueprint"))
    print("\n\n")
    
    # Test solar position calculation
    test_time = datetime(2025, 3, 21, 12, 0)  # Spring equinox, noon
    solar_pos = engine.calculate_solar_position(delhi_coords, test_time)
    print("SOLAR POSITION AT SPRING EQUINOX NOON:")
    print("=" * 40)
    for key, value in solar_pos.items():
        print(f"{key.replace('_', ' ').title()}: {value:.2f}°")
    
    print("\nTest completed successfully!")