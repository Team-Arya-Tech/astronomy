"""
YANTRA.AI FastAPI Backend
RESTful API for the parametric geometry engine
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import datetime
import uvicorn

from parametric_engine import ParametricGeometryEngine, Coordinates, YantraSpecs

# Initialize FastAPI app
app = FastAPI(
    title="YANTRA.AI API",
    description="Ancient Indian Astronomical Instruments Generator",
    version="1.0.0"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the parametric engine
engine = ParametricGeometryEngine()

# Pydantic models for API
class CoordinatesInput(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude in degrees")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude in degrees")
    elevation: float = Field(default=0.0, description="Elevation in meters above sea level")

class YantraRequest(BaseModel):
    coordinates: CoordinatesInput
    yantra_type: str = Field(..., description="Type of yantra to generate")
    reference_location: Optional[str] = Field(default="jaipur", description="Historical reference location")
    scale_factor: float = Field(default=1.0, gt=0, description="Scale factor for dimensions")

class SolarPositionRequest(BaseModel):
    coordinates: CoordinatesInput
    datetime: str = Field(..., description="ISO format datetime string")

class ManuscriptDecodeRequest(BaseModel):
    text: str = Field(..., description="Sanskrit astronomical text to decode")
    context: Optional[str] = Field(default="", description="Additional context about the manuscript")

class YantraResponse(BaseModel):
    name: str
    coordinates: Dict[str, float]
    dimensions: Dict[str, float]
    angles: Dict[str, float]
    construction_notes: List[str]
    accuracy_metrics: Dict[str, float]

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to YANTRA.AI - Ancient Indian Astronomical Instruments Generator",
        "version": "1.0.0",
        "docs": "/docs",
        "available_yantras": [
            "samrat_yantra",
            "rama_yantra", 
            "jai_prakash_yantra",
            "digamsa_yantra",
            "dhruva_protha_chakra",
            "kapala_yantra",
            "chakra_yantra",
            "unnatamsa_yantra"
        ]
    }

@app.get("/yantras/{yantra_type}/references")
async def get_yantra_references(yantra_type: str):
    """Get available historical references for a yantra type"""
    try:
        references = engine.get_available_references(yantra_type)
        if not references:
            raise HTTPException(
                status_code=404,
                detail=f"No references found for yantra type: {yantra_type}"
            )
        return {"yantra_type": yantra_type, "references": references}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/yantras/available")
async def get_available_yantras():
    """Get list of available yantra types"""
    return {
        "yantras": [
            {
                "id": "samrat_yantra",
                "name": "Samrat Yantra (Great Sundial)",
                "description": "Large sundial for precise time measurement",
                "accuracy": "±2 minutes"
            },
            {
                "id": "rama_yantra", 
                "name": "Rama Yantra (Cylindrical Altitude-Azimuth)",
                "description": "Cylindrical structure for measuring celestial coordinates",
                "accuracy": "±0.5° altitude, ±1° azimuth"
            },
            {
                "id": "jai_prakash_yantra",
                "name": "Jai Prakash Yantra (Hemispherical Sundial)", 
                "description": "Hemispherical bowl representing celestial sphere",
                "accuracy": "±1 minute time, ±0.5° coordinates"
            },
            {
                "id": "digamsa_yantra",
                "name": "Digamsa Yantra (Azimuth-Altitude Instrument)",
                "description": "Vertical semicircle for measuring azimuthal directions and horizon angles",
                "accuracy": "±0.5° azimuth and altitude"
            },
            {
                "id": "dhruva_protha_chakra",
                "name": "Dhruva-Protha-Chakra (Pole Circle)",
                "description": "Circular disk for determining celestial pole position and latitude",
                "accuracy": "±0.1° latitude, ±4 minutes time"
            },
            {
                "id": "kapala_yantra",
                "name": "Kapala Yantra (Bowl Sundial)",
                "description": "Hemispherical bowl sundial for time and seasonal observations",
                "accuracy": "±3 minutes time, ±3 days seasonal"
            },
            {
                "id": "chakra_yantra",
                "name": "Chakra Yantra (Ring Dial)",
                "description": "Nested circular rings for solar observations and tracking",
                "accuracy": "±0.2° angular measurements"
            },
            {
                "id": "unnatamsa_yantra",
                "name": "Unnatamsa Yantra (Solar Altitude Instrument)",
                "description": "Quarter-circle arc for measuring solar altitude angles",
                "accuracy": "±0.25° altitude, ±5 minutes time"
            }
        ]
    }

@app.post("/yantras/generate", response_model=YantraResponse)
async def generate_yantra(request: YantraRequest):
    """Generate yantra specifications for given coordinates"""
    
    try:
        print(f"Generating yantra: {request.yantra_type} at {request.coordinates.latitude}, {request.coordinates.longitude}")
        print(f"Reference location: {request.reference_location}")
        
        # Convert coordinates
        coords = Coordinates(
            latitude=request.coordinates.latitude,
            longitude=request.coordinates.longitude,
            elevation=request.coordinates.elevation
        )
        
        # Generate yantra based on type
        if request.yantra_type == "samrat_yantra":
            specs = engine.generate_samrat_yantra(coords, request.reference_location)
        elif request.yantra_type == "rama_yantra":
            specs = engine.generate_rama_yantra(coords, request.reference_location)
        elif request.yantra_type == "jai_prakash_yantra":
            specs = engine.generate_jai_prakash_yantra(coords, request.reference_location)
        elif request.yantra_type == "digamsa_yantra":
            # Check if function supports reference_location parameter
            try:
                specs = engine.generate_digamsa_yantra(coords, request.reference_location)
            except (TypeError, ValueError):
                specs = engine.generate_digamsa_yantra(coords)
        elif request.yantra_type == "dhruva_protha_chakra":
            try:
                specs = engine.generate_dhruva_protha_chakra(coords, request.reference_location)
            except (TypeError, ValueError):
                specs = engine.generate_dhruva_protha_chakra(coords)
        elif request.yantra_type == "kapala_yantra":
            try:
                specs = engine.generate_kapala_yantra(coords, request.reference_location)
            except (TypeError, ValueError):
                specs = engine.generate_kapala_yantra(coords)
        elif request.yantra_type == "chakra_yantra":
            try:
                specs = engine.generate_chakra_yantra(coords, request.reference_location)
            except (TypeError, ValueError):
                specs = engine.generate_chakra_yantra(coords)
        elif request.yantra_type == "unnatamsa_yantra":
            try:
                specs = engine.generate_unnatamsa_yantra(coords, request.reference_location)
            except (TypeError, ValueError):
                specs = engine.generate_unnatamsa_yantra(coords)
        else:
            raise HTTPException(
                status_code=400, 
                detail=f"Unknown yantra type: {request.yantra_type}"
            )
        
        # Apply scale factor if provided
        if request.scale_factor != 1.0:
            for key in specs.dimensions:
                specs.dimensions[key] *= request.scale_factor
        
        # Convert to response format
        return YantraResponse(
            name=specs.name,
            coordinates={
                "latitude": specs.coordinates.latitude,
                "longitude": specs.coordinates.longitude,
                "elevation": specs.coordinates.elevation
            },
            dimensions=specs.dimensions,
            angles=specs.angles,
            construction_notes=specs.construction_notes,
            accuracy_metrics=specs.accuracy_metrics
        )
        
    except ValueError as e:
        print(f"ValueError: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/solar/position")
async def calculate_solar_position(request: SolarPositionRequest):
    """Calculate solar position for given coordinates and time"""
    
    try:
        # Parse datetime
        dt = datetime.fromisoformat(request.datetime.replace('Z', '+00:00'))
        
        # Convert coordinates
        coords = Coordinates(
            latitude=request.coordinates.latitude,
            longitude=request.coordinates.longitude,
            elevation=request.coordinates.elevation
        )
        
        # Calculate solar position
        solar_pos = engine.calculate_solar_position(coords, dt)
        
        return {
            "solar_position": solar_pos,
            "coordinates": {
                "latitude": coords.latitude,
                "longitude": coords.longitude,
                "elevation": coords.elevation
            },
            "datetime": request.datetime
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=f"Invalid datetime format: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/yantras/export/{yantra_type}")
async def export_yantra_blueprint(
    yantra_type: str,
    latitude: float = Query(..., ge=-90, le=90),
    longitude: float = Query(..., ge=-180, le=180),
    elevation: float = Query(default=0.0),
    format: str = Query(default="blueprint", description="Export format: blueprint or json")
):
    """Export yantra specifications in various formats"""
    
    try:
        # Convert coordinates
        coords = Coordinates(latitude=latitude, longitude=longitude, elevation=elevation)
        
        # Generate yantra
        if yantra_type == "samrat_yantra":
            specs = engine.generate_samrat_yantra(coords)
        elif yantra_type == "rama_yantra":
            specs = engine.generate_rama_yantra(coords)
        elif yantra_type == "jai_prakash_yantra":
            specs = engine.generate_jai_prakash_yantra(coords)
        elif yantra_type == "digamsa_yantra":
            specs = engine.generate_digamsa_yantra(coords)
        elif yantra_type == "dhruva_protha_chakra":
            specs = engine.generate_dhruva_protha_chakra(coords)
        elif yantra_type == "kapala_yantra":
            specs = engine.generate_kapala_yantra(coords)
        elif yantra_type == "chakra_yantra":
            specs = engine.generate_chakra_yantra(coords)
        elif yantra_type == "unnatamsa_yantra":
            specs = engine.generate_unnatamsa_yantra(coords)
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unknown yantra type: {yantra_type}"
            )
        
        # Export in requested format
        exported = engine.export_specifications(specs, format)
        
        if format == "json":
            return {"content": exported, "content_type": "application/json"}
        else:
            return {"content": exported, "content_type": "text/plain"}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/coordinates/validate")
async def validate_coordinates(latitude: float, longitude: float):
    """Validate geographical coordinates and provide location info"""
    
    if not (-90 <= latitude <= 90):
        raise HTTPException(status_code=400, detail="Latitude must be between -90 and 90 degrees")
    
    if not (-180 <= longitude <= 180):
        raise HTTPException(status_code=400, detail="Longitude must be between -180 and 180 degrees")
    
    # Basic location categorization
    if latitude > 23.5:
        climate_zone = "Northern Temperate"
    elif latitude > 0:
        climate_zone = "Northern Tropical"
    elif latitude > -23.5:
        climate_zone = "Southern Tropical"
    else:
        climate_zone = "Southern Temperate"
    
    return {
        "valid": True,
        "latitude": latitude,
        "longitude": longitude,
        "climate_zone": climate_zone,
        "yantra_suitability": {
            "samrat_yantra": "Excellent" if abs(latitude) > 10 else "Good",
            "rama_yantra": "Excellent",
            "jai_prakash_yantra": "Excellent" if abs(latitude) < 60 else "Good",
            "digamsa_yantra": "Excellent",
            "dhruva_protha_chakra": "Excellent" if abs(latitude) > 5 else "Good",
            "kapala_yantra": "Excellent" if abs(latitude) < 65 else "Good",
            "chakra_yantra": "Excellent",
            "unnatamsa_yantra": "Excellent" if abs(latitude) > 5 else "Good"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/ai/manuscript-decode")
async def decode_manuscript(request: ManuscriptDecodeRequest):
    """Decode Sanskrit astronomical manuscript text into mathematical formulas"""
    
    try:
        # Simulate AI manuscript processing
        # In a real implementation, this would use NLP and Sanskrit processing
        
        # Sample processing based on common astronomical text patterns
        text = request.text.lower()
        decoded_formula = ""
        confidence = 0.85
        
        if "सूर्य" in text or "surya" in text:  # Sun
            decoded_formula = "Solar angle = arcsin(sin(δ) * sin(φ) + cos(δ) * cos(φ) * cos(H))"
            confidence = 0.92
        elif "चन्द्र" in text or "chandra" in text:  # Moon
            decoded_formula = "Lunar position = f(solar_longitude, lunar_node, time)"
            confidence = 0.88
        elif "ग्रह" in text or "graha" in text:  # Planet
            decoded_formula = "Planet_longitude = mean_longitude + equation_of_center"
            confidence = 0.82
        elif "यन्त्र" in text or "yantra" in text:  # Instrument
            decoded_formula = "Gnomon_height = base_length * tan(latitude)"
            confidence = 0.95
        else:
            # Generic astronomical formula
            decoded_formula = "Astronomical_parameter = trigonometric_function(celestial_coordinates)"
            confidence = 0.75
        
        # Generate implementation code
        implementation_code = f"""
# Generated from manuscript text
import math

def astronomical_calculation(latitude, longitude, time):
    \"\"\"
    Implementation derived from: {request.text[:50]}...
    Formula: {decoded_formula}
    \"\"\"
    # Convert to radians
    lat_rad = math.radians(latitude)
    
    # Sample calculation based on decoded formula
    result = math.sin(lat_rad) * math.cos(time)
    
    return result
"""
        
        return {
            "original_text": request.text,
            "decoded_formula": decoded_formula,
            "confidence": confidence,
            "context": request.context,
            "implementation": implementation_code.strip(),
            "notes": [
                "This is a simulated AI decoding process",
                "Real implementation would require advanced Sanskrit NLP",
                "Formula accuracy depends on manuscript clarity and context"
            ]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing manuscript: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )