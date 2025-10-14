import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Chip,
  Divider,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  ExpandMore,
  Architecture,
  Functions,
  Image,
  Description,
  Settings,
  Download
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Learn = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedYantra, setSelectedYantra] = useState(0);

  // Comprehensive yantra information
  const yantras = [
    {
      name: 'Samrat Yantra',
      subtitle: 'The Supreme Instrument',
      category: 'Sundial',
      image: '/images/samrat-yantra.jpg',
      description: 'The Samrat Yantra is the largest and most impressive sundial at Jantar Mantar observatories. It consists of a massive triangular gnomon (pointer) aligned parallel to the Earth\'s axis, with two quadrant-shaped dials on either side. This monumental instrument can measure time with an accuracy of about 2 seconds.',
      
      howItWorks: {
        principle: 'The Samrat Yantra works on the principle of shadow projection. As the sun moves across the sky, the gnomon casts a shadow on the graduated dial faces on either side. The position of the shadow\'s edge on the dial indicates the local solar time.',
        
        components: [
          {
            name: 'Gnomon (Shanku)',
            description: 'The triangular wall aligned parallel to Earth\'s axis (at the site\'s latitude angle). Acts as the shadow-casting element.',
            specs: 'Height = Base × tan(latitude)'
          },
          {
            name: 'Dial Faces',
            description: 'Two quadrant-shaped surfaces on the east and west sides of the gnomon, calibrated with hour lines and seasonal curves.',
            specs: 'Vertical planes perpendicular to the gnomon'
          },
          {
            name: 'Hour Lines',
            description: 'Radiating lines from the gnomon base marking each hour of the day.',
            specs: 'Calculated using ray-plane intersection algorithms'
          },
          {
            name: 'Seasonal Curves',
            description: 'Hyperbolic curves showing shadow positions for different seasons (equinoxes and solstices).',
            specs: 'Derived from solar declination angles'
          }
        ],
        
        operation: [
          'The gnomon is aligned such that its hypotenuse points towards the celestial pole (parallel to Earth\'s axis)',
          'As the sun moves, the shadow of the gnomon\'s edge falls on the dial face',
          'The shadow moves along the hour lines, indicating the local solar time',
          'The position along the seasonal curves indicates the sun\'s declination (season)',
          'The east dial is used when the sun is in the east (morning), and the west dial when the sun is in the west (afternoon)'
        ]
      },
      
      formulas: {
        title: 'Mathematical Principles',
        equations: [
          {
            name: 'Gnomon Angle',
            formula: 'θ = φ',
            description: 'The gnomon is inclined at an angle equal to the site latitude (φ)',
            latex: '\\theta = \\phi'
          },
          {
            name: 'Gnomon Height',
            formula: 'h = L × tan(φ)',
            description: 'Height of gnomon based on base length L and latitude φ',
            latex: 'h = L \\times \\tan(\\phi)'
          },
          {
            name: 'Solar Position - Altitude',
            formula: 'sin(a) = sin(φ)sin(δ) + cos(φ)cos(δ)cos(H)',
            description: 'Solar altitude (a) based on latitude (φ), declination (δ), and hour angle (H)',
            latex: '\\sin(a) = \\sin(\\phi)\\sin(\\delta) + \\cos(\\phi)\\cos(\\delta)\\cos(H)'
          },
          {
            name: 'Solar Position - Azimuth',
            formula: 'sin(A) = cos(δ)sin(H) / cos(a)',
            description: 'Solar azimuth (A) calculation',
            latex: '\\sin(A) = \\frac{\\cos(\\delta)\\sin(H)}{\\cos(a)}'
          },
          {
            name: 'Shadow Position (Ray-Plane Intersection)',
            formula: 't = (P₀ - O) · n / (d · n)',
            description: 'Shadow tip position using ray-plane intersection, where O is ray origin (gnomon tip), d is shadow direction, P₀ is a point on the dial plane, and n is the plane normal',
            latex: 't = \\frac{(P_0 - O) \\cdot n}{d \\cdot n}'
          },
          {
            name: 'Solar Declination',
            formula: 'δ = 23.45° × sin(360° × (284 + n) / 365)',
            description: 'Solar declination for day of year n',
            latex: '\\delta = 23.45^\\circ \\times \\sin\\left(\\frac{360^\\circ \\times (284 + n)}{365}\\right)'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Base Length': '15-30 meters',
          'Gnomon Height': '10-25 meters (varies with latitude)',
          'Dial Width': '5-8 meters',
          'Wall Thickness': '0.3-0.5 meters'
        },
        accuracy: 'Approximately 2 seconds',
        materials: 'Marble, limestone, or sandstone',
        orientation: 'Gnomon aligned North-South, hypotenuse pointing to celestial pole'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Site Preparation and Latitude Determination',
          description: 'Accurately determine the site latitude using astronomical observations. Level and prepare the foundation aligned precisely North-South.'
        },
        {
          step: 2,
          title: 'Base Construction',
          description: 'Build the rectangular base platform with proper drainage. Ensure it is perfectly horizontal and stable.'
        },
        {
          step: 3,
          title: 'Gnomon Construction',
          description: 'Construct the triangular gnomon wall at an angle equal to the site latitude. The hypotenuse must point towards the celestial pole (align with Earth\'s axis).'
        },
        {
          step: 4,
          title: 'Dial Face Installation',
          description: 'Install the east and west dial faces as vertical planes perpendicular to the gnomon. Ensure smooth, precise surfaces for shadow reading.'
        },
        {
          step: 5,
          title: 'Hour Line Calibration',
          description: 'Calculate and mark hour lines using ray-tracing calculations. Verify using actual solar observations at known times.'
        },
        {
          step: 6,
          title: 'Seasonal Curve Marking',
          description: 'Mark hyperbolic curves for equinoxes and solstices based on solar declination calculations.'
        }
      ],
      
      useCases: [
        'Precise time measurement (accurate to seconds)',
        'Determining solar noon and equation of time',
        'Tracking seasonal variations in solar position',
        'Educational demonstrations of Earth\'s rotation',
        'Astronomical observations and calendar calibration'
      ]
    },
    
    {
      name: 'Rama Yantra',
      subtitle: 'Cylindrical Coordinate Instrument',
      category: 'Altitude-Azimuth',
      image: '/images/rama-yantra.jpg',
      description: 'The Rama Yantra consists of cylindrical structures with radial walls forming sectors. It measures both altitude (elevation above horizon) and azimuth (compass direction) of celestial objects. A central pillar or sighting mechanism allows observers to track the position of the sun, moon, and stars in a cylindrical coordinate system.',
      
      howItWorks: {
        principle: 'The Rama Yantra uses a cylindrical coordinate system where the height on the cylinder wall represents altitude and the angular position around the cylinder represents azimuth. Observers use a central sighting device to align with a celestial object, and read its coordinates on the calibrated walls.',
        
        components: [
          {
            name: 'Cylindrical Walls',
            description: 'Vertical cylindrical walls divided into sectors, with altitude markings on the inner surface.',
            specs: 'Radius: 8-10 meters, Height: 3-4 meters'
          },
          {
            name: 'Radial Dividers',
            description: 'Walls dividing the cylinder into 12 sectors (30° each), representing azimuth divisions.',
            specs: '12 sectors × 30° = 360° coverage'
          },
          {
            name: 'Central Pillar',
            description: 'A vertical pillar at the center used for sighting and alignment.',
            specs: 'Height matches cylinder height'
          },
          {
            name: 'Altitude Scales',
            description: 'Graduated markings on the cylinder walls indicating altitude from 0° (horizon) to 90° (zenith).',
            specs: 'Typically marked every 1° or 0.5°'
          }
        ],
        
        operation: [
          'Observer stands at the center of the cylindrical structure',
          'Using a sighting device aligned with the central pillar, the observer aims at a celestial object',
          'The azimuth (compass direction) is read from the sector the object appears in',
          'The altitude (elevation angle) is read from the height markings on the cylinder wall',
          'The combination provides the complete altitude-azimuth coordinates of the celestial object'
        ]
      },
      
      formulas: {
        title: 'Cylindrical Coordinate Mathematics',
        equations: [
          {
            name: 'Altitude from Height',
            formula: 'a = (z / H) × 90°',
            description: 'Altitude angle (a) from height (z) on cylinder of total height H',
            latex: 'a = \\frac{z}{H} \\times 90^\\circ'
          },
          {
            name: 'Azimuth from Angular Position',
            formula: 'A = θ',
            description: 'Azimuth (A) directly corresponds to angular position (θ) around the cylinder',
            latex: 'A = \\theta'
          },
          {
            name: 'Cartesian to Cylindrical',
            formula: 'x = r cos(θ), y = r sin(θ), z = z',
            description: 'Conversion from cylindrical (r, θ, z) to Cartesian coordinates',
            latex: 'x = r\\cos(\\theta), \\quad y = r\\sin(\\theta), \\quad z = z'
          },
          {
            name: 'Solar Position Mapping',
            formula: 'z = H × (a / 90°)',
            description: 'Height on cylinder for solar altitude a',
            latex: 'z = H \\times \\frac{a}{90^\\circ}'
          },
          {
            name: 'Ray-Cylinder Intersection',
            formula: 'at² + bt + c = 0, where a = dx² + dy², b = 2(oxdx + oydy), c = ox² + oy² - R²',
            description: 'Quadratic formula for ray intersection with vertical cylinder of radius R',
            latex: 'at^2 + bt + c = 0'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Cylinder Radius': '8-10 meters',
          'Cylinder Height': '3-4 meters',
          'Wall Thickness': '0.3 meters',
          'Number of Sectors': '12 (30° each)',
          'Central Pillar Radius': '0.2 meters'
        },
        accuracy: 'Altitude: ±0.5°, Azimuth: ±1°',
        materials: 'Marble or stone construction',
        orientation: 'Sectors aligned with cardinal directions'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Foundation and Center Marking',
          description: 'Prepare circular foundation and mark the precise center point. Ensure level ground.'
        },
        {
          step: 2,
          title: 'Circular Base Construction',
          description: 'Build the circular base with the calculated radius, ensuring perfect circularity.'
        },
        {
          step: 3,
          title: 'Radial Wall Installation',
          description: 'Install 12 radial walls at 30° intervals, aligned with cardinal and intercardinal directions.'
        },
        {
          step: 4,
          title: 'Cylindrical Wall Construction',
          description: 'Build the outer cylindrical wall to the specified height with smooth inner surface.'
        },
        {
          step: 5,
          title: 'Central Pillar Installation',
          description: 'Install the central sighting pillar, ensuring it is perfectly vertical.'
        },
        {
          step: 6,
          title: 'Altitude Scale Calibration',
          description: 'Mark altitude scales on the inner walls, with graduations from 0° to 90°.'
        }
      ],
      
      useCases: [
        'Measuring altitude and azimuth of celestial objects',
        'Tracking solar and lunar positions throughout the day',
        'Determining cardinal directions',
        'Astronomical coordinate measurements',
        'Educational demonstrations of altitude-azimuth coordinate system'
      ]
    },
    
    {
      name: 'Jai Prakash Yantra',
      subtitle: 'Hemispherical Celestial Map',
      category: 'Celestial Sphere',
      image: '/images/jai-prakash.jpg',
      description: 'The Jai Prakash Yantra consists of two complementary hemispherical bowls sunk into the ground, representing the celestial sphere. The interior surfaces are inscribed with coordinate grids representing declination and hour angle. A crosswire or suspended bead at the center casts a shadow or serves as a reference point, allowing direct reading of celestial coordinates.',
      
      howItWorks: {
        principle: 'The Jai Prakash Yantra is essentially a three-dimensional celestial map. The hemispherical bowl represents the sky dome, with coordinate lines for declination (celestial latitude) and hour angles (celestial longitude). A marker at the center projects onto the bowl surface, indicating the position of celestial objects.',
        
        components: [
          {
            name: 'Hemispherical Bowls',
            description: 'Two complementary marble hemispheres sunk into the ground, representing the northern and southern celestial hemispheres.',
            specs: 'Radius: 6-10 meters, Depth: 3-5 meters'
          },
          {
            name: 'Declination Circles',
            description: 'Concentric circles on the hemisphere representing lines of constant declination (celestial latitude).',
            specs: 'Range: -24° to +24° (seasonal solar range)'
          },
          {
            name: 'Hour Circles',
            description: 'Meridian lines representing constant hour angles, radiating from the bowl center.',
            specs: 'Marked for each hour from 6 AM to 6 PM'
          },
          {
            name: 'Central Crosswire',
            description: 'Suspended wires or a central marker that casts shadow or serves as sighting reference.',
            specs: 'Positioned at hemisphere center'
          }
        ],
        
        operation: [
          'The hemispherical bowl interior represents the celestial sphere as seen from Earth',
          'Declination circles (parallel to celestial equator) are marked on the surface',
          'Hour angle lines (celestial meridians) radiate from the center',
          'A shadow cast by the central marker or a suspended bead indicates the sun\'s position',
          'The intersection point on the coordinate grid gives the sun\'s declination and hour angle',
          'This can be converted to local solar time and season'
        ]
      },
      
      formulas: {
        title: 'Spherical Coordinate Mathematics',
        equations: [
          {
            name: 'Stereographic Projection (Altitude)',
            formula: 'r = R × cos(a)',
            description: 'Radial distance on hemisphere for altitude a and hemisphere radius R',
            latex: 'r = R \\times \\cos(a)'
          },
          {
            name: 'Cartesian Coordinates on Hemisphere',
            formula: 'x = r sin(A), y = r cos(A), z = -R sin(a)',
            description: 'Position on hemisphere interior for altitude a and azimuth A',
            latex: 'x = r\\sin(A), \\quad y = r\\cos(A), \\quad z = -R\\sin(a)'
          },
          {
            name: 'Declination to Latitude Transformation',
            formula: 'θ = φ - δ',
            description: 'Angular distance from zenith (θ) based on latitude (φ) and declination (δ)',
            latex: '\\theta = \\phi - \\delta'
          },
          {
            name: 'Hour Angle to Time',
            formula: 'Time = 12h + H/15°',
            description: 'Local solar time from hour angle H (in degrees)',
            latex: '\\text{Time} = 12^h + \\frac{H}{15^\\circ}'
          },
          {
            name: 'Spherical Coordinates',
            formula: 'θ (zenith angle), φ (azimuth)',
            description: 'Standard spherical coordinate system used in hemisphere projection',
            latex: '(\\theta, \\phi, r)'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Hemisphere Radius': '6-10 meters',
          'Bowl Depth': '3-5 meters',
          'Number of Declination Circles': '8-12',
          'Number of Hour Circles': '24 (one per hour)',
          'Crosswire Length': 'Spans hemisphere diameter'
        },
        accuracy: '±5 minutes (time), ±1° (declination)',
        materials: 'Polished marble or stone',
        orientation: 'Aligned with celestial equator and meridian'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Excavation and Foundation',
          description: 'Excavate a perfect hemispherical depression of the calculated radius. Ensure smooth, uniform curvature.'
        },
        {
          step: 2,
          title: 'Hemisphere Shell Construction',
          description: 'Build the hemispherical shell with polished marble, maintaining mathematical precision in curvature.'
        },
        {
          step: 3,
          title: 'Declination Circle Marking',
          description: 'Calculate and mark declination circles based on celestial latitude transformations for the site.'
        },
        {
          step: 4,
          title: 'Hour Circle Marking',
          description: 'Mark hour angle meridians radiating from the hemisphere center, spaced 15° apart.'
        },
        {
          step: 5,
          title: 'Crosswire Installation',
          description: 'Install the central crosswire or bead suspension system at the precise center of the hemisphere.'
        },
        {
          step: 6,
          title: 'Calibration and Verification',
          description: 'Verify all markings using actual solar observations at known times and dates.'
        }
      ],
      
      useCases: [
        'Direct visualization of celestial sphere coordinates',
        'Measuring solar declination and hour angle',
        'Educational tool for teaching spherical astronomy',
        'Determining equation of time',
        'Tracking seasonal solar position changes'
      ]
    },
    
    {
      name: 'Nadivalaya Yantra',
      subtitle: 'Equatorial Sundial',
      category: 'Sundial',
      image: '/images/nadivalaya.jpg',
      description: 'The Nadivalaya consists of two circular disks aligned parallel to the Earth\'s equatorial plane. A central rod (gnomon) passes through both disks perpendicular to their surfaces. The disks are marked with hour lines radiating from the center. This instrument provides a direct reading of solar time and demonstrates the concept of the celestial equator.',
      
      howItWorks: {
        principle: 'The Nadivalaya is an equatorial sundial where the dial plates are parallel to Earth\'s equator. The gnomon (central rod) is parallel to Earth\'s axis. As the sun moves, the shadow of the gnomon on the circular dial directly indicates the hour, with each hour represented by 15° on the disk.',
        
        components: [
          {
            name: 'Circular Dial Plates',
            description: 'Two circular disks (north and south facing) parallel to the equatorial plane.',
            specs: 'Diameter: 2-4 meters, Thickness: 5-10 cm'
          },
          {
            name: 'Central Gnomon',
            description: 'A rod perpendicular to the dial plates, parallel to Earth\'s rotational axis.',
            specs: 'Length: 1-2 meters, aligned with celestial pole'
          },
          {
            name: 'Hour Lines',
            description: 'Radiating lines marking each hour, spaced 15° apart on the disk.',
            specs: '24 lines (or 12 with AM/PM distinction)'
          },
          {
            name: 'Support Structure',
            description: 'Framework holding the dials at the correct angle (90° - latitude).',
            specs: 'Angle from horizontal = 90° - φ'
          }
        ],
        
        operation: [
          'The dial plates are inclined at an angle of (90° - latitude) from the horizontal',
          'This makes them parallel to Earth\'s equatorial plane',
          'The gnomon, perpendicular to the dials, is thus parallel to Earth\'s axis',
          'The sun\'s apparent rotation (15° per hour) causes the gnomon shadow to rotate uniformly',
          'Hour lines on the disk are equally spaced at 15° intervals',
          'The north-facing disk is used in summer (sun north of equator), south-facing disk in winter'
        ]
      },
      
      formulas: {
        title: 'Equatorial Sundial Mathematics',
        equations: [
          {
            name: 'Dial Inclination',
            formula: 'α = 90° - φ',
            description: 'Dial plate angle from horizontal (α) based on latitude (φ)',
            latex: '\\alpha = 90^\\circ - \\phi'
          },
          {
            name: 'Hour Line Angle',
            formula: 'θ = 15° × (12 - hour)',
            description: 'Angular position of hour line on equatorial dial',
            latex: '\\theta = 15^\\circ \\times (12 - \\text{hour})'
          },
          {
            name: 'Shadow Length',
            formula: 'L = r × tan(δ)',
            description: 'Shadow distance from dial center for gnomon radius r and declination δ',
            latex: 'L = r \\times \\tan(\\delta)'
          },
          {
            name: 'Time Correction (Equation of Time)',
            formula: 'True Solar Time = Dial Time + EOT',
            description: 'Correction for equation of time (EOT) to get mean solar time',
            latex: '\\text{TST} = \\text{Dial Time} + \\text{EOT}'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Dial Diameter': '2-4 meters',
          'Gnomon Length': '1-2 meters',
          'Dial Thickness': '5-10 cm',
          'Inclination': '90° - latitude',
          'Hour Line Spacing': '15° (one hour)'
        },
        accuracy: '±2-3 minutes',
        materials: 'Metal or stone disks with metal gnomon',
        orientation: 'Aligned with celestial equator, gnomon to pole'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Latitude Determination',
          description: 'Accurately determine site latitude for calculating dial inclination angle.'
        },
        {
          step: 2,
          title: 'Disk Fabrication',
          description: 'Create two circular disks of the specified diameter with perfectly flat surfaces.'
        },
        {
          step: 3,
          title: 'Hour Line Marking',
          description: 'Mark hour lines radiating from the center at 15° intervals, starting from the noon line.'
        },
        {
          step: 4,
          title: 'Gnomon Installation',
          description: 'Install the central rod perfectly perpendicular to the disk surfaces.'
        },
        {
          step: 5,
          title: 'Support Frame Construction',
          description: 'Build support framework to hold disks at inclination angle (90° - latitude).'
        },
        {
          step: 6,
          title: 'Alignment and Calibration',
          description: 'Align the structure so gnomon points to celestial pole. Verify with solar observations.'
        }
      ],
      
      useCases: [
        'Simple and accurate time measurement',
        'Demonstrating Earth\'s rotation and equatorial plane',
        'Teaching tool for celestial coordinate systems',
        'Measuring solar time vs mean time (equation of time)',
        'Garden sundial or decorative timepiece'
      ]
    },
    
    {
      name: 'Digamsa Yantra',
      subtitle: 'Azimuth Measurement Instrument',
      category: 'Direction Finder',
      image: '/images/digamsa-yantra.jpg',
      description: 'The Digamsa Yantra is specifically designed to measure azimuth angles of celestial objects. This instrument helps determine the exact directional bearing of stars, planets, and the sun from the observer\'s position, essential for navigation and astronomical calculations.',
      
      howItWorks: {
        principle: 'The Digamsa Yantra measures the azimuth (horizontal angle) of celestial objects relative to true north. It consists of a vertical circular wall with angular graduations and a central pillar for sighting, precisely aligned with cardinal directions.',
        
        components: [
          {
            name: 'Vertical Circular Wall',
            description: 'A circular wall with azimuth graduations from 0° to 360°.',
            specs: 'Diameter: 4-6 meters, Height: 2-3 meters'
          },
          {
            name: 'Central Pillar',
            description: 'A vertical sighting pillar at the center for alignment with celestial objects.',
            specs: 'Height: 1.5-2 meters, precisely vertical'
          },
          {
            name: 'Azimuth Scale',
            description: 'Graduated markings showing compass directions and angles.',
            specs: 'Marked every 1° or 0.5° for precision'
          },
          {
            name: 'Cardinal Markers',
            description: 'Fixed markers indicating North, South, East, and West directions.',
            specs: 'Aligned with true cardinal directions'
          }
        ],
        
        operation: [
          'The instrument is precisely aligned so that one of its markers points to true north',
          'Observer sights a celestial object using the central pillar',
          'The azimuth angle is read from where the line of sight intersects the circular scale',
          'This gives the compass direction (bearing) of the celestial object',
          'Combined with altitude measurements, provides complete celestial coordinates'
        ]
      },
      
      formulas: {
        title: 'Azimuth Calculation Principles',
        equations: [
          {
            name: 'Solar Azimuth',
            formula: 'sin(A) = cos(δ)sin(H) / cos(a)',
            description: 'Azimuth (A) from declination (δ), hour angle (H), and altitude (a)',
            latex: '\\sin(A) = \\frac{\\cos(\\delta)\\sin(H)}{\\cos(a)}'
          },
          {
            name: 'Azimuth Quadrant',
            formula: 'cos(A) = (sin(δ) - sin(a)sin(φ)) / (cos(a)cos(φ))',
            description: 'Complete azimuth determination using latitude (φ)',
            latex: '\\cos(A) = \\frac{\\sin(\\delta) - \\sin(a)\\sin(\\phi)}{\\cos(a)\\cos(\\phi)}'
          },
          {
            name: 'True North Correction',
            formula: 'A_true = A_magnetic + declination',
            description: 'Correction for magnetic declination to get true azimuth',
            latex: 'A_{\\text{true}} = A_{\\text{magnetic}} + \\delta_{\\text{mag}}'
          },
          {
            name: 'Horizontal Distance',
            formula: 'd = R × θ',
            description: 'Arc length on circular scale for angle θ and radius R',
            latex: 'd = R \\times \\theta'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Wall Diameter': '4-6 meters',
          'Wall Height': '2-3 meters',
          'Central Pillar Height': '1.5-2 meters',
          'Scale Divisions': '360° (marked every 0.5-1°)',
          'Wall Thickness': '0.2-0.3 meters'
        },
        accuracy: '±0.5° to ±1°',
        materials: 'Stone or marble with metal markers',
        orientation: 'Precisely aligned with true north'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Site Survey and North Determination',
          description: 'Accurately determine true north using astronomical observations (Pole Star method).'
        },
        {
          step: 2,
          title: 'Foundation Circle',
          description: 'Create a perfectly circular foundation of the specified diameter, ensuring level base.'
        },
        {
          step: 3,
          title: 'Vertical Wall Construction',
          description: 'Build the circular wall vertically, maintaining uniform height and circularity.'
        },
        {
          step: 4,
          title: 'Central Pillar Installation',
          description: 'Install the central vertical pillar exactly at the geometric center.'
        },
        {
          step: 5,
          title: 'Azimuth Scale Marking',
          description: 'Mark azimuth graduations starting from true north, proceeding clockwise 0° to 360°.'
        },
        {
          step: 6,
          title: 'Cardinal Direction Markers',
          description: 'Install permanent markers for N, S, E, W at 0°, 180°, 90°, and 270° respectively.'
        }
      ],
      
      useCases: [
        'Determining compass bearings of celestial objects',
        'Navigation and wayfinding',
        'Establishing cardinal directions (Qibla determination)',
        'Tracking azimuthal motion of sun and planets',
        'Surveying and geographical measurements'
      ]
    },
    
    {
      name: 'Dhruva-Protha-Chakra Yantra',
      subtitle: 'Pole Star Circle Instrument',
      category: 'Latitude Finder',
      image: '/images/dhruva-yantra.jpg',
      description: 'Named after Dhruva (the Pole Star), this instrument was created to study the motion around the celestial pole. It measures the altitude of the Pole Star to determine geographical latitude and tracks the apparent rotation of stars around the celestial north pole.',
      
      howItWorks: {
        principle: 'The Dhruva-Protha-Chakra Yantra uses the principle that the altitude of the Pole Star above the horizon equals the observer\'s geographical latitude. It features a circular ring structure aligned with the celestial pole for tracking polar star movements.',
        
        components: [
          {
            name: 'Polar Ring',
            description: 'A large circular ring aligned parallel to the celestial equator.',
            specs: 'Diameter: 3-5 meters, tilted at (90° - latitude)'
          },
          {
            name: 'Meridian Circle',
            description: 'A vertical circle passing through the celestial poles and zenith.',
            specs: 'Aligned with local meridian (north-south line)'
          },
          {
            name: 'Graduated Scale',
            description: 'Angular markings for measuring altitude and polar distance.',
            specs: 'Marked in degrees from 0° to 90°'
          },
          {
            name: 'Sighting Mechanism',
            description: 'Movable sight or pointer for aligning with the Pole Star.',
            specs: 'Adjustable along the meridian circle'
          }
        ],
        
        operation: [
          'The instrument is aligned so its axis points toward the celestial north pole',
          'Observer sights the Pole Star (Dhruva/Polaris) through the sighting mechanism',
          'The altitude reading of the Pole Star equals the geographical latitude',
          'The ring can track the diurnal (daily) rotation of stars around the pole',
          'Measurements help determine local latitude and understand Earth\'s rotation'
        ]
      },
      
      formulas: {
        title: 'Polar Astronomy Mathematics',
        equations: [
          {
            name: 'Latitude from Pole Star',
            formula: 'φ = a_polaris',
            description: 'Geographical latitude (φ) equals the altitude of the Pole Star',
            latex: '\\phi = a_{\\text{polaris}}'
          },
          {
            name: 'Polar Distance',
            formula: 'p = 90° - δ',
            description: 'Polar distance (p) from declination (δ)',
            latex: 'p = 90^\\circ - \\delta'
          },
          {
            name: 'Hour Angle from Rotation',
            formula: 'H = ω × t',
            description: 'Hour angle (H) from Earth\'s rotation rate (ω = 15°/hour) and time (t)',
            latex: 'H = \\omega \\times t, \\quad \\omega = 15^\\circ/\\text{hr}'
          },
          {
            name: 'Circumpolar Star Criterion',
            formula: 'δ > 90° - φ',
            description: 'Stars never set if declination (δ) exceeds this limit for latitude (φ)',
            latex: '\\delta > 90^\\circ - \\phi'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Ring Diameter': '3-5 meters',
          'Ring Width': '0.3-0.5 meters',
          'Tilt Angle': '90° - latitude',
          'Meridian Circle Diameter': '2-4 meters',
          'Scale Precision': 'Every 0.5° or 1°'
        },
        accuracy: '±0.25° (latitude determination)',
        materials: 'Metal rings (brass/bronze) or stone',
        orientation: 'Aligned with celestial pole and local meridian'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Latitude Measurement',
          description: 'Determine site latitude accurately using preliminary Pole Star observations.'
        },
        {
          step: 2,
          title: 'Meridian Alignment',
          description: 'Establish the true north-south meridian line using solar or stellar observations.'
        },
        {
          step: 3,
          title: 'Ring Frame Construction',
          description: 'Build the tilted ring frame at angle (90° - latitude) from horizontal.'
        },
        {
          step: 4,
          title: 'Graduated Circle Installation',
          description: 'Install the meridian circle vertically along the north-south line.'
        },
        {
          step: 5,
          title: 'Scale Calibration',
          description: 'Mark altitude scales and polar distance graduations precisely.'
        },
        {
          step: 6,
          title: 'Sighting Mechanism',
          description: 'Install movable sighting device for tracking the Pole Star and circumpolar stars.'
        }
      ],
      
      useCases: [
        'Determining geographical latitude',
        'Navigation and maritime positioning',
        'Demonstrating Earth\'s rotation and polar motion',
        'Tracking circumpolar star movements',
        'Understanding celestial coordinate systems'
      ]
    },
    
    {
      name: 'Jai Prakash Yantra',
      subtitle: 'Hemispherical Celestial Map',
      category: 'Celestial Sphere',
      image: '/images/jai-prakash.jpg',
      description: 'The Jai Prakash Yantra consists of two complementary hemispherical bowls sunk into the ground, representing the celestial sphere. The interior surfaces are inscribed with coordinate grids representing declination and hour angle. A crosswire or suspended bead at the center casts a shadow or serves as a reference point, allowing direct reading of celestial coordinates.',
      
      howItWorks: {
        principle: 'The Jai Prakash Yantra is essentially a three-dimensional celestial map. The hemispherical bowl represents the sky dome, with coordinate lines for declination (celestial latitude) and hour angles (celestial longitude). A marker at the center projects onto the bowl surface, indicating the position of celestial objects.',
        
        components: [
          {
            name: 'Hemispherical Bowls',
            description: 'Two complementary marble hemispheres sunk into the ground, representing the northern and southern celestial hemispheres.',
            specs: 'Radius: 6-10 meters, Depth: 3-5 meters'
          },
          {
            name: 'Declination Circles',
            description: 'Concentric circles on the hemisphere representing lines of constant declination (celestial latitude).',
            specs: 'Range: -24° to +24° (seasonal solar range)'
          },
          {
            name: 'Hour Circles',
            description: 'Meridian lines representing constant hour angles, radiating from the bowl center.',
            specs: 'Marked for each hour from 6 AM to 6 PM'
          },
          {
            name: 'Central Crosswire',
            description: 'Suspended wires or a central marker that casts shadow or serves as sighting reference.',
            specs: 'Positioned at hemisphere center'
          }
        ],
        
        operation: [
          'The hemispherical bowl interior represents the celestial sphere as seen from Earth',
          'Declination circles (parallel to celestial equator) are marked on the surface',
          'Hour angle lines (celestial meridians) radiate from the center',
          'A shadow cast by the central marker or a suspended bead indicates the sun\'s position',
          'The intersection point on the coordinate grid gives the sun\'s declination and hour angle',
          'This can be converted to local solar time and season'
        ]
      },
      
      formulas: {
        title: 'Spherical Coordinate Mathematics',
        equations: [
          {
            name: 'Stereographic Projection (Altitude)',
            formula: 'r = R × cos(a)',
            description: 'Radial distance on hemisphere for altitude a and hemisphere radius R',
            latex: 'r = R \\times \\cos(a)'
          },
          {
            name: 'Cartesian Coordinates on Hemisphere',
            formula: 'x = r sin(A), y = r cos(A), z = -R sin(a)',
            description: 'Position on hemisphere interior for altitude a and azimuth A',
            latex: 'x = r\\sin(A), \\quad y = r\\cos(A), \\quad z = -R\\sin(a)'
          },
          {
            name: 'Declination to Latitude Transformation',
            formula: 'θ = φ - δ',
            description: 'Angular distance from zenith (θ) based on latitude (φ) and declination (δ)',
            latex: '\\theta = \\phi - \\delta'
          },
          {
            name: 'Hour Angle to Time',
            formula: 'Time = 12h + H/15°',
            description: 'Local solar time from hour angle H (in degrees)',
            latex: '\\text{Time} = 12^h + \\frac{H}{15^\\circ}'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Hemisphere Radius': '6-10 meters',
          'Bowl Depth': '3-5 meters',
          'Number of Declination Circles': '8-12',
          'Number of Hour Circles': '24 (one per hour)',
          'Crosswire Length': 'Spans hemisphere diameter'
        },
        accuracy: '±5 minutes (time), ±1° (declination)',
        materials: 'Polished marble or stone',
        orientation: 'Aligned with celestial equator and meridian'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Excavation and Foundation',
          description: 'Excavate a perfect hemispherical depression of the calculated radius. Ensure smooth, uniform curvature.'
        },
        {
          step: 2,
          title: 'Hemisphere Shell Construction',
          description: 'Build the hemispherical shell with polished marble, maintaining mathematical precision in curvature.'
        },
        {
          step: 3,
          title: 'Declination Circle Marking',
          description: 'Calculate and mark declination circles based on celestial latitude transformations for the site.'
        },
        {
          step: 4,
          title: 'Hour Circle Marking',
          description: 'Mark hour angle meridians radiating from the hemisphere center, spaced 15° apart.'
        },
        {
          step: 5,
          title: 'Crosswire Installation',
          description: 'Install the central crosswire or bead suspension system at the precise center of the hemisphere.'
        },
        {
          step: 6,
          title: 'Calibration and Verification',
          description: 'Verify all markings using actual solar observations at known times and dates.'
        }
      ],
      
      useCases: [
        'Direct visualization of celestial sphere coordinates',
        'Measuring solar declination and hour angle',
        'Educational tool for teaching spherical astronomy',
        'Determining equation of time',
        'Tracking seasonal solar position changes'
      ]
    },
    
    {
      name: 'Bhitti Yantra',
      subtitle: 'Wall Sundial',
      category: 'Sundial',
      image: '/images/bhitti-yantra.jpg',
      description: 'The Bhitti Yantra is a wall-mounted sundial that displays local solar time throughout the day. The shadow cast by the gnomon moves across the graduated wall surface indicating hours and minutes. This accessible instrument demonstrates the practical application of astronomical knowledge in daily life.',
      
      howItWorks: {
        principle: 'The Bhitti Yantra operates as a vertical sundial where a triangular gnomon casts its shadow on a graduated semicircular scale mounted on or built into a wall. The position of the shadow indicates the local solar time.',
        
        components: [
          {
            name: 'Wall Surface',
            description: 'Vertical wall surface serving as the dial face, typically facing north or south.',
            specs: 'Height: 3-6 meters, Width: 2-4 meters'
          },
          {
            name: 'Triangular Gnomon',
            description: 'Shadow-casting element projecting perpendicular from the wall.',
            specs: 'Length: 1-2 meters, angle adjusted for latitude'
          },
          {
            name: 'Semicircular Scale',
            description: 'Graduated arc showing hours of daylight on the wall surface.',
            specs: 'Marked from sunrise to sunset hours'
          },
          {
            name: 'Hour Lines',
            description: 'Lines converging at the gnomon base, marking each hour.',
            specs: 'Calculated based on wall orientation and site latitude'
          }
        ],
        
        operation: [
          'The wall is oriented (typically north or south-facing)',
          'The gnomon projects from the wall at an angle calculated for the site latitude',
          'As the sun moves across the sky, the gnomon casts a shadow on the wall',
          'The shadow edge crosses the hour lines, indicating local solar time',
          'Different hour line spacing accounts for the wall\'s orientation'
        ]
      },
      
      formulas: {
        title: 'Vertical Sundial Mathematics',
        equations: [
          {
            name: 'Hour Line Angle (South Wall)',
            formula: 'tan(θ) = sin(φ) × tan(H)',
            description: 'Hour line angle (θ) for latitude (φ) and hour angle (H) on south-facing wall',
            latex: '\\tan(\\theta) = \\sin(\\phi) \\times \\tan(H)'
          },
          {
            name: 'Gnomon Angle',
            formula: 'α = 90° - φ',
            description: 'Gnomon projection angle (α) from horizontal for latitude (φ)',
            latex: '\\alpha = 90^\\circ - \\phi'
          },
          {
            name: 'Shadow Length',
            formula: 'L = g × tan(90° - a)',
            description: 'Shadow length (L) for gnomon length (g) and solar altitude (a)',
            latex: 'L = g \\times \\tan(90^\\circ - a)'
          },
          {
            name: 'Hour Line Spacing',
            formula: 'θ_n = arctan(sin(φ) × tan(15°n))',
            description: 'Angle for nth hour line (n = hours from noon)',
            latex: '\\theta_n = \\arctan(\\sin(\\phi) \\times \\tan(15^\\circ n))'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Wall Height': '3-6 meters',
          'Wall Width': '2-4 meters',
          'Gnomon Length': '1-2 meters',
          'Semicircular Scale Radius': '1.5-3 meters',
          'Hour Line Count': '10-14 (daylight hours)'
        },
        accuracy: '±5-10 minutes',
        materials: 'Stone or marble wall, metal or stone gnomon',
        orientation: 'North or south-facing wall'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Wall Selection and Preparation',
          description: 'Choose a suitable vertical wall (north or south-facing) and ensure it is perfectly vertical.'
        },
        {
          step: 2,
          title: 'Calculate Hour Lines',
          description: 'Compute hour line angles based on wall orientation, latitude, and desired time range.'
        },
        {
          step: 3,
          title: 'Gnomon Installation',
          description: 'Install the gnomon projecting from the wall at the calculated angle for local latitude.'
        },
        {
          step: 4,
          title: 'Hour Line Marking',
          description: 'Mark the calculated hour lines on the wall surface, radiating from the gnomon base.'
        },
        {
          step: 5,
          title: 'Scale Numbering',
          description: 'Add hour numbers and intermediate markings for minutes (if desired).'
        },
        {
          step: 6,
          title: 'Verification',
          description: 'Verify accuracy at solar noon and other known times, adjust if necessary.'
        }
      ],
      
      useCases: [
        'Public timekeeping in buildings and monuments',
        'Architectural integration of functional astronomical instruments',
        'Educational displays in museums and schools',
        'Demonstration of solar motion and local time',
        'Historical recreation and heritage preservation'
      ]
    },
    
    {
      name: 'Dakshinottara Bhitti Yantra',
      subtitle: 'North-South Wall Sundial',
      category: 'Sundial',
      image: '/images/dakshinottara-yantra.jpg',
      description: 'The Dakshinottara Bhitti Yantra is a specialized wall sundial designed for north-south oriented walls. It provides accurate time measurements regardless of the wall\'s specific orientation, showcasing advanced understanding of solar geometry and the ability to adapt astronomical instruments to architectural constraints.',
      
      howItWorks: {
        principle: 'This instrument uses specialized gnomon and scale arrangements adapted for north-south wall orientations. Unlike simple wall sundials, it incorporates mathematical corrections to provide accurate time display on walls that don\'t face directly east or west.',
        
        components: [
          {
            name: 'Meridian Wall',
            description: 'Wall aligned along the north-south meridian line.',
            specs: 'Height: 4-8 meters, precisely aligned with meridian'
          },
          {
            name: 'Adjusted Gnomon',
            description: 'Specially angled gnomon accounting for meridian wall orientation.',
            specs: 'Length: 1.5-2.5 meters, complex angle calculation'
          },
          {
            name: 'Modified Hour Lines',
            description: 'Hour lines with corrections for meridian orientation.',
            specs: 'Non-uniform spacing, mathematically calculated'
          },
          {
            name: 'Noon Marker',
            description: 'Prominent vertical line indicating solar noon (meridian passage).',
            specs: 'Directly vertical from gnomon base'
          }
        ],
        
        operation: [
          'The wall is precisely aligned with the local north-south meridian',
          'The gnomon angle is calculated accounting for both latitude and meridian orientation',
          'Shadow behavior differs from standard wall sundials due to meridian alignment',
          'The noon line is vertical, with morning/afternoon hours symmetrically arranged',
          'Special corrections ensure accurate time reading throughout the day'
        ]
      },
      
      formulas: {
        title: 'Meridian Wall Sundial Mathematics',
        equations: [
          {
            name: 'Meridian Wall Hour Angle',
            formula: 'tan(θ) = tan(H) / cos(φ)',
            description: 'Hour line angle (θ) for meridian wall at latitude (φ) and hour angle (H)',
            latex: '\\tan(\\theta) = \\frac{\\tan(H)}{\\cos(\\phi)}'
          },
          {
            name: 'Gnomon Orientation',
            formula: 'β = arctan(cos(φ))',
            description: 'Gnomon angle (β) from wall for meridian alignment at latitude (φ)',
            latex: '\\beta = \\arctan(\\cos(\\phi))'
          },
          {
            name: 'Shadow Altitude Correction',
            formula: 'a_eff = arcsin(cos(φ) × sin(a))',
            description: 'Effective altitude (a_eff) for actual altitude (a) and latitude (φ)',
            latex: 'a_{\\text{eff}} = \\arcsin(\\cos(\\phi) \\times \\sin(a))'
          },
          {
            name: 'Noon Line Position',
            formula: 'θ_noon = 90°',
            description: 'Noon line is perpendicular (vertical) on meridian wall',
            latex: '\\theta_{\\text{noon}} = 90^\\circ'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Wall Height': '4-8 meters',
          'Wall Width': '3-5 meters',
          'Gnomon Length': '1.5-2.5 meters',
          'Hour Line Range': '6 AM to 6 PM',
          'Gnomon Angle': 'Complex (latitude dependent)'
        },
        accuracy: '±3-5 minutes',
        materials: 'Stone wall with metal gnomon',
        orientation: 'Precisely aligned with local meridian (N-S)'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Meridian Determination',
          description: 'Accurately establish the local north-south meridian using solar observations or Pole Star.'
        },
        {
          step: 2,
          title: 'Wall Construction/Selection',
          description: 'Build or select a wall precisely aligned with the meridian line.'
        },
        {
          step: 3,
          title: 'Gnomon Angle Calculation',
          description: 'Calculate the specialized gnomon angle accounting for meridian orientation and latitude.'
        },
        {
          step: 4,
          title: 'Hour Line Computation',
          description: 'Compute corrected hour line angles using meridian wall formulas.'
        },
        {
          step: 5,
          title: 'Installation and Marking',
          description: 'Install gnomon and mark hour lines with corrections for meridian alignment.'
        },
        {
          step: 6,
          title: 'Calibration',
          description: 'Verify at solar noon and adjust markings for maximum accuracy.'
        }
      ],
      
      useCases: [
        'Specialized timekeeping for meridian-aligned buildings',
        'Demonstrating advanced sundial mathematics',
        'Solving timekeeping challenges in constrained architectures',
        'Educational tool for solar geometry',
        'Integration with meridian transit observations'
      ]
    },
    
    {
      name: 'Rasivalaya Yantra',
      subtitle: 'Zodiacal Instrument',
      category: 'Calendar System',
      image: '/images/rasivalaya-yantra.jpg',
      description: 'The Rasivalaya Yantra is designed to track the sun\'s movement through the twelve zodiacal constellations (Rashi) throughout the year. This instrument bridges observational astronomy with traditional calendar systems, essential for creating accurate calendars and astrological calculations.',
      
      howItWorks: {
        principle: 'The Rasivalaya consists of twelve separate structures, each representing one zodiacal sign. As the sun moves through the ecliptic during the year, different structures cast shadows or provide readings, indicating which zodiacal constellation the sun occupies.',
        
        components: [
          {
            name: 'Twelve Sector Structures',
            description: 'Separate structures or divisions, each aligned with one zodiacal constellation.',
            specs: '12 sectors × 30° = 360° coverage of ecliptic'
          },
          {
            name: 'Ecliptic Alignment',
            description: 'Structures tilted at 23.5° to represent the ecliptic plane.',
            specs: 'Angle: 23.45° from celestial equator'
          },
          {
            name: 'Seasonal Markers',
            description: 'Special markers for equinoxes and solstices (Aries, Cancer, Libra, Capricorn points).',
            specs: 'Four cardinal points of the year'
          },
          {
            name: 'Gnomon System',
            description: 'Shadow-casting elements indicating solar position within each zodiacal division.',
            specs: 'One per sector, specially calibrated'
          }
        ],
        
        operation: [
          'The twelve structures represent the twelve divisions of the ecliptic (zodiacal signs)',
          'Each structure corresponds to approximately one month of the year',
          'As the sun\'s declination changes seasonally, different structures become active',
          'Shadow patterns or scales indicate the sun\'s position within each zodiacal sign',
          'The instrument provides both calendrical information and astronomical measurements'
        ]
      },
      
      formulas: {
        title: 'Ecliptic and Zodiacal Mathematics',
        equations: [
          {
            name: 'Zodiacal Sign from Date',
            formula: 'Sign = floor((n + 9) / 30.5) + 1',
            description: 'Zodiacal sign (1-12) from day of year (n), approximately',
            latex: '\\text{Sign} = \\lfloor(n + 9) / 30.5\\rfloor + 1'
          },
          {
            name: 'Ecliptic Longitude',
            formula: 'λ = λ_0 + 360° × (n - n_0) / 365.25',
            description: 'Solar ecliptic longitude (λ) from day of year (n)',
            latex: '\\lambda = \\lambda_0 + \\frac{360^\\circ \\times (n - n_0)}{365.25}'
          },
          {
            name: 'Ecliptic Obliquity',
            formula: 'ε = 23.45°',
            description: 'Obliquity of the ecliptic (angle between ecliptic and equator)',
            latex: '\\varepsilon = 23.45^\\circ'
          },
          {
            name: 'Declination from Ecliptic',
            formula: 'sin(δ) = sin(ε) × sin(λ)',
            description: 'Solar declination (δ) from ecliptic longitude (λ) and obliquity (ε)',
            latex: '\\sin(\\delta) = \\sin(\\varepsilon) \\times \\sin(\\lambda)'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Number of Structures': '12 (one per zodiacal sign)',
          'Each Sector Width': '30° of ecliptic',
          'Overall Diameter': '10-20 meters',
          'Structure Height': '2-4 meters per sector',
          'Ecliptic Tilt': '23.45°'
        },
        accuracy: '±2-3 days (zodiacal position)',
        materials: 'Stone or marble sectors with graduated scales',
        orientation: 'Aligned with ecliptic plane'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Ecliptic Plane Determination',
          description: 'Calculate the ecliptic plane orientation (23.45° from equator) for the site latitude.'
        },
        {
          step: 2,
          title: 'Twelve-Sector Layout',
          description: 'Divide circular plan into twelve 30° sectors, each representing one zodiacal sign.'
        },
        {
          step: 3,
          title: 'Sector Structure Construction',
          description: 'Build twelve individual structures or divisions tilted along the ecliptic plane.'
        },
        {
          step: 4,
          title: 'Seasonal Marker Installation',
          description: 'Mark equinox and solstice points (Aries, Cancer, Libra, Capricorn).'
        },
        {
          step: 5,
          title: 'Gnomon and Scale Calibration',
          description: 'Install gnomon systems and graduated scales for each zodiacal sector.'
        },
        {
          step: 6,
          title: 'Zodiacal Symbol Inscription',
          description: 'Engrave or mark each sector with its corresponding zodiacal symbol and name.'
        }
      ],
      
      useCases: [
        'Tracking solar position through zodiacal constellations',
        'Creating accurate traditional calendars',
        'Determining auspicious times (muhurta)',
        'Educational tool for ecliptic motion',
        'Integration of astronomy and cultural calendar systems'
      ]
    },
    
    {
      name: 'Nadi Valaya Yantra',
      subtitle: 'Ring Dial Instrument',
      category: 'Sundial',
      image: '/images/nadi-valaya-yantra.jpg',
      description: 'The Nadi Valaya Yantra is a sophisticated ring sundial that measures time with remarkable precision. The instrument uses the principle of the sun\'s shadow falling through rings to indicate time on graduated scales, representing a scaled-up version of portable ring dials for permanent installation.',
      
      howItWorks: {
        principle: 'The Nadi Valaya operates through a series of precisely oriented rings. Sunlight passes through apertures in the rings, casting spots of light or shadow patterns on graduated scales that indicate the time of day and season.',
        
        components: [
          {
            name: 'Outer Ring',
            description: 'Large circular ring representing the celestial equator.',
            specs: 'Diameter: 3-5 meters, tilted at latitude angle'
          },
          {
            name: 'Inner Ring',
            description: 'Smaller ring with aperture for sunlight passage.',
            specs: 'Diameter: 1-2 meters, perpendicular to outer ring'
          },
          {
            name: 'Time Scale',
            description: 'Graduated scale on inner surface showing hours and subdivisions.',
            specs: 'Marked from 6 AM to 6 PM, with minute divisions'
          },
          {
            name: 'Seasonal Scale',
            description: 'Additional markings showing solar declination and date.',
            specs: 'Indicates position through zodiacal year'
          }
        ],
        
        operation: [
          'The outer ring is tilted to align with the celestial equator for the site latitude',
          'Sunlight passes through an aperture in the inner ring',
          'The light spot or shadow edge falls on the graduated time scale',
          'Position of the light indicates local solar time',
          'Seasonal variations are read from the perpendicular scale',
          'The instrument is self-calibrating for different times of year'
        ]
      },
      
      formulas: {
        title: 'Ring Dial Mathematics',
        equations: [
          {
            name: 'Ring Tilt Angle',
            formula: 'α = φ',
            description: 'Outer ring tilt (α) equals site latitude (φ)',
            latex: '\\alpha = \\phi'
          },
          {
            name: 'Time from Light Position',
            formula: 'Time = 12h + (θ / 15°)',
            description: 'Local solar time from angle (θ) of light spot on scale',
            latex: '\\text{Time} = 12^h + \\frac{\\theta}{15^\\circ}'
          },
          {
            name: 'Seasonal Offset',
            formula: 'y = R × sin(δ)',
            description: 'Vertical offset (y) on seasonal scale for declination (δ) and ring radius (R)',
            latex: 'y = R \\times \\sin(\\delta)'
          },
          {
            name: 'Light Spot Diameter',
            formula: 'd = d_0 + (D × L) / R',
            description: 'Light spot diameter (d) from aperture (d_0), distance (L), and ring radius (R)',
            latex: 'd = d_0 + \\frac{D \\times L}{R}'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Outer Ring Diameter': '3-5 meters',
          'Inner Ring Diameter': '1-2 meters',
          'Ring Width': '0.2-0.4 meters',
          'Tilt Angle': 'Equal to latitude',
          'Aperture Size': '2-5 cm diameter'
        },
        accuracy: '±2-5 minutes',
        materials: 'Metal rings (brass/bronze) with stone or metal scales',
        orientation: 'Outer ring parallel to equatorial plane'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Latitude-Based Design',
          description: 'Calculate ring dimensions and tilt angle based on site latitude.'
        },
        {
          step: 2,
          title: 'Ring Fabrication',
          description: 'Construct outer and inner rings with precise circularity and perpendicularity.'
        },
        {
          step: 3,
          title: 'Aperture Installation',
          description: 'Create or install the light-passing aperture in the inner ring at the correct position.'
        },
        {
          step: 4,
          title: 'Scale Marking',
          description: 'Mark time graduations on the inner surface where light will fall.'
        },
        {
          step: 5,
          title: 'Mounting and Alignment',
          description: 'Mount the ring system at the calculated tilt angle, aligned with celestial equator.'
        },
        {
          step: 6,
          title: 'Calibration',
          description: 'Verify time readings at known solar times and adjust if necessary.'
        }
      ],
      
      useCases: [
        'Precise time measurement throughout the day',
        'Demonstrating equatorial coordinate system',
        'Portable sundial principles scaled to monument size',
        'Educational displays of solar motion',
        'Artistic integration of astronomy and architecture'
      ]
    },
    
    {
      name: 'Palaka Yantra',
      subtitle: 'Board Instrument',
      category: 'Computational Aid',
      image: '/images/palaka-yantra.jpg',
      description: 'The Palaka Yantra is a flat board instrument with various scales and markings for astronomical calculations and measurements. It serves as a computational aid for complex astronomical problems, representing the bridge between observation and mathematical analysis in ancient Indian astronomy.',
      
      howItWorks: {
        principle: 'The Palaka Yantra functions as a sophisticated astronomical calculator. Its flat surface contains engraved scales, nomograms, and calculation aids that allow astronomers to quickly solve problems related to planetary positions, eclipses, calendars, and coordinate transformations.',
        
        components: [
          {
            name: 'Calculation Board',
            description: 'Flat stone or metal surface with multiple engraved scales and grids.',
            specs: 'Size: 1-3 meters square, perfectly flat'
          },
          {
            name: 'Angular Scales',
            description: 'Graduated scales for measuring and calculating angles.',
            specs: 'Multiple scales (degrees, arcminutes, time units)'
          },
          {
            name: 'Coordinate Grid',
            description: 'Reference grid for plotting celestial positions.',
            specs: 'Cartesian or polar grid systems'
          },
          {
            name: 'Nomographic Charts',
            description: 'Graphical calculators for solving equations without arithmetic.',
            specs: 'Various nomograms for common astronomical problems'
          }
        ],
        
        operation: [
          'Astronomer uses the board to perform calculations visually',
          'Known values are located on appropriate scales',
          'Lines are drawn connecting input values',
          'Results are read from intersection points or other scales',
          'Complex problems can be solved graphically without numerical computation',
          'Multiple calculations can be performed simultaneously on different parts of the board'
        ]
      },
      
      formulas: {
        title: 'Computational Astronomy Principles',
        equations: [
          {
            name: 'Coordinate Transformation',
            formula: 'x\' = x cos(θ) - y sin(θ), y\' = x sin(θ) + y cos(θ)',
            description: 'Rotation of coordinates by angle θ',
            latex: 'x\' = x\\cos(\\theta) - y\\sin(\\theta), \\quad y\' = x\\sin(\\theta) + y\\cos(\\theta)'
          },
          {
            name: 'Triangle Solution',
            formula: 'a/sin(A) = b/sin(B) = c/sin(C)',
            description: 'Law of sines for solving astronomical triangles',
            latex: '\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}'
          },
          {
            name: 'Spherical Triangle',
            formula: 'cos(a) = cos(b)cos(c) + sin(b)sin(c)cos(A)',
            description: 'Spherical law of cosines for celestial sphere calculations',
            latex: '\\cos(a) = \\cos(b)\\cos(c) + \\sin(b)\\sin(c)\\cos(A)'
          },
          {
            name: 'Mean Position Calculation',
            formula: 'M = M_0 + n(t - t_0)',
            description: 'Mean anomaly (M) from mean motion (n) and epoch (t_0)',
            latex: 'M = M_0 + n(t - t_0)'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Board Size': '1-3 meters square',
          'Board Thickness': '5-15 cm',
          'Number of Scales': '10-20 different scales',
          'Engraving Depth': '2-5 mm',
          'Material': 'Marble or metal (brass)'
        },
        accuracy: 'Depends on scale precision (typically ±0.5°)',
        materials: 'Marble, brass, or bronze with fine engravings',
        orientation: 'Horizontal or tilted for ease of use'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Board Preparation',
          description: 'Prepare a perfectly flat, smooth surface of marble or metal.'
        },
        {
          step: 2,
          title: 'Scale Design',
          description: 'Design the layout of various scales, nomograms, and calculation aids.'
        },
        {
          step: 3,
          title: 'Precision Engraving',
          description: 'Engrave scales and markings with high precision using measuring instruments.'
        },
        {
          step: 4,
          title: 'Grid Installation',
          description: 'Add coordinate grids for plotting and graphical calculations.'
        },
        {
          step: 5,
          title: 'Calibration Marks',
          description: 'Add reference points and calibration marks for accuracy verification.'
        },
        {
          step: 6,
          title: 'Installation',
          description: 'Mount the board at appropriate height and angle for comfortable use by astronomers.'
        }
      ],
      
      useCases: [
        'Solving complex astronomical equations graphically',
        'Converting between coordinate systems',
        'Calculating planetary positions and eclipses',
        'Calendar computations and time conversions',
        'Teaching tool for astronomical mathematics'
      ]
    },
    
    {
      name: 'Chaapa Yantra',
      subtitle: 'Arc Instrument',
      category: 'Angle Measurement',
      image: '/images/chaapa-yantra.jpg',
      description: 'The Chaapa Yantra is an arc-shaped instrument designed to measure celestial coordinates with high precision. The curved structure allows for accurate measurement of angles and positions of celestial objects, representing the geometric principles underlying celestial measurement.',
      
      howItWorks: {
        principle: 'The Chaapa Yantra uses precisely constructed arcs with detailed graduations to measure angular positions. The curved geometry provides a natural way to measure angles directly, with observers using sighting mechanisms along the arc to align with celestial objects.',
        
        components: [
          {
            name: 'Primary Arc',
            description: 'Large curved stone or metal arc forming a segment of a circle.',
            specs: 'Radius: 3-6 meters, Arc span: 90-180°'
          },
          {
            name: 'Graduated Scale',
            description: 'Precise angular markings along the arc.',
            specs: 'Marked every 0.5° or 1°, numbered every 5-10°'
          },
          {
            name: 'Sighting Device',
            description: 'Movable pointer or sight that slides along the arc.',
            specs: 'Equipped with crosshairs or pinhole sight'
          },
          {
            name: 'Base Mount',
            description: 'Stable foundation allowing arc to be precisely oriented.',
            specs: 'Can be fixed or have limited rotation'
          }
        ],
        
        operation: [
          'The arc is oriented to measure the desired angle (altitude, azimuth, or other)',
          'Observer uses the sighting device to align with a celestial object',
          'The position of the sight along the arc indicates the angular position',
          'Reading is taken from the graduated scale at the sight position',
          'Multiple arcs can be combined to measure different coordinates simultaneously'
        ]
      },
      
      formulas: {
        title: 'Arc Geometry and Angular Measurement',
        equations: [
          {
            name: 'Arc Length to Angle',
            formula: 'θ = s / R',
            description: 'Angle (θ in radians) from arc length (s) and radius (R)',
            latex: '\\theta = \\frac{s}{R}'
          },
          {
            name: 'Chord Length',
            formula: 'c = 2R sin(θ/2)',
            description: 'Chord length (c) for arc angle (θ) and radius (R)',
            latex: 'c = 2R\\sin(\\theta/2)'
          },
          {
            name: 'Arc Precision',
            formula: 'Δθ = Δs / R',
            description: 'Angular precision (Δθ) from scale division (Δs) and radius (R)',
            latex: '\\Delta\\theta = \\frac{\\Delta s}{R}'
          },
          {
            name: 'Altitude Measurement',
            formula: 'a = θ_sight - θ_horizon',
            description: 'Altitude (a) from sight angle (θ_sight) and horizon reference',
            latex: 'a = \\theta_{\\text{sight}} - \\theta_{\\text{horizon}}'
          }
        ]
      },
      
      specifications: {
        typical_dimensions: {
          'Arc Radius': '3-6 meters',
          'Arc Span': '90-180 degrees',
          'Arc Width': '0.3-0.5 meters',
          'Scale Division': '0.5° or 1°',
          'Sighting Accuracy': '±0.25°'
        },
        accuracy: '±0.25° to ±0.5°',
        materials: 'Stone arc with metal sighting device',
        orientation: 'Adjustable based on measurement type'
      },
      
      constructionSteps: [
        {
          step: 1,
          title: 'Arc Radius Calculation',
          description: 'Calculate optimal arc radius for desired precision and scale readability.'
        },
        {
          step: 2,
          title: 'Arc Construction',
          description: 'Build the arc structure maintaining perfect circular curvature.'
        },
        {
          step: 3,
          title: 'Scale Division',
          description: 'Divide the arc into precise angular segments using geometric methods.'
        },
        {
          step: 4,
          title: 'Graduation Marking',
          description: 'Engrave the angular graduations and numbering on the arc surface.'
        },
        {
          step: 5,
          title: 'Sighting Device',
          description: 'Install the movable sighting mechanism that slides smoothly along the arc.'
        },
        {
          step: 6,
          title: 'Orientation and Mounting',
          description: 'Mount the arc in the appropriate orientation for its intended measurement purpose.'
        }
      ],
      
      useCases: [
        'Measuring altitude of celestial objects',
        'Determining angular distances between stars',
        'Precise angle measurements for surveying',
        'Demonstrating circular geometry in astronomy',
        'Training tool for angular measurements'
      ]
    }
  ];

  const handleYantraChange = (event, newValue) => {
    setSelectedYantra(newValue);
  };

  const currentYantra = yantras[selectedYantra];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #d4af37 30%, #f4e5c3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Learn About Yantras
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
            Explore the ancient astronomical instruments of India - their design, working principles, 
            mathematical formulas, and construction blueprints
          </Typography>
        </Box>
      </motion.div>

      {/* Yantra Selection Tabs */}
      <Paper 
        elevation={3} 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)'
        }}
      >
        <Tabs
          value={selectedYantra}
          onChange={handleYantraChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontSize: '1rem',
              fontWeight: 600,
              minHeight: 70,
              textTransform: 'none'
            },
            '& .Mui-selected': {
              color: '#d4af37 !important'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#d4af37',
              height: 3
            }
          }}
        >
          {yantras.map((yantra, index) => (
            <Tab
              key={index}
              label={
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {yantra.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {yantra.subtitle}
                  </Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Main Content Area */}
      <Grid container spacing={4}>
        {/* Left Column - Image and Overview */}
        <Grid item xs={12} md={5}>
          <motion.div
            key={selectedYantra}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card elevation={4} sx={{ mb: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={currentYantra.image}
                alt={currentYantra.name}
                sx={{ 
                  backgroundColor: alpha('#d4af37', 0.1),
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x300?text=' + currentYantra.name;
                }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip 
                    label={currentYantra.category} 
                    color="primary" 
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="overline" color="text.secondary">
                    Ancient Instrument
                  </Typography>
                </Box>
                
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {currentYantra.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {currentYantra.subtitle}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" color="text.secondary" paragraph>
                  {currentYantra.description}
                </Typography>

                <Button
                  variant="contained"
                  startIcon={<Architecture />}
                  fullWidth
                  sx={{ 
                    mt: 2,
                    background: 'linear-gradient(45deg, #d4af37 30%, #f4e5c3 90%)',
                    color: '#000',
                    fontWeight: 'bold'
                  }}
                  onClick={() => navigate('/generator')}
                >
                  Generate This Yantra
                </Button>
              </CardContent>
            </Card>

            {/* Specifications Card */}
            <Card elevation={4} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Settings sx={{ mr: 1, color: '#d4af37' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Specifications
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Typical Dimensions:
                </Typography>
                {Object.entries(currentYantra.specifications.typical_dimensions).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">{key}:</Typography>
                    <Typography variant="body2" fontWeight="bold">{value}</Typography>
                  </Box>
                ))}
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Accuracy:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {currentYantra.specifications.accuracy}
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Materials:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {currentYantra.specifications.materials}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="body2" color="text.secondary">Orientation:</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {currentYantra.specifications.orientation}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Right Column - Detailed Information */}
        <Grid item xs={12} md={7}>
          <motion.div
            key={selectedYantra + 'right'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* How It Works Section */}
            <Card elevation={4} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Description sx={{ mr: 1, color: '#d4af37' }} />
                  <Typography variant="h6" fontWeight="bold">
                    How It Works
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                  Principle:
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  {currentYantra.howItWorks.principle}
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary" sx={{ mt: 3 }}>
                  Main Components:
                </Typography>
                {currentYantra.howItWorks.components.map((component, index) => (
                  <Accordion key={index} elevation={1} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight="bold">{component.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" paragraph>
                        {component.description}
                      </Typography>
                      <Typography variant="caption" color="primary" fontWeight="bold">
                        Specifications: {component.specs}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary" sx={{ mt: 3 }}>
                  Operation:
                </Typography>
                <Box component="ol" sx={{ pl: 2 }}>
                  {currentYantra.howItWorks.operation.map((step, index) => (
                    <Typography component="li" key={index} variant="body2" paragraph>
                      {step}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Mathematical Formulas Section */}
            <Card elevation={4} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Functions sx={{ mr: 1, color: '#d4af37' }} />
                  <Typography variant="h6" fontWeight="bold">
                    {currentYantra.formulas.title}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                {currentYantra.formulas.equations.map((equation, index) => (
                  <Accordion key={index} elevation={1} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography fontWeight="bold">{equation.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Paper 
                        sx={{ 
                          p: 2, 
                          mb: 2, 
                          backgroundColor: alpha('#d4af37', 0.05),
                          fontFamily: 'monospace',
                          fontSize: '1.1rem',
                          textAlign: 'center'
                        }}
                      >
                        <code>{equation.formula}</code>
                      </Paper>
                      <Typography variant="body2" color="text.secondary">
                        {equation.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>

            {/* Construction Blueprint Section */}
            <Card elevation={4} sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Architecture sx={{ mr: 1, color: '#d4af37' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Construction Blueprint
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
                  Step-by-Step Construction:
                </Typography>
                
                {currentYantra.constructionSteps.map((step, index) => (
                  <Accordion key={index} elevation={1} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={`Step ${step.step}`} 
                          size="small" 
                          sx={{ mr: 2, backgroundColor: '#d4af37', color: '#000' }}
                        />
                        <Typography fontWeight="bold">{step.title}</Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
                
                <Button
                  variant="outlined"
                  startIcon={<Download />}
                  fullWidth
                  sx={{ 
                    mt: 3,
                    borderColor: '#d4af37',
                    color: '#d4af37',
                    '&:hover': {
                      borderColor: '#f4e5c3',
                      backgroundColor: alpha('#d4af37', 0.1)
                    }
                  }}
                  onClick={() => navigate('/generator')}
                >
                  Download Detailed Blueprint (PDF/CAD)
                </Button>
              </CardContent>
            </Card>

            {/* Use Cases Section */}
            <Card elevation={4} sx={{ borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Image sx={{ mr: 1, color: '#d4af37' }} />
                  <Typography variant="h6" fontWeight="bold">
                    Applications & Use Cases
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                
                <Box component="ul" sx={{ pl: 2 }}>
                  {currentYantra.useCases.map((useCase, index) => (
                    <Typography component="li" key={index} variant="body2" paragraph>
                      {useCase}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            mt: 6,
            p: 4,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(244,229,195,0.1) 100%)',
            borderRadius: 3
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Ready to Build Your Own Yantra?
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Use our parametric generator to create precise yantra designs for any latitude and longitude
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Architecture />}
            sx={{
              background: 'linear-gradient(45deg, #d4af37 30%, #f4e5c3 90%)',
              color: '#000',
              fontWeight: 'bold',
              px: 4,
              py: 1.5
            }}
            onClick={() => navigate('/generator')}
          >
            Go to Yantra Generator
          </Button>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Learn;
