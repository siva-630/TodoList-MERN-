import express from 'express';
// Import the controller functions we created
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

// Create a new router object from Express
const router = express.Router();

// Define a GET route to fetch all todos
router.get('/', getTodos);

// Define a POST route to create a new todo
router.post('/', createTodo);

// Define a PUT route to update a specific todo by its ID
router.put('/:id', updateTodo);

// Define a DELETE route to remove a specific todo by its ID
router.delete('/:id', deleteTodo);

// Export the router so we can use it in index.js
export default router;
