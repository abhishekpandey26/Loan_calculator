export const useEMICalculator = (P, R, N) => {
    const monthlyRate = R / (12 * 100);
    const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, N)) / (Math.pow(1 + monthlyRate, N) - 1);
    return emi.toFixed(2);
  };
  
  