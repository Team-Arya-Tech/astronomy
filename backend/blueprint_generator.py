"""
YANTRA.AI - Comprehensive Blueprint Generator
Creates construction-ready technical drawings using precise ray-intersection calculations
Integrates with YantraGeometryEngine for accurate hour lines and shadow calculations
"""

import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import Circle, Rectangle, Polygon, Arc
import numpy as np
from reportlab.lib.pagesizes import A4, A3, A2
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, inch
from reportlab.lib import colors
from reportlab.graphics.shapes import Drawing, Circle as RLCircle, Line, String
from reportlab.graphics import renderPDF
import ezdxf
from ezdxf import units
import io
import base64
from pathlib import Path
from typing import Dict, List, Tuple
from dataclasses import dataclass
import math

# Import our comprehensive geometry engine
try:
    from yantra_geometry import YantraGeometryEngine, Vector3D, YantraPoint
except ImportError:
    print("Warning: yantra_geometry module not found. Using basic calculations.")

@dataclass
class DrawingDimension:
    """Represents a dimension line in technical drawings"""
    start_point: Tuple[float, float]
    end_point: Tuple[float, float]
    value: float
    unit: str
    label: str

@dataclass
class BlueprintPage:
    """Represents a single page of the blueprint"""
    title: str
    scale: str
    elements: List
    dimensions: List[DrawingDimension]
    notes: List[str]

class YantraBlueprintGenerator:
    """
    Comprehensive blueprint generator for ancient astronomical instruments
    Uses precise ray-intersection calculations from YantraGeometryEngine
    Generates construction-ready technical drawings with accurate hour lines
    """
    
    def __init__(self):
        self.drawing_scale = 1/100  # 1:100 scale default
        self.paper_size = A3
        self.margin = 20 * mm
        
        # Initialize the comprehensive geometry engine
        try:
            self.geometry_engine = YantraGeometryEngine()
            self.use_advanced_calculations = True
            print("✓ Advanced ray-intersection calculations enabled")
        except NameError:
            self.geometry_engine = None
            self.use_advanced_calculations = False
            print("⚠ Using basic geometric approximations")
        
        # Technical drawing standards
        self.line_weights = {
            'outline': 0.7,
            'hidden': 0.35,
            'dimension': 0.25,
            'centerline': 0.25,
            'construction': 0.18,
            'hour_lines': 0.4
        }
        
        self.colors = {
            'outline': 'black',
            'hidden': 'gray',
            'dimension': 'blue',
            'centerline': 'green',
            'construction': 'lightgray',
            'hour_lines': 'red',
            'seasonal_curves': 'orange'
        }
    
    def create_samrat_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Samrat Yantra using precise ray-intersection calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles'] 
        coordinates = specs['coordinates']
        
        # Handle both dict and Coordinates object
        if hasattr(coordinates, 'latitude'):
            lat = coordinates.latitude
            lon = coordinates.longitude
            elev = coordinates.elevation
        else:
            lat = coordinates['latitude']
            lon = coordinates['longitude'] 
            elev = coordinates['elevation']
        
        pages = []
        
        # Generate precise hour line geometry using ray-intersection method
        if self.use_advanced_calculations:
            print(f"Generating precise Samrat Yantra geometry for {lat:.4f}°N...")
            precise_geometry = self.geometry_engine.generate_samrat_yantra_geometry(
                lat, 
                dimensions.get('base_length', 20.0)
            )
            print(f"✓ Generated {len(precise_geometry.get('hour_lines', {}).get('east', []))} east hour lines")
            print(f"✓ Generated {len(precise_geometry.get('hour_lines', {}).get('west', []))} west hour lines")
        else:
            precise_geometry = None
            print("⚠ Using basic geometric approximations")
        
        # Page 1: Plan View (Top View) with ray-traced hour lines
        plan_view = self.create_plan_view_samrat_precise(dimensions, angles, {'latitude': lat, 'longitude': lon, 'elevation': elev}, precise_geometry)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - PLAN VIEW WITH PRECISE HOUR LINES",
            scale="1:100",
            elements=plan_view['elements'],
            dimensions=plan_view['dimensions'],
            notes=[
                "All dimensions in meters",
                f"Gnomon angle: {angles['gnomon_angle']:.2f}°",
                f"Hour lines calculated using ray-intersection method",
                f"Optimized for latitude {lat:.4f}°N",
                "Orient gnomon precisely north-south (±0.1°)",
                "Foundation depth: 0.5m minimum"
            ]
        ))
        
        # Page 2: Elevation View (Side View) with shadow calculations
        elevation_view = self.create_elevation_view_samrat_precise(dimensions, angles, {'latitude': lat, 'longitude': lon, 'elevation': elev}, precise_geometry)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - ELEVATION VIEW WITH SHADOW PATHS",
            scale="1:100",
            elements=elevation_view['elements'],
            dimensions=elevation_view['dimensions'],
            notes=[
                f"Gnomon height: {dimensions['gnomon_height']:.2f}m",
                f"Shadow calculations for {lat:.4f}°N",
                "Concrete grade: M25 minimum",
                "Steel reinforcement as per IS:456",
                "Dial faces must be perfectly vertical",
                "Surface finish: Smooth marble or stone"
            ]
        ))
        
        # Page 3: Hour Line Detail with precise positions
        hour_detail_view = self.create_hour_line_detail_samrat(dimensions, {'latitude': lat, 'longitude': lon, 'elevation': elev}, precise_geometry)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - HOUR LINE MARKING DETAIL",
            scale="1:20",
            elements=hour_detail_view['elements'],
            dimensions=hour_detail_view['dimensions'],
            notes=[
                "Hour line positions calculated using ray-surface intersection",
                "Mark positions with ±1mm accuracy",
                "Engrave hour markings 5mm deep",
                "Use bronze inlay for hour numerals",
                "Verify positions with solar observations",
                "Weather-resistant coating required"
            ]
        ))
        
        # Page 4: Construction Details
        detail_view = self.create_construction_details_samrat(dimensions, angles)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - CONSTRUCTION DETAILS",
            scale="1:20",
            elements=detail_view['elements'],
            dimensions=detail_view['dimensions'],
            notes=[
                "Foundation bolts: M16 grade 8.8",
                "Gnomon material: Stainless steel or stone",
                "Base platform perfectly level (±2mm)",
                "North-South alignment critical (±0.1°)",
                "Install drainage system"
            ]
        ))
        
        return pages
    
    def create_plan_view_samrat_precise(self, dimensions: Dict, angles: Dict, coordinates: Dict, precise_geometry: Dict = None) -> Dict:
        """Create plan view drawing for Samrat Yantra using precise ray-intersection calculations"""
        
        elements = []
        dimension_lines = []
        
        # Base platform
        base_length = dimensions.get('base_length', 20.0)
        base_width = dimensions.get('base_width', base_length * 0.8)
        
        base_rect = Rectangle(
            (-base_length/2, -base_width/2),
            base_length,
            base_width,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.2
        )
        elements.append(base_rect)
        
        # Gnomon centerline (North-South)
        gnomon_line = plt.Line2D(
            [0, 0],
            [-base_width/2, base_width/2],
            linewidth=self.line_weights['centerline'],
            color=self.colors['centerline'],
            linestyle='--',
            label='Gnomon Centerline (N-S)'
        )
        elements.append(gnomon_line)
        
        # East and West dial faces
        dial_face_width = 0.5
        
        # East dial face
        east_face = Rectangle(
            (base_length/2 - dial_face_width/2, -base_width/2),
            dial_face_width,
            base_width,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='white',
            alpha=0.8
        )
        elements.append(east_face)
        
        # West dial face  
        west_face = Rectangle(
            (-base_length/2 - dial_face_width/2, -base_width/2),
            dial_face_width,
            base_width,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='white',
            alpha=0.8
        )
        elements.append(west_face)
        
        # Add precise hour lines if available
        if precise_geometry and self.use_advanced_calculations:
            # Add ray-traced hour lines for east face
            if 'hour_lines' in precise_geometry and 'east' in precise_geometry['hour_lines']:
                for hour, point in precise_geometry['hour_lines']['east']:
                    # Project 3D intersection to plan view
                    # For plan view, we show the position on the dial face
                    face_x = base_length/2
                    face_y = point.surface_coords[0]  # Y coordinate from ray intersection
                    
                    # Hour line from gnomon center to dial face position
                    hour_line = plt.Line2D(
                        [0, face_x],
                        [0, face_y],
                        linewidth=self.line_weights['hour_lines'],
                        color=self.colors['hour_lines'],
                        alpha=0.7
                    )
                    elements.append(hour_line)
                    
                    # Hour marking point
                    hour_point = plt.Circle(
                        (face_x, face_y), 0.1,
                        color=self.colors['hour_lines'],
                        fill=True
                    )
                    elements.append(hour_point)
                    
                    # Hour label
                    elements.append(plt.text(face_x + 0.3, face_y, f'{hour}h', 
                                           fontsize=8, color=self.colors['hour_lines']))
            
            # Add ray-traced hour lines for west face  
            if 'hour_lines' in precise_geometry and 'west' in precise_geometry['hour_lines']:
                for hour, point in precise_geometry['hour_lines']['west']:
                    face_x = -base_length/2
                    face_y = point.surface_coords[0]
                    
                    hour_line = plt.Line2D(
                        [0, face_x],
                        [0, face_y],
                        linewidth=self.line_weights['hour_lines'],
                        color=self.colors['hour_lines'],
                        alpha=0.7
                    )
                    elements.append(hour_line)
                    
                    hour_point = plt.Circle(
                        (face_x, face_y), 0.1,
                        color=self.colors['hour_lines'],
                        fill=True
                    )
                    elements.append(hour_point)
                    
                    elements.append(plt.text(face_x - 0.5, face_y, f'{hour}h', 
                                           fontsize=8, color=self.colors['hour_lines']))
            
            # Add seasonal curves if available
            if 'seasonal_curves' in precise_geometry:
                for season_name, season_data in precise_geometry['seasonal_curves'].items():
                    if season_name != 'equinox':  # Equinox is the main hour lines
                        curve_color = self.colors['seasonal_curves']
                        
                        # Draw seasonal curve for east face
                        if 'east' in season_data:
                            # Handle YantraPoint objects in seasonal curves
                            east_points = []
                            for point in season_data['east']:
                                # Seasonal curves contain YantraPoint objects directly
                                if hasattr(point, 'surface_coords'):
                                    east_points.append((base_length/2, point.surface_coords[0]))
                            
                            if len(east_points) > 1:
                                xs, ys = zip(*east_points)
                                seasonal_curve = plt.Line2D(
                                    xs, ys,
                                    linewidth=self.line_weights['construction'],
                                    color=curve_color,
                                    linestyle=':',
                                    alpha=0.6,
                                    label=f'{season_name} curve'
                                )
                                elements.append(seasonal_curve)
                        
                        # Draw seasonal curve for west face
                        if 'west' in season_data:
                            west_points = []
                            for point in season_data['west']:
                                # Seasonal curves contain YantraPoint objects directly
                                if hasattr(point, 'surface_coords'):
                                    west_points.append((-base_length/2, point.surface_coords[0]))
                            
                            if len(west_points) > 1:
                                xs, ys = zip(*west_points)
                                seasonal_curve = plt.Line2D(
                                    xs, ys,
                                    linewidth=self.line_weights['construction'],
                                    color=curve_color,
                                    linestyle=':',
                                    alpha=0.6
                                )
                                elements.append(seasonal_curve)
        
        else:
            # Fallback: basic hour line approximations (less accurate)
            print("⚠ Using basic hour line approximations - not ray-traced")
            for hour in range(6, 19):  # 6 AM to 6 PM
                if hour != 12:  # Skip noon (vertical gnomon)
                    hour_angle = (hour - 12) * 15  # Degrees from solar noon
                    # Simple approximation (NOT accurate)
                    angle_rad = np.radians(hour_angle * math.sin(math.radians(coordinates['latitude'])))
                    line_length = base_length * 0.4
                    
                    hour_line = plt.Line2D(
                        [0, np.sin(angle_rad) * line_length],
                        [0, np.cos(angle_rad) * line_length],
                        linewidth=self.line_weights['construction'],
                        color=self.colors['construction'],
                        alpha=0.5,
                        linestyle='--'
                    )
                    elements.append(hour_line)
        
        # Dimensions
        dimension_lines.extend([
            DrawingDimension(
                (-base_length/2, -base_width/2 - 1.0),
                (base_length/2, -base_width/2 - 1.0),
                base_length,
                "m",
                "BASE LENGTH"
            ),
            DrawingDimension(
                (-base_length/2 - 1.0, -base_width/2),
                (-base_length/2 - 1.0, base_width/2),
                base_width,
                "m", 
                "BASE WIDTH"
            ),
            DrawingDimension(
                (base_length/2 - dial_face_width/2, base_width/2 + 0.5),
                (base_length/2 + dial_face_width/2, base_width/2 + 0.5),
                dial_face_width,
                "m",
                "DIAL FACE THICKNESS"
            )
        ])
        
        return {
            'elements': elements,
            'dimensions': dimension_lines
        }
    
    def create_elevation_view_samrat_precise(self, dimensions: Dict, angles: Dict, coordinates: Dict, precise_geometry: Dict = None) -> Dict:
        """Create elevation view drawing for Samrat Yantra with shadow path calculations"""
        
        elements = []
        dimension_lines = []
        
        base_length = dimensions.get('base_length', 20.0)
        gnomon_height = dimensions.get('gnomon_height', base_length * math.tan(math.radians(abs(coordinates['latitude']))))
        
        # Base platform (side view)
        base_thickness = 0.5
        base_rect = Rectangle(
            (-base_length/2, -base_thickness/2),
            base_length,
            base_thickness,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.3
        )
        elements.append(base_rect)
        
        # Gnomon triangle (triangular face aligned north-south)
        gnomon_angle_rad = math.radians(angles['gnomon_angle'])
        gnomon_base_half = base_length / 2
        
        # Gnomon as triangular face
        gnomon_triangle = Polygon([
            (-gnomon_base_half, 0),  # South base
            (gnomon_base_half, 0),   # North base  
            (0, gnomon_height),      # Top point
            (-gnomon_base_half, 0)   # Close polygon
        ], linewidth=self.line_weights['outline'],
           edgecolor=self.colors['outline'],
           facecolor='lightblue',
           alpha=0.5)
        elements.append(gnomon_triangle)
        
        # Dial faces (vertical surfaces at east and west)
        dial_height = 3.0
        
        # East dial face (right side)
        east_dial = plt.Line2D(
            [base_length/2, base_length/2],
            [0, dial_height],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline'],
            label='East Dial Face'
        )
        elements.append(east_dial)
        
        # West dial face (left side)
        west_dial = plt.Line2D(
            [-base_length/2, -base_length/2],
            [0, dial_height],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline'],
            label='West Dial Face'
        )
        elements.append(west_dial)
        
        # Add shadow paths if precise geometry is available
        if precise_geometry and self.use_advanced_calculations:
            # Show sample shadow paths for different hours
            sample_hours = [9, 12, 15]  # Morning, noon, afternoon
            
            for hour in sample_hours:
                # Find hour line data for this hour
                east_point = None
                west_point = None
                
                if 'hour_lines' in precise_geometry:
                    if 'east' in precise_geometry['hour_lines']:
                        for h, point in precise_geometry['hour_lines']['east']:
                            if h == hour:
                                east_point = point
                                break
                    
                    if 'west' in precise_geometry['hour_lines']:
                        for h, point in precise_geometry['hour_lines']['west']:
                            if h == hour:
                                west_point = point
                                break
                
                # Draw shadow ray from gnomon tip to intersection point
                gnomon_tip = (0, gnomon_height)
                
                if east_point:
                    # Shadow line from gnomon tip to east dial face
                    shadow_x = base_length/2
                    shadow_y = east_point.position_3d.z  # Height on dial face
                    
                    shadow_line = plt.Line2D(
                        [gnomon_tip[0], shadow_x],
                        [gnomon_tip[1], shadow_y],
                        linewidth=self.line_weights['hour_lines'],
                        color=self.colors['hour_lines'],
                        linestyle='--',
                        alpha=0.7,
                        label=f'{hour}h shadow'
                    )
                    elements.append(shadow_line)
                    
                    # Mark intersection point
                    intersection_point = plt.Circle(
                        (shadow_x, shadow_y), 0.05,
                        color=self.colors['hour_lines'],
                        fill=True
                    )
                    elements.append(intersection_point)
                
                if west_point:
                    # Shadow line from gnomon tip to west dial face
                    shadow_x = -base_length/2
                    shadow_y = west_point.position_3d.z  # Height on dial face
                    
                    shadow_line = plt.Line2D(
                        [gnomon_tip[0], shadow_x],
                        [gnomon_tip[1], shadow_y],
                        linewidth=self.line_weights['hour_lines'],
                        color=self.colors['hour_lines'],
                        linestyle='--',
                        alpha=0.7
                    )
                    elements.append(shadow_line)
                    
                    intersection_point = plt.Circle(
                        (shadow_x, shadow_y), 0.05,
                        color=self.colors['hour_lines'],
                        fill=True
                    )
                    elements.append(intersection_point)
        
        # Ground reference line
        ground_line = plt.Line2D(
            [-base_length/2 - 1, base_length/2 + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-',
            alpha=0.5
        )
        elements.append(ground_line)
        
        # Dimensions
        dimension_lines.extend([
            DrawingDimension(
                (-0.5, 0),
                (-0.5, gnomon_height),
                gnomon_height,
                "m",
                f"GNOMON HEIGHT ({gnomon_height:.2f}m)"
            ),
            DrawingDimension(
                (-base_length/2, -1.0),
                (base_length/2, -1.0),
                base_length,
                "m",
                "BASE LENGTH"
            ),
            DrawingDimension(
                (base_length/2 + 0.5, 0),
                (base_length/2 + 0.5, dial_height),
                dial_height,
                "m",
                "DIAL FACE HEIGHT"
            ),
            DrawingDimension(
                (-base_length/2, base_thickness/2 + 0.2),
                (base_length/2, base_thickness/2 + 0.2),
                base_length,
                "m",
                f"GNOMON BASE ({base_length:.1f}m)"
            )
        ])
        
        return {
            'elements': elements,
            'dimensions': dimension_lines
        }
        
    def create_hour_line_detail_samrat(self, dimensions: Dict, coordinates: Dict, precise_geometry: Dict = None) -> Dict:
        """Create detailed hour line marking view with precise positions"""
        
        elements = []
        dimension_lines = []
        
        if precise_geometry and self.use_advanced_calculations and 'hour_lines' in precise_geometry:
            # Create detail view of east dial face with hour line positions
            dial_width = 2.0  # Detail view width
            dial_height = 3.0
            
            # Dial face outline
            dial_face = Rectangle(
                (-dial_width/2, 0),
                dial_width,
                dial_height,
                linewidth=self.line_weights['outline'],
                edgecolor=self.colors['outline'],
                facecolor='white',
                alpha=0.9
            )
            elements.append(dial_face)
            
            # Add precise hour line positions - use west face data if east is empty
            hour_data = precise_geometry['hour_lines'].get('east', [])
            if not hour_data:
                hour_data = precise_geometry['hour_lines'].get('west', [])
                
            for hour, point in hour_data:
                y_pos = point.surface_coords[0]  # Y coordinate on dial face
                z_pos = point.surface_coords[1]  # Z coordinate (height)
                
                # Scale to detail view
                detail_y = y_pos * 0.5  # Scale factor for detail view
                detail_z = z_pos * 0.8   # Scale factor for detail view
                
                # Hour marking point
                hour_mark = plt.Circle(
                    (detail_y, detail_z), 0.02,
                    color=self.colors['hour_lines'],
                    fill=True
                )
                elements.append(hour_mark)
                
                # Hour label
                elements.append(plt.text(detail_y + 0.1, detail_z, f'{hour:02d}:00', 
                                       fontsize=10, color=self.colors['hour_lines'],
                                       weight='bold'))
                
                # Dimension line to center
                dimension_lines.append(DrawingDimension(
                    (0, detail_z),
                    (detail_y, detail_z),
                    abs(detail_y),
                    "mm",
                    f"Hour {hour}"
                ))
            
            # Add title and scale info
            elements.append(plt.text(0, dial_height + 0.3, 
                                   "HOUR LINE POSITIONS (East Dial Face)", 
                                   fontsize=12, ha='center', weight='bold'))
            
            elements.append(plt.text(0, -0.3, 
                                   f"Calculated for {coordinates['latitude']:.4f}°N using ray-intersection method", 
                                   fontsize=10, ha='center', style='italic'))
        
        else:
            # Fallback message
            elements.append(plt.text(0, 1.5, 
                                   "Hour line details require advanced geometry calculations", 
                                   fontsize=12, ha='center', color='red'))
            
            elements.append(plt.text(0, 1.0, 
                                   "Enable YantraGeometryEngine for precise positions", 
                                   fontsize=10, ha='center', style='italic'))
        
        return {
            'elements': elements,
            'dimensions': dimension_lines
        }
    
    def create_construction_details_samrat(self, dimensions: Dict, angles: Dict) -> Dict:
        """Create construction detail drawings"""
        
        elements = []
        dimension_lines = []
        
        # Foundation detail
        foundation = Rectangle(
            (-dimensions['base_length']/2 - 0.2, -0.5),
            dimensions['base_length'] + 0.4,
            0.6,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray',
            alpha=0.3
        )
        elements.append(foundation)
        
        # Gnomon mounting detail
        mount_circle = Circle(
            (0, 0),
            0.1,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='yellow',
            alpha=0.5
        )
        elements.append(mount_circle)
        
        return {
            'elements': elements,
            'dimensions': dimension_lines
        }
    
    def create_rama_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Rama Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view with sector divisions and altitude markings
        plan_elements = []
        plan_dimensions = []
        
        # Outer cylindrical wall
        outer_circle = Circle(
            (0, 0),
            dimensions['outer_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(outer_circle)
        
        # Inner measurement circle
        inner_circle = Circle(
            (0, 0),
            dimensions['inner_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightblue',
            alpha=0.3
        )
        plan_elements.append(inner_circle)
        
        # Enhanced sector divisions with altitude-azimuth markings
        num_sectors = int(dimensions.get('num_sectors', 12))
        sector_angle = 360.0 / num_sectors
        
        # Add main sector division lines
        for i in range(num_sectors):
            angle_deg = i * sector_angle
            angle_rad = np.radians(angle_deg)
            
            # Sector boundary line
            line = plt.Line2D(
                [dimensions['inner_radius'] * np.cos(angle_rad), dimensions['outer_radius'] * np.cos(angle_rad)],
                [dimensions['inner_radius'] * np.sin(angle_rad), dimensions['outer_radius'] * np.sin(angle_rad)],
                linewidth=self.line_weights['construction'],
                color=self.colors['construction']
            )
            plan_elements.append(line)
            
            # Sector label (azimuth marking)
            label_radius = dimensions['outer_radius'] + 0.5
            label_x = label_radius * np.cos(angle_rad)
            label_y = label_radius * np.sin(angle_rad)
            plan_elements.append(plt.text(label_x, label_y, f'{angle_deg:.0f}°', 
                                        fontsize=10, ha='center', va='center',
                                        color=self.colors['construction']))
        
        # Add altitude scale markings (concentric circles)
        for alt in range(0, 91, 10):  # Every 10° altitude
            if alt > 0:  # Skip center point
                # Calculate radius for this altitude marking
                scale_radius = dimensions['inner_radius'] + (dimensions['outer_radius'] - dimensions['inner_radius']) * (alt / 90.0)
                
                alt_circle = Circle(
                    (0, 0),
                    scale_radius,
                    linewidth=self.line_weights['construction'],
                    edgecolor=self.colors['construction'],
                    facecolor='none',
                    linestyle='--',
                    alpha=0.6
                )
                plan_elements.append(alt_circle)
                
                # Altitude label
                plan_elements.append(plt.text(scale_radius, 0, f'{alt}°', 
                                            fontsize=8, ha='left', va='center',
                                            color=self.colors['construction']))
        
        # Cardinal direction markers
        cardinals = [('N', 0), ('E', 90), ('S', 180), ('W', 270)]
        for direction, angle_deg in cardinals:
            angle_rad = np.radians(angle_deg)
            marker_radius = dimensions['outer_radius'] + 1.0
            marker_x = marker_radius * np.cos(angle_rad)
            marker_y = marker_radius * np.sin(angle_rad)
            
            plan_elements.append(plt.text(marker_x, marker_y, direction, 
                                        fontsize=14, ha='center', va='center',
                                        weight='bold', color='red'))
        
        # Dimensions
        plan_dimensions.extend([
            DrawingDimension(
                (-dimensions['outer_radius'], -dimensions['outer_radius'] - 1.5),
                (dimensions['outer_radius'], -dimensions['outer_radius'] - 1.5),
                dimensions['outer_radius'] * 2,
                "m",
                "OUTER DIAMETER"
            ),
            DrawingDimension(
                (-dimensions['inner_radius'], dimensions['outer_radius'] + 2.0),
                (dimensions['inner_radius'], dimensions['outer_radius'] + 2.0),
                dimensions['inner_radius'] * 2,
                "m",
                "INNER MEASUREMENT AREA"
            )
        ])
        
        pages.append(BlueprintPage(
            title="RAMA YANTRA - PLAN VIEW WITH ALT-AZIMUTH GRID",
            scale="1:100",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Outer radius: {dimensions['outer_radius']:.2f}m",
                f"Inner radius: {dimensions['inner_radius']:.2f}m",
                f"Wall height: {dimensions['wall_height']:.2f}m",
                f"Number of sectors: {num_sectors}",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Altitude markings every 10° (0° to 90°)",
                "Azimuth sectors provide 360° coverage",
                "Wall material: Reinforced concrete M25"
            ]
        ))
        
        # Page 2: Cross-section showing wall construction
        section_elements = []
        section_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-dimensions['outer_radius'] - 1, dimensions['outer_radius'] + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        section_elements.append(ground_line)
        
        # Cylindrical wall cross-section
        wall_thickness = dimensions.get('wall_thickness', 0.3)
        wall_height = dimensions['wall_height']
        
        # Outer wall
        outer_wall_left = plt.Line2D(
            [-dimensions['outer_radius'], -dimensions['outer_radius']],
            [0, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(outer_wall_left)
        
        outer_wall_right = plt.Line2D(
            [dimensions['outer_radius'], dimensions['outer_radius']],
            [0, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(outer_wall_right)
        
        # Inner wall
        inner_wall_left = plt.Line2D(
            [-dimensions['inner_radius'], -dimensions['inner_radius']],
            [0, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(inner_wall_left)
        
        inner_wall_right = plt.Line2D(
            [dimensions['inner_radius'], dimensions['inner_radius']],
            [0, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(inner_wall_right)
        
        # Wall top connections
        wall_top_outer = plt.Line2D(
            [-dimensions['outer_radius'], -dimensions['inner_radius']],
            [wall_height, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(wall_top_outer)
        
        wall_top_inner = plt.Line2D(
            [dimensions['inner_radius'], dimensions['outer_radius']],
            [wall_height, wall_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(wall_top_inner)
        
        # Central observation area
        central_area = Rectangle(
            (-dimensions['inner_radius'], 0),
            dimensions['inner_radius'] * 2,
            0.1,
            linewidth=self.line_weights['construction'],
            edgecolor=self.colors['construction'],
            facecolor='lightgreen',
            alpha=0.3
        )
        section_elements.append(central_area)
        
        section_dimensions.extend([
            DrawingDimension(
                (-dimensions['outer_radius'] - 1.0, 0),
                (-dimensions['outer_radius'] - 1.0, wall_height),
                wall_height,
                "m",
                "WALL HEIGHT"
            ),
            DrawingDimension(
                (-dimensions['outer_radius'], -0.5),
                (dimensions['outer_radius'], -0.5),
                dimensions['outer_radius'] * 2,
                "m",
                "OVERALL DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="RAMA YANTRA - CROSS SECTION",
            scale="1:100",
            elements=section_elements,
            dimensions=section_dimensions,
            notes=[
                f"Wall thickness: {wall_thickness:.2f}m",
                f"Foundation depth: 0.5m minimum",
                "Central observation platform level",
                "Drainage channels in wall base",
                "Concrete grade: M25 minimum",
                "Surface finish: Smooth plaster or stone"
            ]
        ))
        
        return pages
    
    def create_jai_prakash_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Jai Prakash Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view with celestial coordinate grid
        plan_elements = []
        plan_dimensions = []
        
        # Hemisphere opening (top view)
        hemisphere_circle = Circle(
            (0, 0),
            dimensions['hemisphere_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightcyan',
            alpha=0.3
        )
        plan_elements.append(hemisphere_circle)
        
        # Outer rim
        rim_outer = Circle(
            (0, 0),
            dimensions['hemisphere_radius'] + dimensions['rim_thickness'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(rim_outer)
        
        # Add declination circles (projected to plan view)
        if 'declination_circles' in angles:
            for decl_name, decl_data in angles['declination_circles'].items():
                if isinstance(decl_data, dict) and 'radius' in decl_data:
                    decl_radius = decl_data['radius']
                    
                    decl_circle = Circle(
                        (0, 0),
                        decl_radius,
                        linewidth=self.line_weights['construction'],
                        edgecolor=self.colors['seasonal_curves'],
                        facecolor='none',
                        linestyle='--',
                        alpha=0.7
                    )
                    plan_elements.append(decl_circle)
                    
                    # Label declination
                    decl_angle = decl_data.get('angular_position', 0)
                    plan_elements.append(plt.text(decl_radius + 0.3, 0, f'{decl_angle:+.0f}°', 
                                                fontsize=8, ha='left', va='center',
                                                color=self.colors['seasonal_curves']))
        
        # Add hour circles (radial lines)
        if 'hour_circles' in angles:
            for hour_name, hour_data in angles['hour_circles'].items():
                if isinstance(hour_data, dict) and 'azimuth' in hour_data:
                    azimuth = hour_data['azimuth']
                    azimuth_rad = np.radians(azimuth)
                    
                    # Hour line from center to rim
                    hour_line = plt.Line2D(
                        [0, dimensions['hemisphere_radius'] * np.cos(azimuth_rad)],
                        [0, dimensions['hemisphere_radius'] * np.sin(azimuth_rad)],
                        linewidth=self.line_weights['hour_lines'],
                        color=self.colors['hour_lines'],
                        alpha=0.6
                    )
                    plan_elements.append(hour_line)
                    
                    # Hour label
                    label_radius = dimensions['hemisphere_radius'] + 0.4
                    label_x = label_radius * np.cos(azimuth_rad)
                    label_y = label_radius * np.sin(azimuth_rad)
                    
                    # Extract hour from hour_name (e.g., "hour_06" -> "6h")
                    hour_num = hour_name.split('_')[-1] if '_' in hour_name else hour_name
                    plan_elements.append(plt.text(label_x, label_y, f'{hour_num}h', 
                                                fontsize=8, ha='center', va='center',
                                                color=self.colors['hour_lines']))
        
        # Cardinal directions
        cardinals = [('N', 0), ('E', 90), ('S', 180), ('W', 270)]
        for direction, angle_deg in cardinals:
            angle_rad = np.radians(angle_deg)
            marker_radius = dimensions['hemisphere_radius'] + dimensions['rim_thickness'] + 0.8
            marker_x = marker_radius * np.cos(angle_rad)
            marker_y = marker_radius * np.sin(angle_rad)
            
            plan_elements.append(plt.text(marker_x, marker_y, direction, 
                                        fontsize=14, ha='center', va='center',
                                        weight='bold', color='red'))
        
        # Drainage channels (shown as small rectangles around rim)
        for i in range(0, 360, 90):  # Every 90°
            angle_rad = np.radians(i + 45)  # Offset by 45° from cardinals
            drain_radius = dimensions['hemisphere_radius'] + dimensions['rim_thickness'] * 0.7
            drain_x = drain_radius * np.cos(angle_rad)
            drain_y = drain_radius * np.sin(angle_rad)
            
            drain_rect = Rectangle(
                (drain_x - 0.1, drain_y - 0.1),
                0.2, 0.2,
                linewidth=self.line_weights['construction'],
                edgecolor=self.colors['construction'],
                facecolor='blue',
                alpha=0.5
            )
            plan_elements.append(drain_rect)
        
        plan_dimensions.extend([
            DrawingDimension(
                (-dimensions['hemisphere_radius'], -dimensions['hemisphere_radius'] - 1.5),
                (dimensions['hemisphere_radius'], -dimensions['hemisphere_radius'] - 1.5),
                dimensions['hemisphere_radius'] * 2,
                "m",
                "HEMISPHERE DIAMETER"
            ),
            DrawingDimension(
                (-dimensions['hemisphere_radius'] - dimensions['rim_thickness'], dimensions['hemisphere_radius'] + 2.0),
                (dimensions['hemisphere_radius'] + dimensions['rim_thickness'], dimensions['hemisphere_radius'] + 2.0),
                (dimensions['hemisphere_radius'] + dimensions['rim_thickness']) * 2,
                "m",
                "OVERALL DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="JAI PRAKASH YANTRA - PLAN VIEW WITH CELESTIAL GRID",
            scale="1:100",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Hemisphere radius: {dimensions['hemisphere_radius']:.2f}m",
                f"Rim thickness: {dimensions['rim_thickness']:.2f}m",
                f"Bowl depth: {dimensions['bowl_depth']:.2f}m",
                f"Declination circles for ±30° range",
                f"Hour circles for 24-hour solar tracking",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Interior surface: Smooth marble or polished stone",
                "Drainage channels at cardinal offset positions"
            ]
        ))
        
        # Page 2: Cross-section showing hemispherical construction
        section_elements = []
        section_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-dimensions['hemisphere_radius'] - dimensions['rim_thickness'] - 1, 
             dimensions['hemisphere_radius'] + dimensions['rim_thickness'] + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        section_elements.append(ground_line)
        
        # Hemisphere cross-section (semicircle)
        theta = np.linspace(0, np.pi, 50)
        hemisphere_x = dimensions['hemisphere_radius'] * np.cos(theta)
        hemisphere_y = -dimensions['hemisphere_radius'] * np.sin(theta)  # Inverted for bowl
        
        # Hemisphere interior surface
        hemisphere_line = plt.Line2D(
            hemisphere_x, hemisphere_y,
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(hemisphere_line)
        
        # Rim cross-section
        rim_left = plt.Line2D(
            [-dimensions['hemisphere_radius'] - dimensions['rim_thickness'], -dimensions['hemisphere_radius']],
            [0, 0],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(rim_left)
        
        rim_right = plt.Line2D(
            [dimensions['hemisphere_radius'], dimensions['hemisphere_radius'] + dimensions['rim_thickness']],
            [0, 0],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(rim_right)
        
        # Rim top surface
        rim_top = plt.Line2D(
            [-dimensions['hemisphere_radius'] - dimensions['rim_thickness'], 
             dimensions['hemisphere_radius'] + dimensions['rim_thickness']],
            [0.1, 0.1],  # Slight thickness for rim top
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(rim_top)
        
        # Foundation indication
        foundation_rect = Rectangle(
            (-dimensions['hemisphere_radius'] - dimensions['rim_thickness'] - 0.3, -0.5),
            (dimensions['hemisphere_radius'] + dimensions['rim_thickness'] + 0.3) * 2,
            0.5,
            linewidth=self.line_weights['construction'],
            edgecolor=self.colors['construction'],
            facecolor='gray',
            alpha=0.3
        )
        section_elements.append(foundation_rect)
        
        # Sample declination circle marking (shown as arc in cross-section)
        if 'declination_circles' in angles:
            # Show one declination circle as an example
            sample_decl = list(angles['declination_circles'].values())[0]
            if isinstance(sample_decl, dict) and 'height' in sample_decl:
                decl_height = -sample_decl['height']  # Negative for bowl depth
                decl_radius = sample_decl['radius']
                
                # Arc representing declination circle
                decl_arc_theta = np.linspace(-np.arccos(abs(decl_height)/dimensions['hemisphere_radius']),
                                           np.arccos(abs(decl_height)/dimensions['hemisphere_radius']), 20)
                decl_arc_x = decl_radius * np.cos(decl_arc_theta)
                decl_arc_y = np.full_like(decl_arc_x, decl_height)
                
                decl_arc_line = plt.Line2D(
                    decl_arc_x, decl_arc_y,
                    linewidth=self.line_weights['construction'],
                    color=self.colors['seasonal_curves'],
                    linestyle='--',
                    alpha=0.7
                )
                section_elements.append(decl_arc_line)
        
        section_dimensions.extend([
            DrawingDimension(
                (0, 0),
                (0, -dimensions['bowl_depth']),
                dimensions['bowl_depth'],
                "m",
                "BOWL DEPTH"
            ),
            DrawingDimension(
                (-dimensions['hemisphere_radius'] - dimensions['rim_thickness'], -1.0),
                (dimensions['hemisphere_radius'] + dimensions['rim_thickness'], -1.0),
                (dimensions['hemisphere_radius'] + dimensions['rim_thickness']) * 2,
                "m",
                "OVERALL DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="JAI PRAKASH YANTRA - CROSS SECTION",
            scale="1:100",
            elements=section_elements,
            dimensions=section_dimensions,
            notes=[
                "Excavated hemispherical bowl construction",
                f"Maximum depth: {dimensions['bowl_depth']:.2f}m",
                "Concrete lining with smooth finish",
                "Waterproofing membrane required",
                "Foundation extends 0.5m below rim level",
                "Interior surface tolerance: ±5mm"
            ]
        ))
        
        return pages
    
    def generate_pdf_blueprint(self, pages: List[BlueprintPage], output_path: str, 
                              specs: Dict) -> str:
        """Generate comprehensive PDF blueprint"""
        
        doc = SimpleDocTemplate(
            output_path,
            pagesize=self.paper_size,
            topMargin=self.margin,
            bottomMargin=self.margin,
            leftMargin=self.margin,
            rightMargin=self.margin
        )
        
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Title'],
            fontSize=16,
            spaceAfter=30,
            textColor=colors.darkblue,
            alignment=1  # Center
        )
        
        story = []
        
        # Title page
        story.append(Paragraph("YANTRA.AI", title_style))
        story.append(Paragraph("Ancient Indian Astronomical Instrument", styles['Heading2']))
        story.append(Paragraph(f"Construction Blueprint for {specs['name']}", styles['Heading3']))
        story.append(Spacer(1, 20))
        
        # Location info
        coords = specs['coordinates']
        if hasattr(coords, 'latitude'):
            lat, lon, elev = coords.latitude, coords.longitude, coords.elevation
        else:
            lat, lon, elev = coords['latitude'], coords['longitude'], coords['elevation']
            
        location_data = [
            ['Parameter', 'Value'],
            ['Latitude', f"{lat:.4f}°"],
            ['Longitude', f"{lon:.4f}°"],
            ['Elevation', f"{elev:.1f}m"],
            ['Generated', 'YANTRA.AI System']
        ]
        
        location_table = Table(location_data)
        location_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(location_table)
        story.append(Spacer(1, 30))
        
        # Generate drawing pages
        for i, page in enumerate(pages):
            if i > 0:
                story.append(Spacer(1, 20))
            
            # Page title
            story.append(Paragraph(page.title, styles['Heading2']))
            story.append(Paragraph(f"Scale: {page.scale}", styles['Normal']))
            story.append(Spacer(1, 10))
            
            # Create matplotlib figure for this page
            fig, ax = plt.subplots(1, 1, figsize=(12, 8))
            
            # Add drawing elements
            import matplotlib.patches as mpatches
            import matplotlib.lines as mlines
            
            for element in page.elements:
                try:
                    if hasattr(element, 'add_to_axes'):
                        element.add_to_axes(ax)
                    elif isinstance(element, mpatches.Patch):
                        ax.add_patch(element)
                    elif isinstance(element, mlines.Line2D):
                        ax.add_line(element)
                    elif hasattr(element, 'get_path'):  # Other patch objects
                        ax.add_patch(element)
                    else:
                        # For text or other elements, try to add them directly
                        ax.add_artist(element)
                except Exception as e:
                    # Skip elements that cause errors
                    print(f"Warning: Could not add element {type(element)}: {e}")
                    continue
            
            # Add dimensions
            for dim in page.dimensions:
                self.add_dimension_line(ax, dim)
            
            ax.set_xlim(-10, 10)
            ax.set_ylim(-8, 8)
            ax.set_aspect('equal')
            ax.grid(True, alpha=0.3)
            ax.set_title(page.title)
            
            # Save figure to bytes
            img_buffer = io.BytesIO()
            plt.savefig(img_buffer, format='png', dpi=300, bbox_inches='tight')
            img_buffer.seek(0)
            plt.close(fig)
            
            # Add image to PDF
            story.append(Image(img_buffer, width=400, height=300))
            story.append(Spacer(1, 10))
            
            # Add notes
            if page.notes:
                story.append(Paragraph("Construction Notes:", styles['Heading4']))
                for note in page.notes:
                    story.append(Paragraph(f"• {note}", styles['Normal']))
        
        # Build PDF
        doc.build(story)
        return output_path
    
    def add_dimension_line(self, ax, dimension: DrawingDimension):
        """Add dimension line to matplotlib axes"""
        
        start = dimension.start_point
        end = dimension.end_point
        
        # Dimension line
        ax.plot([start[0], end[0]], [start[1], end[1]], 
               color=self.colors['dimension'], 
               linewidth=self.line_weights['dimension'])
        
        # Dimension text
        mid_x = (start[0] + end[0]) / 2
        mid_y = (start[1] + end[1]) / 2
        
        ax.text(mid_x, mid_y, f"{dimension.value:.2f}{dimension.unit}", 
               fontsize=8, ha='center', va='bottom',
               bbox=dict(boxstyle="round,pad=0.3", facecolor='white', alpha=0.8))
    
    def generate_dxf_cad(self, pages: List[BlueprintPage], output_path: str) -> str:
        """Generate DXF CAD file for professional use"""
        
        doc = ezdxf.new('R2010')
        doc.units = units.M  # Meters
        
        msp = doc.modelspace()
        
        # Create layers
        doc.layers.new('OUTLINE', dxfattribs={'color': 1})  # Red
        doc.layers.new('DIMENSIONS', dxfattribs={'color': 2})  # Yellow
        doc.layers.new('CENTERLINES', dxfattribs={'color': 3})  # Green
        doc.layers.new('CONSTRUCTION', dxfattribs={'color': 8})  # Gray
        
        for page in pages:
            # Add title block
            msp.add_text(
                page.title,
                dxfattribs={
                    'layer': 'OUTLINE',
                    'height': 0.5,
                    'style': 'STANDARD'
                }
            ).set_pos((0, 10))
            
            # Process elements (simplified for DXF)
            for element in page.elements:
                if isinstance(element, Circle):
                    msp.add_circle(
                        (element.center[0], element.center[1]),
                        element.radius,
                        dxfattribs={'layer': 'OUTLINE'}
                    )
                elif isinstance(element, Rectangle):
                    corners = [
                        (element.get_x(), element.get_y()),
                        (element.get_x() + element.get_width(), element.get_y()),
                        (element.get_x() + element.get_width(), element.get_y() + element.get_height()),
                        (element.get_x(), element.get_y() + element.get_height()),
                        (element.get_x(), element.get_y())  # Close the rectangle
                    ]
                    msp.add_lwpolyline(corners, dxfattribs={'layer': 'OUTLINE'})
        
        doc.saveas(output_path)
        return output_path
    
    def create_digamsa_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Digamsa Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view showing base platform and azimuth markings
        plan_elements = []
        plan_dimensions = []
        
        # Base platform
        base_rect = Rectangle(
            (-dimensions['base_width']/2, -dimensions['base_length']/2),
            dimensions['base_width'],
            dimensions['base_length'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.3
        )
        plan_elements.append(base_rect)
        
        # Central pillar (top view)
        pillar_radius = 0.15
        pillar_circle = Circle(
            (0, 0),
            pillar_radius,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray',
            alpha=0.5
        )
        plan_elements.append(pillar_circle)
        
        # Semicircular arc projection (shows where arc will be)
        arc_radius = dimensions['arc_radius']
        theta_semi = np.linspace(0, np.pi, 25)
        arc_x = arc_radius * np.cos(theta_semi)
        arc_y = arc_radius * np.sin(theta_semi)
        
        arc_projection = plt.Line2D(
            arc_x, arc_y,
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='--',
            alpha=0.7,
            label='Arc Position (Vertical)'
        )
        plan_elements.append(arc_projection)
        
        # Azimuth markings around base
        azimuth_radius = min(dimensions['base_width'], dimensions['base_length']) * 0.4
        
        # Major azimuth divisions (every 30°)
        for az in range(0, 360, 30):
            az_rad = np.radians(az)
            inner_x = azimuth_radius * 0.8 * np.cos(az_rad)
            inner_y = azimuth_radius * 0.8 * np.sin(az_rad)
            outer_x = azimuth_radius * np.cos(az_rad)
            outer_y = azimuth_radius * np.sin(az_rad)
            
            az_line = plt.Line2D(
                [inner_x, outer_x],
                [inner_y, outer_y],
                linewidth=self.line_weights['construction'],
                color=self.colors['construction']
            )
            plan_elements.append(az_line)
            
            # Azimuth label
            label_x = azimuth_radius * 1.2 * np.cos(az_rad)
            label_y = azimuth_radius * 1.2 * np.sin(az_rad)
            plan_elements.append(plt.text(label_x, label_y, f'{az}°', 
                                        fontsize=9, ha='center', va='center',
                                        color=self.colors['construction']))
        
        # Cardinal directions
        cardinals = [('N', 0), ('E', 90), ('S', 180), ('W', 270)]
        for direction, angle_deg in cardinals:
            angle_rad = np.radians(angle_deg)
            marker_radius = azimuth_radius * 1.4
            marker_x = marker_radius * np.cos(angle_rad)
            marker_y = marker_radius * np.sin(angle_rad)
            
            plan_elements.append(plt.text(marker_x, marker_y, direction, 
                                        fontsize=14, ha='center', va='center',
                                        weight='bold', color='red'))
        
        # Arc mounting points (where arc connects to pillar)
        mount_points = [(0, pillar_radius), (0, -pillar_radius)]
        for mount_x, mount_y in mount_points:
            mount_point = Circle(
                (mount_x, mount_y),
                0.03,
                linewidth=self.line_weights['outline'],
                edgecolor=self.colors['outline'],
                facecolor='red'
            )
            plan_elements.append(mount_point)
        
        plan_dimensions.extend([
            DrawingDimension(
                (-dimensions['base_width']/2, -dimensions['base_length']/2 - 0.8),
                (dimensions['base_width']/2, -dimensions['base_length']/2 - 0.8),
                dimensions['base_width'],
                "m",
                "BASE WIDTH"
            ),
            DrawingDimension(
                (-dimensions['base_width']/2 - 0.8, -dimensions['base_length']/2),
                (-dimensions['base_width']/2 - 0.8, dimensions['base_length']/2),
                dimensions['base_length'],
                "m",
                "BASE LENGTH"
            ),
            DrawingDimension(
                (0, 0.3),
                (arc_radius, 0.3),
                arc_radius,
                "m",
                "ARC RADIUS"
            )
        ])
        
        pages.append(BlueprintPage(
            title="DIGAMSA YANTRA - PLAN VIEW WITH AZIMUTH GRID",
            scale="1:50",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Arc radius: {arc_radius:.2f}m",
                f"Base platform: {dimensions['base_width']:.2f}m × {dimensions['base_length']:.2f}m",
                f"Central pillar diameter: {pillar_radius * 2:.2f}m",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Azimuth markings every 30° for navigation",
                "Vertical semicircular arc for altitude measurement",
                "Precise north-south alignment required"
            ]
        ))
        
        # Page 2: Elevation view showing vertical semicircular arc
        elevation_elements = []
        elevation_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-arc_radius - 0.5, arc_radius + 0.5],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        elevation_elements.append(ground_line)
        
        # Central pillar (side view)
        pillar_height = dimensions.get('pillar_height', arc_radius * 1.2)
        pillar_rect = Rectangle(
            (-pillar_radius, 0),
            pillar_radius * 2,
            pillar_height,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray',
            alpha=0.5
        )
        elevation_elements.append(pillar_rect)
        
        # Semicircular arc (vertical)
        theta_arc = np.linspace(0, np.pi, 50)
        arc_center_y = pillar_height
        arc_x_elev = arc_radius * np.cos(theta_arc)
        arc_y_elev = arc_center_y + arc_radius * np.sin(theta_arc)
        
        arc_line_elev = plt.Line2D(
            arc_x_elev, arc_y_elev,
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(arc_line_elev)
        
        # Arc support connections to pillar
        left_support = plt.Line2D(
            [-arc_radius, -pillar_radius],
            [arc_center_y, pillar_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(left_support)
        
        right_support = plt.Line2D(
            [arc_radius, pillar_radius],
            [arc_center_y, pillar_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(right_support)
        
        # Base platform (side view)
        base_thickness = 0.2
        base_platform = Rectangle(
            (-dimensions['base_width']/2, -base_thickness),
            dimensions['base_width'],
            base_thickness,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.5
        )
        elevation_elements.append(base_platform)
        
        # Altitude scale markings on arc
        for alt in range(0, 91, 10):  # Every 10°
            alt_rad = np.radians(alt)
            mark_x = arc_radius * np.cos(alt_rad)
            mark_y = arc_center_y + arc_radius * np.sin(alt_rad)
            
            # Scale mark (radial line)
            mark_inner_x = (arc_radius - 0.1) * np.cos(alt_rad)
            mark_inner_y = arc_center_y + (arc_radius - 0.1) * np.sin(alt_rad)
            
            scale_mark = plt.Line2D(
                [mark_inner_x, mark_x],
                [mark_inner_y, mark_y],
                linewidth=self.line_weights['construction'],
                color=self.colors['construction']
            )
            elevation_elements.append(scale_mark)
            
            # Scale label
            label_x = (arc_radius + 0.3) * np.cos(alt_rad)
            label_y = arc_center_y + (arc_radius + 0.3) * np.sin(alt_rad)
            elevation_elements.append(plt.text(label_x, label_y, f'{alt}°', 
                                             fontsize=8, ha='center', va='center',
                                             color=self.colors['construction']))
        
        # Sighting mechanism (plumb line or sight)
        plumb_line = plt.Line2D(
            [0, 0],
            [arc_center_y, arc_center_y + arc_radius],
            linewidth=self.line_weights['hour_lines'],
            color=self.colors['hour_lines'],
            linestyle=':',
            alpha=0.7,
            label='Vertical Reference'
        )
        elevation_elements.append(plumb_line)
        
        # Foundation
        foundation_rect = Rectangle(
            (-dimensions['base_width']/2 - 0.2, -0.5),
            dimensions['base_width'] + 0.4,
            0.5,
            linewidth=self.line_weights['construction'],
            edgecolor=self.colors['construction'],
            facecolor='gray',
            alpha=0.3
        )
        elevation_elements.append(foundation_rect)
        
        elevation_dimensions.extend([
            DrawingDimension(
                (-pillar_radius - 0.3, 0),
                (-pillar_radius - 0.3, pillar_height),
                pillar_height,
                "m",
                "PILLAR HEIGHT"
            ),
            DrawingDimension(
                (0, arc_center_y + arc_radius + 0.4),
                (arc_radius, arc_center_y + arc_radius + 0.4),
                arc_radius,
                "m",
                "ARC RADIUS"
            ),
            DrawingDimension(
                (-dimensions['base_width']/2, -0.8),
                (dimensions['base_width']/2, -0.8),
                dimensions['base_width'],
                "m",
                "BASE WIDTH"
            )
        ])
        
        pages.append(BlueprintPage(
            title="DIGAMSA YANTRA - ELEVATION VIEW",
            scale="1:50",
            elements=elevation_elements,
            dimensions=elevation_dimensions,
            notes=[
                f"Pillar height: {pillar_height:.2f}m",
                f"Arc thickness: {dimensions.get('arc_thickness', 0.12):.2f}m",
                "Altitude scale: 0° to 90° in 10° increments",
                "Vertical reference line for measurements",
                "Material: Stone or reinforced concrete",
                "Precision mounting for arc alignment",
                "Foundation depth: 0.5m minimum"
            ]
        ))
        
        return pages
    
    def create_dhruva_protha_chakra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Dhruva-Protha-Chakra"""
        
        dimensions = specs['dimensions']
        
        pages = []
        
        # Plan view - circular disk
        plan_elements = []
        
        # Outer disk
        outer_disk = Circle(
            (0, 0),
            dimensions['disk_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightblue',
            alpha=0.3
        )
        plan_elements.append(outer_disk)
        
        # Central hole for pole star sighting
        central_hole = Circle(
            (0, 0),
            dimensions['central_hole_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='white'
        )
        plan_elements.append(central_hole)
        
        pages.append(BlueprintPage(
            title="DHRUVA-PROTHA-CHAKRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Disk radius: {dimensions['disk_radius']:.2f}m",
                f"Central hole: {dimensions['central_hole_radius']*1000:.0f}mm diameter",
                "24 hour divisions around circumference"
            ]
        ))
        
        return pages
    
    def create_kapala_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Kapala Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view with seasonal shadow curves
        plan_elements = []
        plan_dimensions = []
        
        # Outer rim
        outer_rim = Circle(
            (0, 0),
            dimensions['bowl_radius'] + dimensions['rim_width'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(outer_rim)
        
        # Bowl opening
        bowl_opening = Circle(
            (0, 0),
            dimensions['bowl_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightcyan',
            alpha=0.3
        )
        plan_elements.append(bowl_opening)
        
        # Central gnomon point
        gnomon_point = Circle(
            (0, 0),
            0.05,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='red'
        )
        plan_elements.append(gnomon_point)
        
        # Add seasonal shadow curves if available
        if 'seasonal_curves' in angles:
            curve_colors = {'summer': 'orange', 'winter': 'blue', 'equinox': 'green'}
            
            for season, curve_data in angles['seasonal_curves'].items():
                if isinstance(curve_data, dict) and 'curve_points' in curve_data:
                    points = curve_data['curve_points']
                    if len(points) > 1:
                        # Create curved line for seasonal shadow path
                        curve_x = [p[0] for p in points]
                        curve_y = [p[1] for p in points]
                        
                        season_color = curve_colors.get(season, self.colors['seasonal_curves'])
                        curve_line = plt.Line2D(
                            curve_x, curve_y,
                            linewidth=self.line_weights['hour_lines'],
                            color=season_color,
                            linestyle='-',
                            alpha=0.7,
                            label=f'{season.title()} path'
                        )
                        plan_elements.append(curve_line)
                        
                        # Season label
                        mid_idx = len(points) // 2
                        mid_x, mid_y = points[mid_idx]
                        plan_elements.append(plt.text(mid_x + 0.2, mid_y, season.title(), 
                                                    fontsize=9, color=season_color,
                                                    weight='bold'))
        
        # Hour markings around rim
        for hour in range(6, 19):  # 6 AM to 6 PM
            if hour == 12:
                continue  # Skip noon (vertical shadow)
            
            hour_angle = (hour - 12) * 15  # Degrees from solar noon
            hour_angle_corrected = hour_angle * math.sin(math.radians(coordinates.get('latitude', 0)))
            hour_rad = np.radians(hour_angle_corrected)
            
            # Hour marking on rim
            rim_radius = dimensions['bowl_radius'] + dimensions['rim_width'] * 0.7
            hour_x = rim_radius * np.sin(hour_rad)
            hour_y = rim_radius * np.cos(hour_rad)
            
            hour_mark = Circle(
                (hour_x, hour_y),
                0.03,
                linewidth=self.line_weights['construction'],
                edgecolor=self.colors['hour_lines'],
                facecolor=self.colors['hour_lines']
            )
            plan_elements.append(hour_mark)
            
            # Hour label
            label_radius = dimensions['bowl_radius'] + dimensions['rim_width'] + 0.3
            label_x = label_radius * np.sin(hour_rad)
            label_y = label_radius * np.cos(hour_rad)
            
            plan_elements.append(plt.text(label_x, label_y, f'{hour}h', 
                                        fontsize=8, ha='center', va='center',
                                        color=self.colors['hour_lines']))
        
        # Tilt indication (for bowl orientation)
        bowl_tilt = angles.get('bowl_tilt', 0)
        if bowl_tilt != 0:
            # Show tilt direction arrow
            tilt_arrow = plt.arrow(0, dimensions['bowl_radius'] * 0.8, 
                                 0, dimensions['bowl_radius'] * 0.3,
                                 head_width=0.1, head_length=0.1,
                                 fc='red', ec='red', alpha=0.7)
            plan_elements.append(tilt_arrow)
            
            plan_elements.append(plt.text(0.3, dimensions['bowl_radius'] * 0.9, 
                                        f'Tilt: {bowl_tilt:.1f}°', 
                                        fontsize=10, color='red'))
        
        plan_dimensions.extend([
            DrawingDimension(
                (-dimensions['bowl_radius'], -dimensions['bowl_radius'] - dimensions['rim_width'] - 1.0),
                (dimensions['bowl_radius'], -dimensions['bowl_radius'] - dimensions['rim_width'] - 1.0),
                dimensions['bowl_radius'] * 2,
                "m",
                "BOWL DIAMETER"
            ),
            DrawingDimension(
                (-dimensions['bowl_radius'] - dimensions['rim_width'], dimensions['bowl_radius'] + dimensions['rim_width'] + 0.5),
                (dimensions['bowl_radius'] + dimensions['rim_width'], dimensions['bowl_radius'] + dimensions['rim_width'] + 0.5),
                (dimensions['bowl_radius'] + dimensions['rim_width']) * 2,
                "m",
                "OVERALL DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="KAPALA YANTRA - PLAN VIEW WITH SHADOW CURVES",
            scale="1:50",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Bowl radius: {dimensions['bowl_radius']:.2f}m",
                f"Bowl depth: {dimensions['bowl_depth']:.2f}m",
                f"Rim width: {dimensions['rim_width']:.2f}m",
                f"Bowl tilt: {bowl_tilt:.1f}° (toward equator)",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Seasonal shadow curves marked in bowl",
                "Central gnomon rod: 0.3m height",
                "Interior finish: Smooth white stone"
            ]
        ))
        
        # Page 2: Cross-section showing bowl profile and shadow geometry
        section_elements = []
        section_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-dimensions['bowl_radius'] - dimensions['rim_width'] - 1, 
             dimensions['bowl_radius'] + dimensions['rim_width'] + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        section_elements.append(ground_line)
        
        # Bowl cross-section (parabolic/hemispherical profile)
        x_bowl = np.linspace(-dimensions['bowl_radius'], dimensions['bowl_radius'], 50)
        # Hemispherical profile
        y_bowl = -np.sqrt(dimensions['bowl_radius']**2 - x_bowl**2) + dimensions['bowl_radius'] - dimensions['bowl_depth']
        
        bowl_line = plt.Line2D(
            x_bowl, y_bowl,
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        section_elements.append(bowl_line)
        
        # Rim cross-sections
        rim_left = Rectangle(
            (-dimensions['bowl_radius'] - dimensions['rim_width'], 0),
            dimensions['rim_width'], 0.15,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.5
        )
        section_elements.append(rim_left)
        
        rim_right = Rectangle(
            (dimensions['bowl_radius'], 0),
            dimensions['rim_width'], 0.15,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.5
        )
        section_elements.append(rim_right)
        
        # Central gnomon
        gnomon_height = dimensions.get('gnomon_height', 0.3)
        gnomon_rod = plt.Line2D(
            [0, 0],
            [0, gnomon_height],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline']
        )
        section_elements.append(gnomon_rod)
        
        # Sample shadow ray
        sample_hour_angle = 30  # 2 PM example
        shadow_length = dimensions['bowl_radius'] * 0.8
        shadow_x = shadow_length * np.sin(np.radians(sample_hour_angle))
        shadow_y = y_bowl[np.argmin(np.abs(x_bowl - shadow_x))]  # Find bowl height at shadow point
        
        shadow_ray = plt.Line2D(
            [0, shadow_x],
            [gnomon_height, shadow_y],
            linewidth=self.line_weights['hour_lines'],
            color=self.colors['hour_lines'],
            linestyle='--',
            alpha=0.7,
            label='Shadow ray (2 PM example)'
        )
        section_elements.append(shadow_ray)
        
        section_dimensions.extend([
            DrawingDimension(
                (0, 0),
                (0, -dimensions['bowl_depth']),
                dimensions['bowl_depth'],
                "m",
                "BOWL DEPTH"
            ),
            DrawingDimension(
                (-dimensions['bowl_radius'] - dimensions['rim_width'], -0.8),
                (dimensions['bowl_radius'] + dimensions['rim_width'], -0.8),
                (dimensions['bowl_radius'] + dimensions['rim_width']) * 2,
                "m",
                "OVERALL DIAMETER"
            ),
            DrawingDimension(
                (0.2, 0),
                (0.2, gnomon_height),
                gnomon_height,
                "m",
                "GNOMON HEIGHT"
            )
        ])
        
        pages.append(BlueprintPage(
            title="KAPALA YANTRA - CROSS SECTION",
            scale="1:50",
            elements=section_elements,
            dimensions=section_dimensions,
            notes=[
                "Hemispherical bowl profile",
                f"Central gnomon: {gnomon_height:.2f}m height",
                "Smooth interior surface for accurate shadows",
                "Drainage hole at lowest point",
                "Foundation depth: 0.3m minimum",
                "Material: Stone or reinforced concrete"
            ]
        ))
        
        return pages
    
    def create_chakra_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Chakra Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view with ring system and degree markings
        plan_elements = []
        plan_dimensions = []
        
        # All rings from the enhanced calculations
        ring_names = ['outer_ring_radius', 'middle_ring_radius', 'inner_ring_radius', 'central_ring_radius']
        ring_colors = [self.colors['outline'], self.colors['construction'], 
                      self.colors['hour_lines'], self.colors['seasonal_curves']]
        
        for i, ring_name in enumerate(ring_names):
            if ring_name in dimensions:
                ring_radius = dimensions[ring_name]
                ring_color = ring_colors[i % len(ring_colors)]
                
                ring_circle = Circle(
                    (0, 0),
                    ring_radius,
                    linewidth=self.line_weights['outline'] if i == 0 else self.line_weights['construction'],
                    edgecolor=ring_color,
                    facecolor='none'
                )
                plan_elements.append(ring_circle)
                
                # Ring label
                plan_elements.append(plt.text(ring_radius + 0.1, 0, 
                                            ring_name.replace('_', ' ').title(), 
                                            fontsize=8, ha='left', va='center',
                                            color=ring_color))
        
        # Degree markings around outer ring
        outer_radius = dimensions.get('outer_ring_radius', 2.0)
        
        # Major divisions (every 30°)
        for deg in range(0, 360, 30):
            angle_rad = np.radians(deg)
            inner_x = (outer_radius - 0.1) * np.cos(angle_rad)
            inner_y = (outer_radius - 0.1) * np.sin(angle_rad)
            outer_x = (outer_radius + 0.1) * np.cos(angle_rad)
            outer_y = (outer_radius + 0.1) * np.sin(angle_rad)
            
            major_tick = plt.Line2D(
                [inner_x, outer_x],
                [inner_y, outer_y],
                linewidth=self.line_weights['outline'],
                color=self.colors['outline']
            )
            plan_elements.append(major_tick)
            
            # Degree label
            label_x = (outer_radius + 0.3) * np.cos(angle_rad)
            label_y = (outer_radius + 0.3) * np.sin(angle_rad)
            plan_elements.append(plt.text(label_x, label_y, f'{deg}°', 
                                        fontsize=10, ha='center', va='center',
                                        weight='bold'))
        
        # Minor divisions (every 5°)
        for deg in range(0, 360, 5):
            if deg % 30 != 0:  # Skip major divisions
                angle_rad = np.radians(deg)
                inner_x = (outer_radius - 0.05) * np.cos(angle_rad)
                inner_y = (outer_radius - 0.05) * np.sin(angle_rad)
                outer_x = (outer_radius + 0.05) * np.cos(angle_rad)
                outer_y = (outer_radius + 0.05) * np.sin(angle_rad)
                
                minor_tick = plt.Line2D(
                    [inner_x, outer_x],
                    [inner_y, outer_y],
                    linewidth=self.line_weights['construction'],
                    color=self.colors['construction'],
                    alpha=0.7
                )
                plan_elements.append(minor_tick)
        
        # Ring positioning markings from enhanced calculations
        if 'ring_positions' in angles:
            for pos_name, pos_data in angles['ring_positions'].items():
                if isinstance(pos_data, dict) and 'angle' in pos_data:
                    pos_angle = pos_data['angle']
                    pos_radius = pos_data.get('radius', outer_radius * 0.8)
                    
                    pos_rad = np.radians(pos_angle)
                    pos_x = pos_radius * np.cos(pos_rad)
                    pos_y = pos_radius * np.sin(pos_rad)
                    
                    # Position marker
                    pos_marker = Circle(
                        (pos_x, pos_y),
                        0.03,
                        linewidth=self.line_weights['hour_lines'],
                        edgecolor=self.colors['hour_lines'],
                        facecolor=self.colors['hour_lines']
                    )
                    plan_elements.append(pos_marker)
        
        # Central gnomon mount
        central_mount = Circle(
            (0, 0),
            0.05,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray'
        )
        plan_elements.append(central_mount)
        
        # Cardinal directions
        cardinals = [('N', 0), ('E', 90), ('S', 180), ('W', 270)]
        for direction, angle_deg in cardinals:
            angle_rad = np.radians(angle_deg)
            marker_radius = outer_radius + 0.6
            marker_x = marker_radius * np.cos(angle_rad)
            marker_y = marker_radius * np.sin(angle_rad)
            
            plan_elements.append(plt.text(marker_x, marker_y, direction, 
                                        fontsize=14, ha='center', va='center',
                                        weight='bold', color='red'))
        
        plan_dimensions.extend([
            DrawingDimension(
                (-outer_radius, -outer_radius - 0.8),
                (outer_radius, -outer_radius - 0.8),
                outer_radius * 2,
                "m",
                "OUTER RING DIAMETER"
            ),
            DrawingDimension(
                (-dimensions.get('inner_ring_radius', 1.0), outer_radius + 1.0),
                (dimensions.get('inner_ring_radius', 1.0), outer_radius + 1.0),
                dimensions.get('inner_ring_radius', 1.0) * 2,
                "m",
                "INNER RING DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="CHAKRA YANTRA - PLAN VIEW WITH RING SYSTEM",
            scale="1:50",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Outer ring radius: {dimensions.get('outer_ring_radius', 'N/A'):.2f}m",
                f"Inner rings for different solar functions",
                f"Equatorial ring tilt: {angles.get('equatorial_ring_tilt', 'N/A'):.1f}°",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Degree markings: Major every 30°, minor every 5°",
                "Ring material: Bronze or stainless steel",
                "Precision mounting required for accuracy"
            ]
        ))
        
        # Page 2: Elevation view showing ring tilts and mounting
        elevation_elements = []
        elevation_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-outer_radius - 1, outer_radius + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        elevation_elements.append(ground_line)
        
        # Central mounting post
        post_height = dimensions.get('mounting_post_height', 1.5)
        post_line = plt.Line2D(
            [0, 0],
            [0, post_height],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline']
        )
        elevation_elements.append(post_line)
        
        # Ring tilts (side view)
        equatorial_tilt = angles.get('equatorial_ring_tilt', coordinates.get('latitude', 0))
        tilt_rad = np.radians(equatorial_tilt)
        
        # Outer ring (tilted for equatorial alignment)
        ring_width = outer_radius
        ring_x_left = -ring_width * np.cos(tilt_rad)
        ring_y_left = post_height + ring_width * np.sin(tilt_rad)
        ring_x_right = ring_width * np.cos(tilt_rad)
        ring_y_right = post_height - ring_width * np.sin(tilt_rad)
        
        tilted_ring = plt.Line2D(
            [ring_x_left, ring_x_right],
            [ring_y_left, ring_y_right],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline'],
            label='Equatorial Ring'
        )
        elevation_elements.append(tilted_ring)
        
        # Inner rings (horizontal)
        inner_radius = dimensions.get('inner_ring_radius', outer_radius * 0.6)
        horizontal_ring = plt.Line2D(
            [-inner_radius, inner_radius],
            [post_height, post_height],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            label='Horizontal Rings'
        )
        elevation_elements.append(horizontal_ring)
        
        # Foundation
        foundation_rect = Rectangle(
            (-outer_radius * 0.3, -0.3),
            outer_radius * 0.6,
            0.3,
            linewidth=self.line_weights['construction'],
            edgecolor=self.colors['construction'],
            facecolor='gray',
            alpha=0.3
        )
        elevation_elements.append(foundation_rect)
        
        elevation_dimensions.extend([
            DrawingDimension(
                (-0.3, 0),
                (-0.3, post_height),
                post_height,
                "m",
                "MOUNTING HEIGHT"
            ),
            DrawingDimension(
                (ring_x_left, ring_y_left + 0.2),
                (ring_x_right, ring_y_right + 0.2),
                np.sqrt((ring_x_right - ring_x_left)**2 + (ring_y_right - ring_y_left)**2),
                "m",
                "RING DIAMETER"
            )
        ])
        
        pages.append(BlueprintPage(
            title="CHAKRA YANTRA - ELEVATION VIEW",
            scale="1:50",
            elements=elevation_elements,
            dimensions=elevation_dimensions,
            notes=[
                f"Equatorial ring tilt: {equatorial_tilt:.1f}° (= latitude)",
                f"Mounting post height: {post_height:.2f}m",
                "Horizontal rings for different measurements",
                "Precision bearings for ring rotation",
                "Weather-resistant materials required",
                "Annual calibration recommended"
            ]
        ))
        
        return pages
    
    def create_unnatamsa_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Unnatamsa Yantra using enhanced calculations"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        coordinates = specs['coordinates']
        
        pages = []
        
        # Page 1: Plan view showing quadrant layout and base platform
        plan_elements = []
        plan_dimensions = []
        
        # Base platform
        base_rect = Rectangle(
            (-dimensions['base_width']/2, -dimensions['base_length']/2),
            dimensions['base_width'],
            dimensions['base_length'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.3
        )
        plan_elements.append(base_rect)
        
        # Quadrant arc (top view projection)
        arc_radius = dimensions.get('arc_radius', dimensions.get('quadrant_radius', 3.0))
        
        # Quarter circle outline
        theta_quad = np.linspace(0, np.pi/2, 25)
        quad_x = arc_radius * np.cos(theta_quad)
        quad_y = arc_radius * np.sin(theta_quad)
        
        quadrant_line = plt.Line2D(
            quad_x, quad_y,
            linewidth=self.line_weights['outline'],
            color=self.colors['outline'],
            label='Quadrant Arc'
        )
        plan_elements.append(quadrant_line)
        
        # Vertical support post position
        post_circle = Circle(
            (0, 0),
            0.1,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray'
        )
        plan_elements.append(post_circle)
        
        # Altitude scale markings (projected)
        if 'altitude_markings' in angles:
            for alt_name, alt_data in angles['altitude_markings'].items():
                if isinstance(alt_data, dict) and 'position' in alt_data:
                    alt_angle = alt_data.get('angle', 0)
                    
                    # Position along the quadrant arc
                    pos_rad = np.radians(90 - alt_angle)  # Convert altitude to position angle
                    mark_x = arc_radius * np.cos(pos_rad)
                    mark_y = arc_radius * np.sin(pos_rad)
                    
                    # Altitude marking
                    alt_mark = Circle(
                        (mark_x, mark_y),
                        0.02,
                        linewidth=self.line_weights['construction'],
                        edgecolor=self.colors['construction'],
                        facecolor=self.colors['construction']
                    )
                    plan_elements.append(alt_mark)
                    
                    # Altitude label
                    if alt_angle % 10 == 0:  # Label every 10°
                        plan_elements.append(plt.text(mark_x + 0.1, mark_y + 0.1, f'{alt_angle:.0f}°', 
                                                    fontsize=8, color=self.colors['construction']))
        
        # Sighting arm indication (dashed line to arc)
        sighting_length = dimensions.get('sighting_arm_length', arc_radius * 0.95)
        sighting_line = plt.Line2D(
            [0, sighting_length],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['hour_lines'],
            linestyle='--',
            alpha=0.7,
            label='Sighting Arm (movable)'
        )
        plan_elements.append(sighting_line)
        
        # North direction indicator
        north_arrow = plt.arrow(0, dimensions['base_length']/2 - 0.5, 
                              0, 0.3,
                              head_width=0.1, head_length=0.1,
                              fc='red', ec='red')
        plan_elements.append(north_arrow)
        plan_elements.append(plt.text(0.2, dimensions['base_length']/2 - 0.2, 'N', 
                                    fontsize=12, color='red', weight='bold'))
        
        plan_dimensions.extend([
            DrawingDimension(
                (-dimensions['base_width']/2, -dimensions['base_length']/2 - 0.8),
                (dimensions['base_width']/2, -dimensions['base_length']/2 - 0.8),
                dimensions['base_width'],
                "m",
                "BASE WIDTH"
            ),
            DrawingDimension(
                (-dimensions['base_width']/2 - 0.8, -dimensions['base_length']/2),
                (-dimensions['base_width']/2 - 0.8, dimensions['base_length']/2),
                dimensions['base_length'],
                "m",
                "BASE LENGTH"
            ),
            DrawingDimension(
                (0, 0.2),
                (arc_radius, 0.2),
                arc_radius,
                "m",
                "ARC RADIUS"
            )
        ])
        
        pages.append(BlueprintPage(
            title="UNNATAMSA YANTRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Arc radius: {arc_radius:.2f}m",
                f"Base platform: {dimensions['base_width']:.2f}m × {dimensions['base_length']:.2f}m",
                f"Sighting arm length: {sighting_length:.2f}m",
                f"Optimized for latitude {coordinates.get('latitude', 'N/A'):.4f}°N",
                "Altitude markings every 5° (0° to 90°)",
                "Movable sighting arm with degree scale",
                "Align base platform north-south"
            ]
        ))
        
        # Page 2: Elevation view showing vertical quadrant structure
        elevation_elements = []
        elevation_dimensions = []
        
        # Ground level
        ground_line = plt.Line2D(
            [-dimensions['base_width']/2 - 0.5, dimensions['base_width']/2 + 0.5],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction'],
            linestyle='-'
        )
        elevation_elements.append(ground_line)
        
        # Vertical support post
        post_height = dimensions.get('vertical_post_height', dimensions.get('arc_radius', 3.0))
        post_line = plt.Line2D(
            [0, 0],
            [0, post_height],
            linewidth=self.line_weights['outline'] * 2,
            color=self.colors['outline']
        )
        elevation_elements.append(post_line)
        
        # Quarter circle arc (side view)
        theta_elev = np.linspace(0, np.pi/2, 50)
        arc_x_elev = arc_radius * np.cos(theta_elev)
        arc_y_elev = post_height - arc_radius + arc_radius * np.sin(theta_elev)
        
        arc_line_elev = plt.Line2D(
            arc_x_elev, arc_y_elev,
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(arc_line_elev)
        
        # Arc support structure
        arc_support_line = plt.Line2D(
            [0, arc_radius],
            [post_height - arc_radius, post_height - arc_radius],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(arc_support_line)
        
        arc_support_vertical = plt.Line2D(
            [arc_radius, arc_radius],
            [post_height - arc_radius, post_height],
            linewidth=self.line_weights['outline'],
            color=self.colors['outline']
        )
        elevation_elements.append(arc_support_vertical)
        
        # Base platform (side view)
        base_thickness = 0.2
        base_platform = Rectangle(
            (-dimensions['base_width']/2, -base_thickness),
            dimensions['base_width'],
            base_thickness,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.5
        )
        elevation_elements.append(base_platform)
        
        # Altitude scale markings on arc
        for alt in range(0, 91, 10):  # Every 10°
            alt_rad = np.radians(alt)
            mark_x = arc_radius * np.cos(alt_rad)
            mark_y = post_height - arc_radius + arc_radius * np.sin(alt_rad)
            
            # Scale mark
            mark_inner_x = (arc_radius - 0.05) * np.cos(alt_rad)
            mark_inner_y = post_height - arc_radius + (arc_radius - 0.05) * np.sin(alt_rad)
            
            scale_mark = plt.Line2D(
                [mark_inner_x, mark_x],
                [mark_inner_y, mark_y],
                linewidth=self.line_weights['construction'],
                color=self.colors['construction']
            )
            elevation_elements.append(scale_mark)
            
            # Scale label
            label_x = (arc_radius + 0.2) * np.cos(alt_rad)
            label_y = post_height - arc_radius + (arc_radius + 0.2) * np.sin(alt_rad)
            elevation_elements.append(plt.text(label_x, label_y, f'{alt}°', 
                                             fontsize=8, ha='center', va='center',
                                             color=self.colors['construction']))
        
        # Sample sighting line (45° example)
        sample_alt = 45
        sample_rad = np.radians(sample_alt)
        sight_end_x = arc_radius * np.cos(sample_rad)
        sight_end_y = post_height - arc_radius + arc_radius * np.sin(sample_rad)
        
        sample_sight = plt.Line2D(
            [0, sight_end_x],
            [post_height - arc_radius, sight_end_y],
            linewidth=self.line_weights['hour_lines'],
            color=self.colors['hour_lines'],
            linestyle='--',
            alpha=0.7,
            label='Sample sighting (45°)'
        )
        elevation_elements.append(sample_sight)
        
        elevation_dimensions.extend([
            DrawingDimension(
                (-0.4, 0),
                (-0.4, post_height),
                post_height,
                "m",
                "POST HEIGHT"
            ),
            DrawingDimension(
                (0, post_height + 0.3),
                (arc_radius, post_height + 0.3),
                arc_radius,
                "m",
                "ARC RADIUS"
            ),
            DrawingDimension(
                (-dimensions['base_width']/2, -0.6),
                (dimensions['base_width']/2, -0.6),
                dimensions['base_width'],
                "m",
                "BASE WIDTH"
            )
        ])
        
        pages.append(BlueprintPage(
            title="UNNATAMSA YANTRA - ELEVATION VIEW",
            scale="1:50",
            elements=elevation_elements,
            dimensions=elevation_dimensions,
            notes=[
                f"Vertical post height: {post_height:.2f}m",
                f"Arc material: Stone or metal",
                f"Base platform thickness: {base_thickness:.2f}m",
                "Altitude scale: 0° to 90° in 5° increments",
                "Precise alignment required: ±0.1°",
                "Foundation bolts: M12 stainless steel",
                "Weather protection for moving parts"
            ]
        ))
        
        return pages
    
    def export_blueprint(self, yantra_specs: Dict, format: str = 'pdf', 
                        output_dir: str = '.') -> str:
        """Main export function for blueprints"""
        
        # Generate blueprint pages based on yantra type
        yantra_name = yantra_specs['name'].lower().replace(' ', '_')
        
        if 'samrat' in yantra_name:
            pages = self.create_samrat_yantra_blueprint(yantra_specs)
        elif 'rama' in yantra_name:
            pages = self.create_rama_yantra_blueprint(yantra_specs)
        elif 'jai_prakash' in yantra_name:
            pages = self.create_jai_prakash_blueprint(yantra_specs)
        elif 'digamsa' in yantra_name:
            pages = self.create_digamsa_yantra_blueprint(yantra_specs)
        elif 'dhruva' in yantra_name or 'pole_circle' in yantra_name:
            pages = self.create_dhruva_protha_chakra_blueprint(yantra_specs)
        elif 'kapala' in yantra_name or 'bowl_sundial' in yantra_name:
            pages = self.create_kapala_yantra_blueprint(yantra_specs)
        elif 'chakra' in yantra_name and 'ring' in yantra_name:
            pages = self.create_chakra_yantra_blueprint(yantra_specs)
        elif 'unnatamsa' in yantra_name or 'solar_altitude' in yantra_name:
            pages = self.create_unnatamsa_yantra_blueprint(yantra_specs)
        else:
            raise ValueError(f"Unknown yantra type: {yantra_name}")
        
        # Generate output filename
        coords = yantra_specs['coordinates']
        if hasattr(coords, 'latitude'):
            lat, lon = coords.latitude, coords.longitude
        else:
            lat, lon = coords['latitude'], coords['longitude']
        filename = f"{yantra_name}_{lat:.2f}_{lon:.2f}".replace(' ', '_')
        
        if format.lower() == 'pdf':
            output_path = Path(output_dir) / f"{filename}_blueprint.pdf"
            return self.generate_pdf_blueprint(pages, str(output_path), yantra_specs)
        
        elif format.lower() == 'dxf':
            output_path = Path(output_dir) / f"{filename}_blueprint.dxf"
            return self.generate_dxf_cad(pages, str(output_path))
        
        else:
            raise ValueError(f"Unsupported format: {format}")

# Example usage
if __name__ == "__main__":
    generator = YantraBlueprintGenerator()
    
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
        }
    }
    
    # Generate PDF blueprint
    pdf_path = generator.export_blueprint(sample_specs, 'pdf', './output')
    print(f"PDF Blueprint generated: {pdf_path}")
    
    # Generate DXF CAD file
    dxf_path = generator.export_blueprint(sample_specs, 'dxf', './output')
    print(f"DXF CAD file generated: {dxf_path}")