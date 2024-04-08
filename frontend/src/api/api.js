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

export const postPedido = async ({ mesa, nombre_cliente, tipo_pedido }) => {
  try {
    const response = await api.post('/pedidos/', {
      mesa,
      nombre_cliente,
      tipo_pedido,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
