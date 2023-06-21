import axios from "axios";

export const API = {
  getProducts: () => axios.get('/products.json/'),
  getOrders: () => axios.get('/orders.json/'),
  deleteOrders: (id) => axios.delete(`/orders/${id}.json/`),
  setOrdersStatus: (id, data) => axios.put(`/orders/${id}.json`, data),
  deleteProduct: (id) => axios.delete(`/products/${id}.json/`),
  putProduct: (id, data) => axios.put(`/products/${id}.json/`, data),
  postProduct: (data) => axios.post(`/products.json/`, data),
  successOrders: () => axios.get(`/successOrders.json/`),
  postSuccessOrders: (data) => axios.post(`/successOrders.json/`, data),
  declinedOrders: () => axios.get(`/declinedOrders.json/`),
  postDeclinedOrders: (data) => axios.post(`/declinedOrders.json/`, data),
}