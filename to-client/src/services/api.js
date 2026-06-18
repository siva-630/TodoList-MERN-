import axios from 'axios';

// The base URL for our backend API
const API_URL = 'http://localhost:5000/api/todos';

// Function to fetch all todos
export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Function to create a new todo
export const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

// Function to update an existing todo
export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

// Function to delete a todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};