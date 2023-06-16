import axios from "axios";

export const API = {
  getProducts: () => axios.get('/products.json/'),
  getOrders: () => axios.get('/orders.json/'),
  deleteOrders: (id) => axios.delete(`/orders/${id}.json/`),
  setOrdersStatus: (id, data) => axios.put(`/orders/${id}/status.json/`, data),
  deleteProduct: (id) => axios.delete(`/products/${id}.json/`),
  putProduct: (id, data) => axios.put(`/products/${id}.json/`, data),
  postProduct: (data) => axios.post(`/products.json/`, data),
  successOrders: () => axios.get(`/successOrdes.json/`),
  declinedOrders: () => axios.get(`/declinedOrders.json/`),
}