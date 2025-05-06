import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext.jsx';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const useExchangeRate = () => {
  const { setRates } = useGlobalContext();

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => setRates(response.data.conversion_rates))
      .catch(err => console.error('Error fetching exchange rates:', err));
  }, [setRates]);
};
