import React from 'react';
import { Container, Typography } from '@mui/material';

const NotFound = () => (
  <Container>
    <Typography variant="h4" gutterBottom>404 - Page Not Found</Typography>
    <Typography>The page you are looking for does not exist.</Typography>
  </Container>
);

export default NotFound;