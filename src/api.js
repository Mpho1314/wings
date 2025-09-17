import axios from 'axios';
import API_URL from './config';

export const getProducts = () => axios.get(`${API_URL}/products`);
export const addProduct = (product) => axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, data) => axios.put(`${API_URL}/products/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
export const getTransactions = () => axios.get(`${API_URL}/transactions`);
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);
