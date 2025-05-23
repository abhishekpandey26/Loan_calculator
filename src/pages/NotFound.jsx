// src/pages/NotFound.jsx

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography>The page you are looking for does not exist.</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Go to Home Page
      </Button>
    </Container>
  );
};

export default NotFound;
