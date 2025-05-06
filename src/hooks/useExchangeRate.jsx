import { useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const API_KEY = 'd141121b6801c605333d84a1';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

export const useExchangeRate = () => {
  const { setRates } = useGlobalContext();

  useEffect(() => {
    axios.get(BASE_URL)
      .then(response => setRates(response.data.conversion_rates))
      .catch(err => console.error('Error fetching exchange rates:', err));
  }, [setRates]);
};
