import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createOrder = async () => {
  const response = await axios.post(`${API_URL}/create-order`);
  return response.data;
};

export const verifyPayment = async (paymentData: any) => {
  const response = await axios.post(`${API_URL}/verify-payment`, paymentData);
  return response.data;
};

export const generateResume = async (formData: any) => {
  const response = await axios.post(`${API_URL}/generate-resume`, formData);
  return response.data;
};
