import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (data) => {
  try {
    const response = await api.post('/auth/', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postUsuario = async (data) => {
  try {
    const response = await api.post('/usuarios/', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchUsuario = async (id, data) => {
  try {
    const response = await api.patch(`/usuarios/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsuario = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}/`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPlatillo = async (id) => {
  try {
    const response = await api.get(`/platillos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPlatillos = async () => {
  try {
    const response = await api.get('/platillos');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postPlatillo = async (data) => {
  try {
    const response = await api.post('/platillos/', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPlatillo = async (id, data) => {
  try {
    const response = await api.patch(`/platillos/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlatillo = async (id) => {
  try {
    const response = await api.delete(`/platillos/${id}/`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postPedido = async ({
  mesa,
  nombre_cliente,
  tipo_pedido,
  direccion,
}) => {
  if (mesa === '') {
    mesa = null;
  }

  if (nombre_cliente === '') {
    nombre_cliente = null;
  }

  try {
    const response = await api.post('/pedidos/', {
      mesa,
      nombre_cliente,
      tipo_pedido,
      direccion,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putPedido = async (id, data) => {
  try {
    const response = await api.put(`/pedidos/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPedido = async (id) => {
  try {
    const response = await api.get(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const patchPedido = async (id, data) => {
  try {
    const response = await api.patch(`/pedidos/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePedido = async (id) => {
  try {
    const response = await api.delete(`/pedidos/${id}/`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPedidos = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postDetallePedido = async ({
  pedido,
  platillo,
  cantidad,
  notas,
  precio,
}) => {
  try {
    const response = await api.post('/detalles-pedido/', {
      pedido,
      platillo,
      cantidad,
      notas,
      precio,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putDetallePedido = async (id, data) => {
  try {
    const response = await api.put(`/detalles-pedido/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDetallePedido = async (id) => {
  try {
    const response = await api.delete(`/detalles-pedido/${id}/`);
    return response;
  } catch (error) {
    if (error.response.status === 404) {
      return;
    }
    console.error(error);
  }
};

export const getDetallesPedido = async (id) => {
  try {
    const response = await api.get(`/detalles-pedido/`);
    const detalles = response.data.filter((detalle) => detalle.pedido == id);
    return detalles;
  } catch (error) {
    console.error(error);
  }
};
