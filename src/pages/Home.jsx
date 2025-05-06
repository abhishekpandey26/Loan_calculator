import React, { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

const Home = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const months = parseInt(tenure);

    if (!principal || !annualRate || !months) {
      alert("Please enter valid inputs");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const emiCalc =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPay = emiCalc * months;
    const totalInt = totalPay - principal;

    setEmi(emiCalc.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
  };

  const resetCalculator = () => {
    setAmount("");
    setRate("");
    setTenure("");
    setEmi(null);
    setTotalInterest(null);
    setTotalPayment(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Loan EMI Calculator
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Loan Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Interest Rate (%)"
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tenure (months)"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              onClick={calculateEMI}
              sx={{ mr: 2 }}
            >
              Calculate
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={resetCalculator}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
        {emi && (
          <Paper elevation={2} sx={{ mt: 4, p: 2, textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Monthly EMI: ₹{emi}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Interest: ₹{totalInterest}
            </Typography>
            <Typography variant="body1">
              Total Payment: ₹{totalPayment}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
