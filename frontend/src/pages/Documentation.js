import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  LocationOn,
  Camera,
  Science,
  Timeline as TimelineIcon,
  Architecture,
  School,
  Search,
  Assignment,
  PhotoCamera,
  Map,
  AccessTime,
  Star,
  ExpandMore,
  Insights,
  Engineering
} from '@mui/icons-material';
import RollingGallery from '../components/RollingGallery';

const Documentation = () => {
  const researchPhases = [
    {
      title: 'Pre-Visit Planning',
      date: 'October 2024',
      icon: <Assignment />,
      description: 'Extensive literature review and historical documentation study',
      details: ['Ancient manuscript analysis', 'Previous research compilation', 'Instrument identification preparation']
    },
    {
      title: 'Delhi Visit',
      date: 'October 12, 2024',
      icon: <LocationOn />,
      description: 'On-ground research at Jantar Mantar, Delhi',
      details: ['Direct instrument measurements', 'Photographic documentation', 'Shadow pattern analysis']
    },
    {
      title: 'Data Analysis',
      date: 'October 14, 2024',
      icon: <Insights />,
      description: 'Processing collected data and measurements',
      details: ['Mathematical modeling', 'Accuracy verification', 'Digital reconstruction']
    },
    {
      title: 'Implementation',
      date: 'October 15, 2024',
      icon: <Engineering />,
      description: 'Integration into DIGIYANTRA platform',
      details: ['Algorithm development', 'Web application integration', 'User interface design']
    }
  ];

  const instruments = [
    {
      name: 'Samrat Yantra',
      type: 'Sundial',
      accuracy: '±2 minutes',
      insights: 'Massive triangular gnomon for precise time measurement',
      measurements: 'Height: 23m, Base: 44m'
    },
    {
      name: 'Jai Prakash Yantra',
      type: 'Celestial Sphere',
      accuracy: '±5 minutes',
      insights: 'Hemispherical bowls representing celestial coordinates',
      measurements: 'Diameter: 27m each hemisphere'
    },
    {
      name: 'Rama Yantra',
      type: 'Cylindrical Coordinate',
      accuracy: '±3 minutes',
      insights: 'Vertical cylindrical structure for altitude measurements',
      measurements: 'Height: 12m, Diameter: 30m'
    },
    {
      name: 'Misra Yantra',
      type: 'Mixed Instrument',
      accuracy: '±4 minutes',
      insights: 'Combination tool for multiple astronomical calculations',
      measurements: 'Composite structure with multiple scales'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 30%, #FFD700 60%, #FFFF66 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <Search />
          On Ground Research
        </Typography>
        
        <Typography variant="h5" sx={{ color: '#F5E6D3', mb: 3, fontStyle: 'italic' }}>
          Field Study at Jantar Mantar, Delhi - Where Ancient Wisdom Meets Modern Technology
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          <Chip icon={<LocationOn />} label="Delhi, India" sx={{ bgcolor: 'rgba(255,215,0,0.2)', color: '#FFD700' }} />
          <Chip icon={<Architecture />} label="4 Instruments Studied" sx={{ bgcolor: 'rgba(255,215,0,0.2)', color: '#FFD700' }} />
        </Box>
      </Box>

      {/* Research Overview */}
      <Card elevation={4} sx={{ mb: 6, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Science />
            Research Mission
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'white', textAlign: 'justify' }}>
            Our team embarked on a comprehensive field research expedition to the historic Jantar Mantar observatory in Delhi, 
            a UNESCO World Heritage site built by Maharaja Jai Singh II in 1724. This on-ground investigation aimed to bridge 
            the gap between ancient astronomical wisdom and modern computational methods, gathering precise measurements and 
            insights that would inform the development of our DIGIYANTRA platform.
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'white', textAlign: 'justify' }}>
            Through direct observation, measurement, and photographic documentation, we collected invaluable data about the 
            construction techniques, operational principles, and mathematical precision of these 300-year-old astronomical instruments. 
            This field work forms the foundation of our digital reconstruction algorithms and ensures historical accuracy in our platform.
          </Typography>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card elevation={4} sx={{ mb: 6, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
            <Camera />
            Photo Documentation
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mb: 2, fontSize: '1rem', textAlign: 'center' }}>
            Field research photographs from our visit to Jantar Mantar, Delhi
          </Typography>
          
          {/* Rolling Gallery Component */}
          <Box sx={{ my: 2 }}>
            <RollingGallery autoplay={true} pauseOnHover={true} />
          </Box>
        </CardContent>
      </Card>

      {/* Research Timeline */}
      <Card elevation={4} sx={{ mb: 6, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimelineIcon />
            Research Timeline
          </Typography>
          
          <Box sx={{ position: 'relative' }}>
            {researchPhases.map((phase, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 4, position: 'relative' }}>
                {/* Timeline Line */}
                {index < researchPhases.length - 1 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 19,
                      top: 40,
                      width: 2,
                      height: 'calc(100% + 16px)',
                      bgcolor: '#D4AF37',
                      zIndex: 0
                    }}
                  />
                )}
                
                {/* Timeline Icon */}
                <Box
                  sx={{
                    bgcolor: '#FFD700',
                    color: '#000',
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    zIndex: 1,
                    flexShrink: 0
                  }}
                >
                  {phase.icon}
                </Box>
                
                {/* Content */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                    {phase.title}
                  </Typography>
                  
                  <Paper elevation={2} sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Typography variant="body2" paragraph sx={{ color: 'white' }}>
                      {phase.description}
                    </Typography>
                    <List dense>
                      {phase.details.map((detail, idx) => (
                        <ListItem key={idx} sx={{ py: 0 }}>
                          <ListItemIcon>
                            <Star sx={{ color: '#FFD700', fontSize: 16 }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={detail} 
                            primaryTypographyProps={{ color: 'white', fontSize: '0.9rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Instruments Studied */}
      <Typography variant="h4" gutterBottom sx={{ color: '#F5E6D3', fontWeight: 'bold', textAlign: 'center', mb: 4 }}>
        🏛️ Instruments Documented
      </Typography>
      
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {instruments.map((instrument, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card elevation={4} sx={{ height: '100%', bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                  {instrument.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: '#8B4513', fontWeight: 'bold' }}>
                  {instrument.type}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Chip 
                    label={`Accuracy: ${instrument.accuracy}`} 
                    size="small" 
                    sx={{ bgcolor: '#FFD700', color: '#000', fontWeight: 'bold' }} 
                  />
                </Box>
                
                <Typography variant="body2" paragraph sx={{ color: 'white', fontStyle: 'italic' }}>
                  {instrument.insights}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="caption" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                  Measured Dimensions:
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {instrument.measurements}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Key Findings */}
      <Card elevation={4} sx={{ mb: 6, bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Insights />
            Key Research Findings
          </Typography>
          
          <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#FFD700' }} />}>
              <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                🎯 Precision & Accuracy
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.7 }}>
                Our measurements confirmed that the Jantar Mantar instruments achieve remarkable accuracy for their time period. 
                The Samrat Yantra maintains time precision within ±2 minutes, while celestial coordinate instruments like the 
                Jai Prakash Yantra demonstrate sophisticated understanding of spherical astronomy and coordinate transformation.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#FFD700' }} />}>
              <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                🏗️ Construction Techniques
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.7 }}>
                The masonry construction reveals advanced knowledge of geometry and astronomy. Each instrument is precisely 
                aligned with cardinal directions, and the scale graduations demonstrate understanding of trigonometry and 
                spherical coordinates. The use of local materials and climate-appropriate design ensures longevity.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)' }}>
            <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#FFD700' }} />}>
              <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                🔬 Modern Applications
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ color: 'white', lineHeight: 1.7 }}>
                Our research identified key principles that translate directly to modern computational methods. The geometric 
                algorithms used in yantra design can be parameterized for different latitudes, forming the mathematical 
                foundation for our DIGIYANTRA platform's automatic instrument generation capabilities.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>

      {/* Impact & Future Work */}
      <Card elevation={4} sx={{ bgcolor: 'rgba(245, 245, 220, 0.95)' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#D4AF37', fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
            🚀 Research Impact & Future Directions
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                Immediate Impact
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Enhanced mathematical accuracy in DIGIYANTRA algorithms" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Validated historical construction techniques" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Comprehensive instrument documentation database" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ color: '#FFD700', fontWeight: 'bold' }}>
                Future Research
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Extended study to Jaipur, Varanasi, and Ujjain observatories" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="3D scanning and digital preservation initiatives" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Star sx={{ color: '#FFD700' }} /></ListItemIcon>
                  <ListItemText 
                    primary="Collaboration with ASI for heritage documentation" 
                    primaryTypographyProps={{ color: 'white' }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Documentation;