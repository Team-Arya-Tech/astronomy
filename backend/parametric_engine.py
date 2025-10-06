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
        
    def generate_samrat_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Samrat Yantra (Great Sundial) dimensions
        
        The Samrat Yantra is essentially a giant sundial where:
        - Gnomon angle = latitude of the location
        - Hour markings are calculated based on solar declination
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions (can be scaled)
        base_length = 10.0  # meters (default scale)
        
        # Core calculations
        gnomon_angle = coords.latitude  # Gnomon parallel to Earth's axis
        gnomon_height = base_length * math.tan(lat_rad)
        
        # Hour line angles (15° per hour from solar noon)
        hour_angles = {}
        for hour in range(-6, 7):  # 6 AM to 6 PM
            angle = 15 * hour  # degrees from solar noon
            hour_angles[f"hour_{hour + 6:02d}"] = angle
            
        # Shadow lengths at different times
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
            "base_width": base_length * 0.8,
            "gnomon_height": gnomon_height,
            "gnomon_thickness": 0.3,
            "step_height": 0.2,
            "step_width": 0.4
        }
        
        angles = {
            "gnomon_angle": gnomon_angle,
            "base_orientation": 0,  # True north
            **hour_angles
        }
        
        construction_notes = [
            f"Orient gnomon at {gnomon_angle:.1f}° from horizontal (= latitude)",
            "Align base precisely with true north-south direction",
            f"Gnomon height: {gnomon_height:.2f}m for {base_length}m base",
            "Mark hour lines according to calculated angles",
            "Add steps for safe access to readings"
        ]
        
        # Calculate accuracy metrics
        accuracy_metrics = {
            "time_accuracy_minutes": 2.0,  # ±2 minutes typical accuracy
            "seasonal_variation_minutes": 5.0,
            "latitude_dependency": abs(coords.latitude)
        }
        
        return YantraSpecs(
            name="Samrat Yantra (Great Sundial)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_rama_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Rama Yantra dimensions
        
        The Rama Yantra consists of cylindrical structures for measuring
        altitude and azimuth of celestial objects
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base dimensions
        outer_radius = 5.0  # meters
        inner_radius = 1.0  # meters
        wall_height = 2.0  # meters
        
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
            "wall_thickness": 0.3,
            "central_pillar_radius": 0.2,
            "step_height": 0.2
        }
        
        angles = {
            "sector_angle": sector_angle,
            "num_sectors": num_sectors,
            **azimuth_markings
        }
        
        construction_notes = [
            f"Construct circular wall with outer radius {outer_radius}m",
            f"Inner measurement area radius: {inner_radius}m",
            f"Divide into {num_sectors} equal sectors of {sector_angle}° each",
            "Mark altitude scales on radial walls",
            "Ensure precise leveling for accurate measurements",
            "Central pillar for sighting rod placement"
        ]
        
        accuracy_metrics = {
            "altitude_accuracy_degrees": 0.5,
            "azimuth_accuracy_degrees": 1.0,
            "effective_range_altitude": 90.0,
            "effective_range_azimuth": 360.0
        }
        
        return YantraSpecs(
            name="Rama Yantra (Cylindrical Altitude-Azimuth)",
            coordinates=coords,
            dimensions=dimensions,
            angles=angles,
            construction_notes=construction_notes,
            accuracy_metrics=accuracy_metrics
        )
    
    def generate_jai_prakash_yantra(self, coords: Coordinates) -> YantraSpecs:
        """
        Generate Jai Prakash Yantra dimensions
        
        Hemispherical sundial representing the celestial sphere
        """
        
        lat_rad = math.radians(coords.latitude)
        
        # Base hemisphere dimensions
        hemisphere_radius = 4.0  # meters
        rim_thickness = 0.3
        
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
            "depth": hemisphere_radius
        }
        
        angles = {
            "latitude_tilt": coords.latitude,
            "celestial_equator_angle": 90 - coords.latitude,
            **hour_circles
        }
        
        construction_notes = [
            f"Excavate hemispherical bowl of radius {hemisphere_radius}m",
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
            "usable_daylight_hours": 12.0
        }
        
        return YantraSpecs(
            name="Jai Prakash Yantra (Hemispherical Sundial)",
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