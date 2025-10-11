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
        """Create detailed blueprint for Rama Yantra"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        
        pages = []
        
        # Plan view
        plan_elements = []
        plan_dimensions = []
        
        # Outer circle
        outer_circle = Circle(
            (0, 0),
            dimensions['outer_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(outer_circle)
        
        # Inner circle
        inner_circle = Circle(
            (0, 0),
            dimensions['inner_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightblue',
            alpha=0.3
        )
        plan_elements.append(inner_circle)
        
        # Sector divisions
        for i in range(int(angles['num_sectors'])):
            angle = i * np.radians(angles['sector_angle'])
            line = plt.Line2D(
                [0, dimensions['outer_radius'] * np.cos(angle)],
                [0, dimensions['outer_radius'] * np.sin(angle)],
                linewidth=self.line_weights['construction'],
                color=self.colors['construction']
            )
            plan_elements.append(line)
        
        pages.append(BlueprintPage(
            title="RAMA YANTRA - PLAN VIEW",
            scale="1:100",
            elements=plan_elements,
            dimensions=plan_dimensions,
            notes=[
                f"Outer radius: {dimensions['outer_radius']:.2f}m",
                f"Inner radius: {dimensions['inner_radius']:.2f}m",
                f"Number of sectors: {int(angles['num_sectors'])}",
                "Wall material: Reinforced concrete"
            ]
        ))
        
        return pages
    
    def create_jai_prakash_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Jai Prakash Yantra"""
        
        dimensions = specs['dimensions']
        
        pages = []
        
        # Plan view - circular rim
        plan_elements = []
        
        # Hemisphere outline (top view)
        hemisphere_circle = Circle(
            (0, 0),
            dimensions['hemisphere_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightcyan',
            alpha=0.3
        )
        plan_elements.append(hemisphere_circle)
        
        # Rim
        rim_outer = Circle(
            (0, 0),
            dimensions['hemisphere_radius'] + dimensions['rim_thickness'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(rim_outer)
        
        pages.append(BlueprintPage(
            title="JAI PRAKASH YANTRA - PLAN VIEW",
            scale="1:100",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Hemisphere radius: {dimensions['hemisphere_radius']:.2f}m",
                "Excavated hemispherical bowl",
                "Smooth interior surface finish",
                "Drainage provision required"
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
        """Create detailed blueprint for Digamsa Yantra"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        
        pages = []
        
        # Plan view - semicircular arc from above
        plan_elements = []
        
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
        pillar_circle = Circle(
            (0, 0),
            0.2,  # Pillar radius
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='gray',
            alpha=0.5
        )
        plan_elements.append(pillar_circle)
        
        pages.append(BlueprintPage(
            title="DIGAMSA YANTRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Arc radius: {dimensions['arc_radius']:.2f}m",
                f"Base platform: {dimensions['base_width']:.2f}m x {dimensions['base_length']:.2f}m",
                "Azimuth markings every 10° around base",
                "Central pillar for arc mounting"
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
        """Create detailed blueprint for Kapala Yantra"""
        
        dimensions = specs['dimensions']
        
        pages = []
        
        # Plan view - bowl from above
        plan_elements = []
        
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
        
        pages.append(BlueprintPage(
            title="KAPALA YANTRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Bowl radius: {dimensions['bowl_radius']:.2f}m",
                f"Bowl depth: {dimensions['bowl_depth']:.2f}m",
                f"Rim width: {dimensions['rim_width']:.2f}m"
            ]
        ))
        
        return pages
    
    def create_chakra_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Chakra Yantra"""
        
        dimensions = specs['dimensions']
        
        pages = []
        
        # Plan view - nested rings
        plan_elements = []
        
        # Outer ring
        outer_ring = Circle(
            (0, 0),
            dimensions['outer_ring_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(outer_ring)
        
        # Inner ring
        inner_ring = Circle(
            (0, 0),
            dimensions['inner_ring_radius'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        plan_elements.append(inner_ring)
        
        pages.append(BlueprintPage(
            title="CHAKRA YANTRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Outer ring radius: {dimensions['outer_ring_radius']:.2f}m",
                f"Inner ring radius: {dimensions['inner_ring_radius']:.2f}m",
                "Degree markings every 5°"
            ]
        ))
        
        return pages
    
    def create_unnatamsa_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Unnatamsa Yantra"""
        
        dimensions = specs['dimensions']
        
        pages = []
        
        # Plan view - quadrant from above
        plan_elements = []
        
        # Base platform
        base_rect = Rectangle(
            (0, 0),
            dimensions['base_length'],
            dimensions['base_width'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.3
        )
        plan_elements.append(base_rect)
        
        pages.append(BlueprintPage(
            title="UNNATAMSA YANTRA - PLAN VIEW",
            scale="1:50",
            elements=plan_elements,
            dimensions=[],
            notes=[
                f"Quadrant radius: {dimensions['quadrant_radius']:.2f}m",
                f"Base: {dimensions['base_length']:.2f}m x {dimensions['base_width']:.2f}m",
                "Altitude scale marked every 5°"
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
        elif 'unnatamsa' in yantra_name:
            pages = self.create_unnatamsa_yantra_blueprint(yantra_specs)
        else:
            raise ValueError(f"Unknown yantra type: {yantra_name}")
        
        # Generate output filename
        coords = yantra_specs['coordinates']
        if hasattr(coords, 'latitude'):
            lat, lon = coords.latitude, coords.longitude
        else:
            lat, lon = coords['latitude'], coords['longitude']
        filename = f"{yantra_name}_{lat:.2f}_{lon:.2f}"
        
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