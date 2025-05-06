// src/pages/About.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => (
  <Container>
    <Typography variant="h4" gutterBottom>About</Typography>
    <Typography>This application helps users calculate their loan EMI and view current currency exchange rates.</Typography>
  </Container>
);

export default About;
