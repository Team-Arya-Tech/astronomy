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
        Generate Samrat Yantra (Great Sundial) dimensions
        
        The Samrat Yantra is essentially a giant sundial where:
        - Gnomon angle = latitude of the location
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
        
        # Hour line angles (15° per hour from solar noon)
        hour_angles = {}
        for hour in range(-6, 7):  # 6 AM to 6 PM
            angle = 15 * hour  # degrees from solar noon
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
        Generate Rama Yantra dimensions
        
        The Rama Yantra consists of cylindrical structures for measuring
        altitude and azimuth of celestial objects
        Based on selected historical reference
        
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
        
        # Calculate scaling factor - Rama Yantra scaling based on latitude difference
        # affects the optimal viewing geometry
        latitude_scale = 1.0 + 0.1 * (coords.latitude - ref_location.latitude) / 30.0
        
        # Scale dimensions from reference
        outer_radius = ref_data["outer_radius"] * latitude_scale
        inner_radius = ref_data["inner_radius"] * latitude_scale
        wall_height = ref_data["wall_height"]  # Height generally constant
        
        # Calculate sector angles based on latitude
        # Higher latitudes need different sector divisions
        num_sectors = 12  # Traditional division
        sector_angle = 360 / num_sectors
        
        # Vertical scale markings (altitude measurements)
        altitude_markings = {}
        for alt in range(0, 91, 10):  # 0° to 90° in 10° increments
            radius_at_altitude = inner_radius + (outer_radius - inner_radius) * (alt / 90)
            altitude_markings[f"altitude_{alt}"] = radius_at_altitude
        
        # Azimuth markings (horizontal direction)
        azimuth_markings = {}
        for az in range(0, 360, 30):  # Every 30° around the circle
            azimuth_markings[f"azimuth_{az}"] = az
        
        dimensions = {
            "outer_radius": outer_radius,
            "inner_radius": inner_radius,
            "wall_height": wall_height,
            "wall_thickness": ref_data["wall_thickness"],
            "central_pillar_radius": ref_data["central_pillar_radius"],
            "step_height": ref_data["step_height"],
            "reference_outer_radius": ref_data["outer_radius"],
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "sector_angle": sector_angle,
            "num_sectors": num_sectors,
            **azimuth_markings
        }
        
        construction_notes = [
            f"Based on original {reference_location.title()} Rama Yantra ({ref_location.latitude:.2f}°N, {ref_location.longitude:.2f}°E)",
            f"Original outer radius: {ref_data['outer_radius']}m",
            f"Scaled for latitude {coords.latitude:.2f}°N (scale factor: {latitude_scale:.3f})",
            f"Construct circular wall with outer radius {outer_radius:.1f}m",
            f"Inner measurement area radius: {inner_radius:.1f}m",
            f"Divide into {num_sectors} equal sectors of {sector_angle}° each",
            "Mark altitude scales on radial walls",
            "Ensure precise leveling for accurate measurements",
            "Central pillar for sighting rod placement"
        ]
        
        accuracy_metrics = {
            "altitude_accuracy_degrees": 0.5,
            "azimuth_accuracy_degrees": 1.0,
            "effective_range_altitude": 90.0,
            "effective_range_azimuth": 360.0,
            "reference_latitude": ref_location.latitude,
            "reference_longitude": ref_location.longitude
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
        Generate Jai Prakash Yantra dimensions
        
        Hemispherical sundial representing the celestial sphere
        
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
        
        # Calculate scaling factor
        latitude_scale = math.cos(lat_rad) / math.cos(ref_lat_rad)
        
        # Base hemisphere dimensions
        hemisphere_radius = ref_data["hemisphere_radius"] * latitude_scale
        rim_thickness = ref_data["rim_thickness"]
        
        # Celestial coordinate markings
        # Declination circles (parallel to celestial equator)
        declination_circles = {}
        for decl in range(-24, 25, 6):  # -24° to +24° (seasonal range)
            circle_radius = hemisphere_radius * math.cos(math.radians(decl))
            declination_circles[f"declination_{decl}"] = circle_radius
        
        # Hour circles (meridians)
        hour_circles = {}
        for hour in range(0, 24, 2):  # Every 2 hours
            angle = 15 * hour  # 15° per hour
            hour_circles[f"hour_circle_{hour}"] = angle
        
        # Latitude-specific adjustments
        equatorial_radius = hemisphere_radius * math.cos(lat_rad)
        polar_height = hemisphere_radius * math.sin(lat_rad)
        
        dimensions = {
            "hemisphere_radius": hemisphere_radius,
            "rim_thickness": rim_thickness,
            "equatorial_radius": equatorial_radius,
            "polar_height": polar_height,
            "base_diameter": hemisphere_radius * 2 + rim_thickness * 2,
            "depth": hemisphere_radius,
            "reference_hemisphere_radius": ref_data["hemisphere_radius"],
            "latitude_scale_factor": latitude_scale
        }
        
        angles = {
            "latitude_tilt": coords.latitude,
            "celestial_equator_angle": 90 - coords.latitude,
            **hour_circles
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
        Generate Digamsa Yantra dimensions
        
        The Digamsa Yantra is used for measuring azimuthal directions
        and horizon angles. It consists of a vertical semicircle with
        graduated scales for angular measurements.
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        arc_radius = 3.0  # meters
        base_width = arc_radius * 2.2
        pillar_height = arc_radius * 1.5
        
        # Azimuth scale markings (0° to 360°)
        azimuth_markings = {}
        for angle in range(0, 361, 10):  # Every 10 degrees
            azimuth_markings[f"azimuth_{angle}"] = angle
        
        # Altitude scale markings on the arc (0° to 90°)
        altitude_markings = {}
        for angle in range(0, 91, 5):  # Every 5 degrees
            arc_position = angle  # Direct mapping for semicircle
            altitude_markings[f"altitude_{angle}"] = arc_position
        
        # Cardinal direction markers
        cardinal_directions = {
            "north": 0,
            "east": 90,
            "south": 180,
            "west": 270
        }
        
        dimensions = {
            "arc_radius": arc_radius,
            "base_width": base_width,
            "base_length": base_width,
            "pillar_height": pillar_height,
            "arc_thickness": 0.15,
            "base_thickness": 0.3,
            "sighting_rod_length": 0.5,
            "scale_marking_depth": 0.01
        }
        
        angles = {
            "arc_span": 180,  # Semicircle
            "latitude_adjustment": coords.latitude,
            **azimuth_markings,
            **cardinal_directions
        }
        
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
    
    def generate_kapala_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Kapala Yantra (Bowl Sundial) dimensions
        
        The Kapala Yantra is a hemispherical bowl sundial similar to
        Jai Prakash but with different markings for specific observations.
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        bowl_radius = 2.0  # meters
        rim_width = 0.2
        
        # Time markings around the rim
        time_markings = {}
        for hour in range(6, 19):  # 6 AM to 6 PM
            angle = (hour - 12) * 15  # Degrees from solar noon
            time_markings[f"time_{hour:02d}h"] = angle
        
        # Seasonal curves inside the bowl
        seasonal_curves = {}
        for month in range(1, 13):
            # Simplified seasonal declination
            declination = 23.44 * math.sin(math.radians(30 * (month - 3)))
            curve_radius = bowl_radius * math.cos(math.radians(declination))
            seasonal_curves[f"month_{month:02d}"] = curve_radius
        
        # Gnomon position calculation
        gnomon_height = bowl_radius * 0.8
        
        dimensions = {
            "bowl_radius": bowl_radius,
            "bowl_depth": bowl_radius,
            "rim_width": rim_width,
            "gnomon_height": gnomon_height,
            "gnomon_thickness": 0.02,
            "base_platform_radius": bowl_radius + rim_width + 0.5,
            "drainage_hole_diameter": 0.05
        }
        
        angles = {
            "bowl_tilt": coords.latitude,  # Tilt equals latitude
            "gnomon_angle": coords.latitude,
            **time_markings
        }
        
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
    
    def generate_chakra_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Chakra Yantra (Ring Dial) dimensions
        
        The Chakra Yantra consists of circular rings for solar
        observations and astronomical measurements.
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        outer_ring_radius = 1.5  # meters
        inner_ring_radius = 1.2
        ring_thickness = 0.05
        
        # Multiple rings for different functions
        rings = {
            "equatorial_ring": outer_ring_radius,
            "meridian_ring": outer_ring_radius * 0.9,
            "horizon_ring": outer_ring_radius * 0.8
        }
        
        # Degree markings on rings
        degree_markings = {}
        for degree in range(0, 361, 5):  # Every 5 degrees
            degree_markings[f"degree_{degree:03d}"] = degree
        
        # Seasonal adjustment angles
        seasonal_angles = {}
        for season in ['spring', 'summer', 'autumn', 'winter']:
            if season == 'spring':
                angle = 0
            elif season == 'summer':
                angle = 23.44
            elif season == 'autumn':
                angle = 0
            else:  # winter
                angle = -23.44
            seasonal_angles[f"{season}_declination"] = angle
        
        dimensions = {
            "outer_ring_radius": outer_ring_radius,
            "inner_ring_radius": inner_ring_radius,
            "ring_thickness": ring_thickness,
            "ring_width": 0.1,
            "central_axis_length": outer_ring_radius * 2.2,
            "base_support_radius": outer_ring_radius + 0.3,
            "mounting_post_height": 1.8
        }
        
        angles = {
            "equatorial_ring_tilt": coords.latitude,
            "meridian_ring_tilt": 0,  # Vertical
            "horizon_ring_tilt": 90,  # Horizontal
            **degree_markings,
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
    
    def generate_unnatamsa_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Unnatamsa Yantra dimensions
        
        The Unnatamsa Yantra is used for measuring solar altitude
        angles throughout the day and seasons.
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        quadrant_radius = 2.0  # meters
        base_length = quadrant_radius * 1.5
        
        # Solar altitude calculations for different seasons
        max_altitude_summer = 90 - abs(coords.latitude - 23.44)
        max_altitude_winter = 90 - abs(coords.latitude + 23.44)
        max_altitude_equinox = 90 - abs(coords.latitude)
        
        # Hour markings for solar tracking
        hour_markings = {}
        for hour in range(6, 19):  # Daylight hours
            hour_angle = (hour - 12) * 15
            hour_markings[f"solar_hour_{hour:02d}"] = hour_angle
        
        # Altitude scale on the quadrant
        altitude_scale = {}
        for alt in range(0, 91, 5):  # 0° to 90° in 5° steps
            scale_position = alt  # Direct angular mapping
            altitude_scale[f"altitude_{alt:02d}"] = scale_position
        
        dimensions = {
            "quadrant_radius": quadrant_radius,
            "base_length": base_length,
            "base_width": quadrant_radius * 1.2,
            "vertical_post_height": quadrant_radius,
            "arc_thickness": 0.08,
            "sighting_arm_length": quadrant_radius * 0.9,
            "counterweight_radius": 0.2
        }
        
        angles = {
            "quadrant_orientation": 0,  # Facing south
            "max_altitude_summer": max_altitude_summer,
            "max_altitude_winter": max_altitude_winter,
            "max_altitude_equinox": max_altitude_equinox,
            "latitude_complement": 90 - coords.latitude,
            **hour_markings,
            **altitude_scale
        }
        
        construction_notes = [
            f"Construct quarter-circle arc of radius {quadrant_radius}m",
            "Mount vertically facing south",
            f"Maximum summer altitude: {max_altitude_summer:.1f}°",
            f"Maximum winter altitude: {max_altitude_winter:.1f}°",
            "Install movable sighting arm along the arc",
            "Mark altitude scale every 5° on the arc",
            "Add hour markings for solar time tracking",
            "Ensure precise vertical and horizontal alignment"
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
    
    # Generate different yantras
    samrat = engine.generate_samrat_yantra(delhi_coords)
    rama = engine.generate_rama_yantra(delhi_coords)
    jai_prakash = engine.generate_jai_prakash_yantra(delhi_coords)
    
    # Export specifications
    print("SAMRAT YANTRA SPECIFICATIONS:")
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