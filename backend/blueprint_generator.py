"""
YANTRA.AI - Advanced Blueprint Generator
Creates detailed PDF and CAD export functionality for construction-ready drawings
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
    Advanced blueprint generator for ancient astronomical instruments
    Supports PDF, DXF (CAD), and PNG export formats
    """
    
    def __init__(self):
        self.drawing_scale = 1/100  # 1:100 scale default
        self.paper_size = A3
        self.margin = 20 * mm
        
        # Technical drawing standards
        self.line_weights = {
            'outline': 0.7,
            'hidden': 0.35,
            'dimension': 0.25,
            'centerline': 0.25,
            'construction': 0.18
        }
        
        self.colors = {
            'outline': 'black',
            'hidden': 'gray',
            'dimension': 'blue',
            'centerline': 'green',
            'construction': 'lightgray'
        }
    
    def create_samrat_yantra_blueprint(self, specs: Dict) -> List[BlueprintPage]:
        """Create detailed blueprint for Samrat Yantra"""
        
        dimensions = specs['dimensions']
        angles = specs['angles']
        
        pages = []
        
        # Page 1: Plan View (Top View)
        plan_view = self.create_plan_view_samrat(dimensions, angles)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - PLAN VIEW",
            scale="1:100",
            elements=plan_view['elements'],
            dimensions=plan_view['dimensions'],
            notes=[
                "All dimensions in meters",
                f"Gnomon angle: {angles['gnomon_angle']:.2f}°",
                "Orient true North-South",
                "Foundation depth: 0.5m minimum"
            ]
        ))
        
        # Page 2: Elevation View (Side View)
        elevation_view = self.create_elevation_view_samrat(dimensions, angles)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - ELEVATION VIEW",
            scale="1:100",
            elements=elevation_view['elements'],
            dimensions=elevation_view['dimensions'],
            notes=[
                f"Gnomon height: {dimensions['gnomon_height']:.2f}m",
                "Concrete grade: M25 minimum",
                "Steel reinforcement as per IS:456",
                "Surface finish: Smooth concrete"
            ]
        ))
        
        # Page 3: Construction Details
        detail_view = self.create_construction_details_samrat(dimensions, angles)
        pages.append(BlueprintPage(
            title="SAMRAT YANTRA - CONSTRUCTION DETAILS",
            scale="1:20",
            elements=detail_view['elements'],
            dimensions=detail_view['dimensions'],
            notes=[
                "Foundation bolts: M16 grade 8.8",
                "Gnomon material: Stainless steel",
                "Hour markings: Engraved 5mm deep",
                "Weather-resistant coating required"
            ]
        ))
        
        return pages
    
    def create_plan_view_samrat(self, dimensions: Dict, angles: Dict) -> Dict:
        """Create plan view drawing for Samrat Yantra"""
        
        elements = []
        dimension_lines = []
        
        # Base platform
        base_rect = Rectangle(
            (-dimensions['base_length']/2, -dimensions['base_width']/2),
            dimensions['base_length'],
            dimensions['base_width'],
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='none'
        )
        elements.append(base_rect)
        
        # Gnomon centerline
        gnomon_line = plt.Line2D(
            [0, 0],
            [-dimensions['base_width']/2, dimensions['base_width']/2],
            linewidth=self.line_weights['centerline'],
            color=self.colors['centerline'],
            linestyle='--'
        )
        elements.append(gnomon_line)
        
        # Hour lines
        for key, angle in angles.items():
            if key.startswith('hour_'):
                angle_rad = np.radians(angle)
                line_length = dimensions['base_length'] * 0.4
                
                hour_line = plt.Line2D(
                    [0, np.sin(angle_rad) * line_length],
                    [0, np.cos(angle_rad) * line_length],
                    linewidth=self.line_weights['construction'],
                    color=self.colors['construction']
                )
                elements.append(hour_line)
        
        # Dimensions
        dimension_lines.extend([
            DrawingDimension(
                (-dimensions['base_length']/2, -dimensions['base_width']/2 - 0.5),
                (dimensions['base_length']/2, -dimensions['base_width']/2 - 0.5),
                dimensions['base_length'],
                "m",
                "BASE LENGTH"
            ),
            DrawingDimension(
                (-dimensions['base_length']/2 - 0.5, -dimensions['base_width']/2),
                (-dimensions['base_length']/2 - 0.5, dimensions['base_width']/2),
                dimensions['base_width'],
                "m", 
                "BASE WIDTH"
            )
        ])
        
        return {
            'elements': elements,
            'dimensions': dimension_lines
        }
    
    def create_elevation_view_samrat(self, dimensions: Dict, angles: Dict) -> Dict:
        """Create elevation view drawing for Samrat Yantra"""
        
        elements = []
        dimension_lines = []
        
        # Base platform (side view)
        base_rect = Rectangle(
            (-dimensions['base_length']/2, -0.1),
            dimensions['base_length'],
            0.2,
            linewidth=self.line_weights['outline'],
            edgecolor=self.colors['outline'],
            facecolor='lightgray',
            alpha=0.3
        )
        elements.append(base_rect)
        
        # Gnomon triangle
        gnomon_angle_rad = np.radians(angles['gnomon_angle'])
        gnomon_top_x = dimensions['gnomon_height'] / np.tan(gnomon_angle_rad)
        
        gnomon_triangle = Polygon([
            (0, 0),
            (gnomon_top_x, dimensions['gnomon_height']),
            (0, dimensions['gnomon_height']),
            (0, 0)
        ], linewidth=self.line_weights['outline'],
           edgecolor=self.colors['outline'],
           facecolor='lightblue',
           alpha=0.5)
        elements.append(gnomon_triangle)
        
        # Ground line
        ground_line = plt.Line2D(
            [-dimensions['base_length']/2 - 1, dimensions['base_length']/2 + 1],
            [0, 0],
            linewidth=self.line_weights['construction'],
            color=self.colors['construction']
        )
        elements.append(ground_line)
        
        # Dimensions
        dimension_lines.extend([
            DrawingDimension(
                (0, -0.5),
                (0, dimensions['gnomon_height']),
                dimensions['gnomon_height'],
                "m",
                "GNOMON HEIGHT"
            ),
            DrawingDimension(
                (0, dimensions['gnomon_height'] + 0.3),
                (gnomon_top_x, dimensions['gnomon_height'] + 0.3),
                gnomon_top_x,
                "m",
                "GNOMON PROJECTION"
            )
        ])
        
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
        location_data = [
            ['Parameter', 'Value'],
            ['Latitude', f"{coords['latitude']:.4f}°"],
            ['Longitude', f"{coords['longitude']:.4f}°"],
            ['Elevation', f"{coords['elevation']:.1f}m"],
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
            for element in page.elements:
                if hasattr(element, 'add_to_axes'):
                    element.add_to_axes(ax)
                else:
                    ax.add_patch(element) if hasattr(element, 'get_path') else ax.add_line(element)
            
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
        else:
            raise ValueError(f"Unknown yantra type: {yantra_name}")
        
        # Generate output filename
        coords = yantra_specs['coordinates']
        filename = f"{yantra_name}_{coords['latitude']:.2f}_{coords['longitude']:.2f}"
        
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