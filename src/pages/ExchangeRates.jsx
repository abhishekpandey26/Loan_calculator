import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useExchangeRate } from '../hooks/useExchangeRate.jsx';
import { useGlobalContext } from '../context/GlobalContext.jsx';

const ExchangeRates = () => {
  useExchangeRate();
  const { rates } = useGlobalContext();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Exchange Rates (Base: USD)</Typography>
      <List>
        {Object.entries(rates).map(([currency, rate]) => (
          <ListItem key={currency}>
            <ListItemText primary={`${currency}: ${rate}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ExchangeRates;