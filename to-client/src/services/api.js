import axios from 'axios';

// The base URL for our backend API. 
// Uses the environment variable if deployed, otherwise falls back to local server.
const API_URL = "https://todo-list-mern-vv1b.vercel.app/";

// Function to fetch all tasks from the database (GET request)
export const fetchTodos = async () => {
  // 'await' pauses the function until the server responds
  const response = await axios.get(API_URL);

  return response.data;
};

// Function to create a new task (POST request)
export const createTodo = async (todoData) => {
  // We send the new 'todoData' to the server so it can be saved in the database
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

// Function to update an existing task (PUT request)
export const updateTodo = async (id, todoData) => {
  // The URL looks like http://localhost:5000/api/todos/123 to update specific task '123'
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

// Function to delete a task (DELETE request)
export const deleteTodo = async (id) => {
  // Tells the server to delete the task with this specific ID
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
