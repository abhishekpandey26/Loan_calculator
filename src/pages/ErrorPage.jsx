import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Something went wrong in the application.</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirect}
        style={{ marginTop: '16px' }}
      >
        Go to Home Page
      </Button>
    </Container>
  );
};
export default ErrorPage;
