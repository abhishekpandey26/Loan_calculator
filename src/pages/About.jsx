import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';
import axios from 'axios';


const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const Home = () => {
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [term, setTerm] = useState(5);
  const [emi, setEmi] = useState(null);

  const [currency, setCurrency] = useState('INR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [lastUpdate, setLastUpdate] = useState('');

  const [schedule, setSchedule] = useState([]);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 12 / 100;
    const months = parseInt(term) * 12;

    const emiCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiCalc.toFixed(2));

   
    let currentBalance = principal;
    const scheduleArray = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = currentBalance * monthlyRate;
      const principalPayment = emiCalc - interestPayment;
      currentBalance -= principalPayment;

      scheduleArray.push({
        month: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(currentBalance, 0),
      });
    }

    setSchedule(scheduleArray);
  };

  const fetchExchangeRates = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setExchangeRates(res.data.conversion_rates);
      setLastUpdate(res.data.time_last_update_utc);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const resetTable = () => {
    setSchedule([]);
    setEmi(null);
  };

  const convertedEMI =
    emi && exchangeRates[currency]
      ? (emi * exchangeRates[currency]).toFixed(2)
      : null;

  const currencyFormat = (value) => {
    return value ? `${parseFloat(value).toFixed(2)} ${currency}` : '';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Loan Calculator Dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Loan Amount"
              type="number"
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Interest Rate (%)"
              type="number"
              fullWidth
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Term (Years)"
              type="number"
              fullWidth
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={calculateEMI}
        >
          CALCULATE
        </Button>

        {emi && (
          <>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Monthly EMI: {convertedEMI ? currencyFormat(convertedEMI) : `${emi} USD`}
            </Typography>

            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                {Object.keys(exchangeRates).map((cur) => (
                  <MenuItem key={cur} value={cur}>
                    {cur}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {convertedEMI && (
              <Typography sx={{ mt: 2 }}>
                EMI in {currency}: {currencyFormat(convertedEMI)}
              </Typography>
            )}

            {lastUpdate && (
              <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Last Updated: {lastUpdate}
              </Typography>
            )}

            <Button
              variant="outlined"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={resetTable}
            >
              RESET TABLE
            </Button>
          </>
        )}

        {schedule.length > 0 && (
          <TableContainer sx={{ mt: 4, maxHeight: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Amortization Schedule ({currency})
            </Typography>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>
                      {currencyFormat(row.principal * exchangeRates[currency])}
                    </TableCell>
                    <TableCell>
                      {currencyFormat(row.interest * exchangeRates[currency])}
                    </TableCell>
                    <TableCell>
                      {currencyFormat(row.balance * exchangeRates[currency])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
