import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/todos";

export const getTodos = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.data;
};

export const createTodo = async (title) => {
  const response = await axios.post(API_BASE_URL, { title });
  return response.data.data;
};

export const updateTodo = async (id, updatedData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return response.data.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};