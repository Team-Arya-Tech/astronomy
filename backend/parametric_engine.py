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