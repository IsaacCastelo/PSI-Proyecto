import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPlatillos = async () => {
  try {
    const response = await api.get('/platillos');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postOrden = async (data) => {
  try {
    const response = await api.post('/pedidos/', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}