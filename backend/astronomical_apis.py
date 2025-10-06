"""
YANTRA.AI - Astronomical APIs Integration
Real-time sky data integration with Skyfield, NASA JPL, and other astronomical services
"""

import numpy as np
from skyfield.api import load, wgs84
from skyfield.almanac import find_discrete, risings_and_settings
from skyfield import almanac
from datetime import datetime, timedelta
import requests
import json
from typing import Dict, List, Tuple, Optional
from dataclasses import dataclass
import pytz

@dataclass
class CelestialBody:
    """Represents a celestial body with its position"""
    name: str
    ra: float  # Right Ascension in degrees
    dec: float  # Declination in degrees
    alt: float  # Altitude in degrees
    az: float  # Azimuth in degrees
    distance: float  # Distance in AU
    magnitude: Optional[float] = None

@dataclass
class SolarData:
    """Solar position and timing data"""
    elevation: float  # Solar elevation angle
    azimuth: float  # Solar azimuth angle
    declination: float  # Solar declination
    equation_of_time: float  # Equation of time in minutes
    sunrise: datetime
    sunset: datetime
    solar_noon: datetime
    day_length: float  # Hours of daylight

@dataclass
class YantraAccuracy:
    """Accuracy verification results"""
    time_error_minutes: float
    position_error_degrees: float
    confidence_score: float
    verification_notes: List[str]

class AstronomicalDataProvider:
    """
    Integrates with multiple astronomical data sources for yantra accuracy verification
    """
    
    def __init__(self):
        # Load JPL ephemeris data
        self.ts = load.timescale()
        self.eph = load('de421.bsp')  # JPL DE421 ephemeris
        
        # Celestial bodies
        self.sun = self.eph['sun']
        self.moon = self.eph['moon']
        self.earth = self.eph['earth']
        
        # Planets
        self.planets = {
            'mercury': self.eph['mercury'],
            'venus': self.eph['venus'],
            'mars': self.eph['mars barycenter'],
            'jupiter': self.eph['jupiter barycenter'],
            'saturn': self.eph['saturn barycenter']
        }
        
        # NASA APIs
        self.nasa_api_key = "DEMO_KEY"  # Replace with actual API key
        
    def get_solar_position(self, latitude: float, longitude: float, 
                          elevation: float, dt: datetime) -> SolarData:
        """Get precise solar position using Skyfield"""
        
        # Create observer location
        location = wgs84.latlon(latitude, longitude, elevation_m=elevation)
        
        # Convert datetime to Skyfield time
        utc_dt = dt.replace(tzinfo=pytz.UTC) if dt.tzinfo is None else dt.astimezone(pytz.UTC)
        t = self.ts.from_datetime(utc_dt)
        
        # Calculate solar position
        astrometric = location.at(t).observe(self.sun)
        apparent = astrometric.apparent()
        
        # Get altitude and azimuth
        alt, az, _ = apparent.altaz()
        
        # Get right ascension and declination
        ra, dec, _ = apparent.radec()
        
        # Calculate equation of time
        equation_of_time = self.calculate_equation_of_time(t)
        
        # Find sunrise, sunset, and solar noon for this date
        sunrise, sunset, solar_noon = self.get_solar_events(location, dt.date())
        
        # Calculate day length
        day_length = (sunset - sunrise).total_seconds() / 3600
        
        return SolarData(
            elevation=alt.degrees,
            azimuth=az.degrees,
            declination=dec.degrees,
            equation_of_time=equation_of_time,
            sunrise=sunrise,
            sunset=sunset,
            solar_noon=solar_noon,
            day_length=day_length
        )
    
    def get_solar_events(self, location, date) -> Tuple[datetime, datetime, datetime]:
        """Get sunrise, sunset, and solar noon for a specific date"""
        
        # Create time range for the day
        start_time = self.ts.from_datetime(datetime.combine(date, datetime.min.time()).replace(tzinfo=pytz.UTC))
        end_time = start_time + 1  # One day later
        
        # Find sunrise and sunset
        f = almanac.sunrise_sunset(self.eph, location)
        times, events = find_discrete(start_time, end_time, f)
        
        sunrise = None
        sunset = None
        
        for t, event in zip(times, events):
            dt = t.utc_datetime()
            if event == 1:  # Sunrise
                sunrise = dt
            elif event == 0:  # Sunset
                sunset = dt
        
        # Calculate solar noon (when sun reaches highest point)
        # This is approximately when the sun's hour angle is 0
        solar_noon_approx = datetime.combine(date, datetime.min.time().replace(hour=12))
        solar_noon_approx = solar_noon_approx.replace(tzinfo=pytz.UTC)
        
        # Fine-tune solar noon by finding minimum solar hour angle
        solar_noon = self.find_solar_noon(location, solar_noon_approx)
        
        return sunrise, sunset, solar_noon
    
    def find_solar_noon(self, location, approximate_time: datetime) -> datetime:
        """Find precise solar noon by minimizing solar hour angle"""
        
        # Search around approximate time
        best_time = approximate_time
        min_hour_angle = float('inf')
        
        for minutes in range(-60, 61, 5):  # Search ±1 hour in 5-minute steps
            test_time = approximate_time + timedelta(minutes=minutes)
            t = self.ts.from_datetime(test_time)
            
            # Calculate hour angle
            astrometric = location.at(t).observe(self.sun)
            apparent = astrometric.apparent()
            ra, dec, _ = apparent.radec()
            
            # Convert to hour angle (0° at solar noon)
            lst = self.calculate_local_sidereal_time(t, location.longitude.degrees)
            hour_angle = lst - ra.hours * 15  # Convert hours to degrees
            hour_angle = ((hour_angle + 180) % 360) - 180  # Normalize to ±180°
            
            if abs(hour_angle) < abs(min_hour_angle):
                min_hour_angle = hour_angle
                best_time = test_time
        
        return best_time
    
    def calculate_equation_of_time(self, t) -> float:
        """Calculate equation of time in minutes"""
        
        # Simplified calculation based on solar position
        # This accounts for Earth's elliptical orbit and axial tilt
        
        # Get solar mean longitude
        days_since_j2000 = (t.tt - 2451545.0)
        mean_longitude = (280.460 + 0.9856474 * days_since_j2000) % 360
        
        # Calculate equation of time (simplified)
        mean_longitude_rad = np.radians(mean_longitude)
        equation_time = 4 * (mean_longitude - np.degrees(np.arctan2(
            np.tan(mean_longitude_rad),
            np.cos(np.radians(23.44))  # Earth's obliquity
        )))
        
        return equation_time  # Minutes
    
    def calculate_local_sidereal_time(self, t, longitude: float) -> float:
        """Calculate local sidereal time in degrees"""
        
        # Greenwich Sidereal Time
        gst = t.gast  # Greenwich Apparent Sidereal Time in hours
        
        # Convert to degrees and add longitude
        lst = (gst * 15 + longitude) % 360
        
        return lst
    
    def get_celestial_bodies(self, latitude: float, longitude: float,
                           elevation: float, dt: datetime) -> List[CelestialBody]:
        """Get positions of major celestial bodies"""
        
        location = wgs84.latlon(latitude, longitude, elevation_m=elevation)
        utc_dt = dt.replace(tzinfo=pytz.UTC) if dt.tzinfo is None else dt.astimezone(pytz.UTC)
        t = self.ts.from_datetime(utc_dt)
        
        bodies = []
        
        # Sun
        sun_astrometric = location.at(t).observe(self.sun)
        sun_apparent = sun_astrometric.apparent()
        sun_alt, sun_az, sun_dist = sun_apparent.altaz()
        sun_ra, sun_dec, _ = sun_apparent.radec()
        
        bodies.append(CelestialBody(
            name="Sun",
            ra=sun_ra.degrees,
            dec=sun_dec.degrees,
            alt=sun_alt.degrees,
            az=sun_az.degrees,
            distance=sun_dist.au,
            magnitude=-26.7
        ))
        
        # Moon
        moon_astrometric = location.at(t).observe(self.moon)
        moon_apparent = moon_astrometric.apparent()
        moon_alt, moon_az, moon_dist = moon_apparent.altaz()
        moon_ra, moon_dec, _ = moon_apparent.radec()
        
        bodies.append(CelestialBody(
            name="Moon",
            ra=moon_ra.degrees,
            dec=moon_dec.degrees,
            alt=moon_alt.degrees,
            az=moon_az.degrees,
            distance=moon_dist.au,
            magnitude=-12.6  # Approximate
        ))
        
        # Planets
        planet_magnitudes = {
            'mercury': -0.4,
            'venus': -4.6,
            'mars': -2.9,
            'jupiter': -2.9,
            'saturn': 0.4
        }
        
        for planet_name, planet_body in self.planets.items():
            try:
                planet_astrometric = location.at(t).observe(planet_body)
                planet_apparent = planet_astrometric.apparent()
                planet_alt, planet_az, planet_dist = planet_apparent.altaz()
                planet_ra, planet_dec, _ = planet_apparent.radec()
                
                bodies.append(CelestialBody(
                    name=planet_name.capitalize(),
                    ra=planet_ra.degrees,
                    dec=planet_dec.degrees,
                    alt=planet_alt.degrees,
                    az=planet_az.degrees,
                    distance=planet_dist.au,
                    magnitude=planet_magnitudes.get(planet_name)
                ))
            except Exception as e:
                print(f"Error calculating {planet_name} position: {e}")
        
        return bodies
    
    def verify_yantra_accuracy(self, yantra_specs: Dict, measurement_time: datetime,
                              measured_values: Dict) -> YantraAccuracy:
        """Verify yantra accuracy against precise astronomical data"""
        
        coords = yantra_specs['coordinates']
        
        # Get precise solar data
        solar_data = self.get_solar_position(
            coords['latitude'],
            coords['longitude'],
            coords['elevation'],
            measurement_time
        )
        
        verification_notes = []
        
        # Time accuracy verification
        if 'measured_time' in measured_values:
            # Compare measured time with solar noon or other reference
            measured_time_obj = measured_values['measured_time']
            time_error = abs((measured_time_obj - solar_data.solar_noon).total_seconds() / 60)
            verification_notes.append(f"Solar noon reference used for time verification")
        else:
            time_error = 0
            verification_notes.append("No time measurement provided")
        
        # Position accuracy verification
        position_error = 0
        if 'measured_solar_elevation' in measured_values:
            elevation_error = abs(measured_values['measured_solar_elevation'] - solar_data.elevation)
            position_error = max(position_error, elevation_error)
            verification_notes.append(f"Solar elevation error: {elevation_error:.2f}°")
        
        if 'measured_solar_azimuth' in measured_values:
            azimuth_error = abs(measured_values['measured_solar_azimuth'] - solar_data.azimuth)
            position_error = max(position_error, azimuth_error)
            verification_notes.append(f"Solar azimuth error: {azimuth_error:.2f}°")
        
        # Calculate confidence score
        time_score = max(0, 1 - time_error / 10)  # 10 minutes = 0 confidence
        position_score = max(0, 1 - position_error / 5)  # 5 degrees = 0 confidence
        confidence_score = (time_score + position_score) / 2
        
        # Add accuracy assessment
        if confidence_score > 0.9:
            verification_notes.append("Excellent accuracy - suitable for precise observations")
        elif confidence_score > 0.7:
            verification_notes.append("Good accuracy - suitable for educational use")
        elif confidence_score > 0.5:
            verification_notes.append("Fair accuracy - consider calibration adjustments")
        else:
            verification_notes.append("Poor accuracy - requires investigation")
        
        return YantraAccuracy(
            time_error_minutes=time_error,
            position_error_degrees=position_error,
            confidence_score=confidence_score,
            verification_notes=verification_notes
        )
    
    def get_astronomical_events(self, latitude: float, longitude: float,
                               start_date: datetime, end_date: datetime) -> Dict:
        """Get astronomical events for yantra planning"""
        
        location = wgs84.latlon(latitude, longitude)
        start_time = self.ts.from_datetime(start_date.replace(tzinfo=pytz.UTC))
        end_time = self.ts.from_datetime(end_date.replace(tzinfo=pytz.UTC))
        
        events = {}
        
        # Equinoxes and solstices
        seasons = almanac.seasons(self.eph)
        season_times, season_events = find_discrete(start_time, end_time, seasons)
        
        season_names = ['Spring Equinox', 'Summer Solstice', 'Autumn Equinox', 'Winter Solstice']
        events['seasons'] = []
        
        for t, event in zip(season_times, season_events):
            events['seasons'].append({
                'name': season_names[event],
                'time': t.utc_datetime(),
                'significance': 'Optimal time for yantra calibration'
            })
        
        # Moon phases
        moon_phases = almanac.moon_phases(self.eph)
        phase_times, phase_events = find_discrete(start_time, end_time, moon_phases)
        
        phase_names = ['New Moon', 'First Quarter', 'Full Moon', 'Last Quarter']
        events['moon_phases'] = []
        
        for t, event in zip(phase_times, phase_events):
            events['moon_phases'].append({
                'name': phase_names[event],
                'time': t.utc_datetime(),
                'significance': 'Good for lunar observations'
            })
        
        return events
    
    def calculate_yantra_corrections(self, yantra_specs: Dict, 
                                   current_time: datetime) -> Dict:
        """Calculate correction factors for better yantra accuracy"""
        
        coords = yantra_specs['coordinates']
        solar_data = self.get_solar_position(
            coords['latitude'],
            coords['longitude'],
            coords['elevation'],
            current_time
        )
        
        corrections = {}
        
        # Equation of time correction
        corrections['time_correction_minutes'] = solar_data.equation_of_time
        corrections['explanation'] = f"Add {solar_data.equation_of_time:.1f} minutes to sundial time to get mean solar time"
        
        # Seasonal declination effect
        corrections['seasonal_declination'] = solar_data.declination
        corrections['declination_effect'] = f"Sun's declination: {solar_data.declination:.2f}° affects shadow patterns"
        
        # Atmospheric refraction (simplified)
        if solar_data.elevation > 0:
            refraction = 1.02 / np.tan(np.radians(solar_data.elevation + 10.3 / (solar_data.elevation + 5.11)))
            corrections['atmospheric_refraction_arcmin'] = refraction
            corrections['refraction_note'] = f"Atmospheric refraction: {refraction:.1f} arcminutes"
        
        return corrections

# NASA API integration
class NASADataProvider:
    """Integration with NASA APIs for additional astronomical data"""
    
    def __init__(self, api_key: str = "DEMO_KEY"):
        self.api_key = api_key
        self.base_url = "https://api.nasa.gov"
    
    def get_earth_imagery(self, latitude: float, longitude: float, 
                         date: str) -> Optional[str]:
        """Get NASA Earth imagery for location visualization"""
        
        url = f"{self.base_url}/planetary/earth/imagery"
        params = {
            'lon': longitude,
            'lat': latitude,
            'date': date,
            'dim': 0.5,  # Width and height of image in degrees
            'api_key': self.api_key
        }
        
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                return response.json().get('url')
        except Exception as e:
            print(f"NASA Earth imagery request failed: {e}")
        
        return None
    
    def get_solar_system_data(self) -> Dict:
        """Get current solar system data from NASA"""
        
        # This would integrate with NASA's JPL Small-Body Database
        # For now, return sample data structure
        return {
            'planets': ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn'],
            'current_missions': ['Parker Solar Probe', 'Solar Orbiter'],
            'solar_activity': 'Moderate',
            'space_weather': 'Normal'
        }

# Example usage
if __name__ == "__main__":
    # Initialize providers
    astro_provider = AstronomicalDataProvider()
    nasa_provider = NASADataProvider()
    
    # Test coordinates (Delhi, India)
    latitude, longitude, elevation = 28.6139, 77.2090, 216
    test_time = datetime(2025, 3, 21, 12, 0)  # Spring equinox noon
    
    # Get solar position
    solar_data = astro_provider.get_solar_position(latitude, longitude, elevation, test_time)
    print("SOLAR POSITION DATA:")
    print("=" * 30)
    print(f"Elevation: {solar_data.elevation:.2f}°")
    print(f"Azimuth: {solar_data.azimuth:.2f}°")
    print(f"Declination: {solar_data.declination:.2f}°")
    print(f"Equation of Time: {solar_data.equation_of_time:.1f} minutes")
    print(f"Sunrise: {solar_data.sunrise.strftime('%H:%M UTC')}")
    print(f"Sunset: {solar_data.sunset.strftime('%H:%M UTC')}")
    print(f"Day Length: {solar_data.day_length:.1f} hours")
    
    # Get celestial bodies
    bodies = astro_provider.get_celestial_bodies(latitude, longitude, elevation, test_time)
    print(f"\nCELESTIAL BODIES:")
    print("=" * 30)
    for body in bodies:
        print(f"{body.name}: Alt={body.alt:.1f}°, Az={body.az:.1f}°, Mag={body.magnitude}")
    
    # Test yantra accuracy verification
    sample_specs = {
        'coordinates': {'latitude': latitude, 'longitude': longitude, 'elevation': elevation}
    }
    
    sample_measurements = {
        'measured_solar_elevation': 45.5,  # Degrees
        'measured_time': test_time
    }
    
    accuracy = astro_provider.verify_yantra_accuracy(sample_specs, test_time, sample_measurements)
    print(f"\nYANTRA ACCURACY VERIFICATION:")
    print("=" * 30)
    print(f"Time Error: {accuracy.time_error_minutes:.1f} minutes")
    print(f"Position Error: {accuracy.position_error_degrees:.2f}°")
    print(f"Confidence Score: {accuracy.confidence_score:.1%}")
    for note in accuracy.verification_notes:
        print(f"- {note}")