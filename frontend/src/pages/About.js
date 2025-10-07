import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => (
  <Container maxWidth="md" sx={{ py: 6 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 100%)', color: '#F5E6D3' }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, color: '#D4AF37' }}>
        About YANTRA.AI
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.2rem', lineHeight: 1.8 }}>
        <strong>Problem Statement:</strong> Instruments in Observational Astronomy<br /><br />
        Indian Astronomers had developed a range of instruments to observe the sky. For example, the Samrat Yantra, Rama Yantra, Digamsa Yantra, Dhruva-Protha-Chakra Yanra, yantra-samrat (Combination of Samrat Yantra and Dhruva-Protha-Chakra Yanra), Golayantra chakra yantra, Bhitti Yantra, Dakshinottara Bhitti Yantra, Rasivalaya Yantra, Nadi valaya yantra, Palaka yantra, Chaapa yantra, are some of the yantras used to keep track of time, track celestial objects and used to develop models to predict astronomical events such as eclipses.<br /><br />
        Many of these have been built across the country in various places like Delhi, Jaipur, Varanasi, and Ujjain. Naturally, these instruments were calibrated for the latitude and longitude of a particular location. Ujjain (now Dongla, in Madhya Pradesh) was used as the reference point for timekeeping and measuring longitudes. Incidentally, the reference was changed to Greenwich only in the last 250 years.<br /><br />
        The challenge is to develop software that will generate the dimensions of these instruments for any latitude and longitude in India.<br /><br />
        <strong>Why is this needed?</strong><br />
        Ancient Indian astronomical instruments were designed for specific locations. Their geometry depends on latitude and longitude, affecting how they track celestial events. To reconstruct, simulate, or build these yantras anywhere, you need location-specific dimensions.<br /><br />
        <strong>What needs to be done?</strong><br />
        Develop software that takes latitude and longitude as input and outputs the geometric dimensions for each instrument. Implement mathematical models for each yantra, so the system can calculate the correct sizes, angles, and placements. Make the system flexible for any location, not just historical sites.<br /><br />
        <strong>Why?</strong><br />
        To revive and understand ancient Indian astronomy in a modern, location-aware way. To enable accurate digital/physical reconstructions for museums, education, research, and public engagement. To show how advanced and location-specific ancient Indian science was, and to connect it with today’s technology.<br /><br />
        <strong>In short:</strong> The software is needed to generate correct, location-specific dimensions for ancient astronomical instruments, making them usable and understandable anywhere, not just at their original sites.
      </Typography>
    </Paper>
  </Container>
);

export default About;
