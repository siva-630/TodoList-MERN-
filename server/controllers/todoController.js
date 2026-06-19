// Import the Todo model so we can interact with the database
import Todo from '../models/Todo.js';

// Function to get all todos from the database
export const getTodos = async (req, res) => {
  try {
    // Find all todos in the database
    const todos = await Todo.find();
    
    // Send the todos back to the client as JSON
    res.status(200).json(todos);
  } catch (error) {
    // If there is an error, send a 500 (Server Error) status and the error message
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new todo
export const createTodo = async (req, res) => {
  try {
    // Extract the title from the request body sent by the frontend
    const { title } = req.body;
    
    // Create a new Todo object with the title
    const newTodo = new Todo({ title: title });
    
    // Save the new todo to the database
    const savedTodo = await newTodo.save();
    
    // Send the saved todo back with a 201 (Created) status
    res.status(201).json(savedTodo);
  } catch (error) {
    // If saving fails (like missing a required field), send a 400 (Bad Request) status
    res.status(400).json({ message: error.message });
  }
};

// Function to update an existing todo
export const updateTodo = async (req, res) => {
  try {
    // Extract the id from the URL parameters (e.g., /api/todos/123)
    const { id } = req.params;
    
    // Check if the todo exists in the database
    const todoExists = await Todo.findById(id);

    if (!todoExists) {
      // If it doesn't exist, return a 404 (Not Found) status
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update the todo with the new data from the request body
    // The { returnDocument: 'after' } option tells Mongoose to return the updated document
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
    });

    // Send the updated todo back to the client
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a todo
export const deleteTodo = async (req, res) => {
  try {
    // Extract the id from the URL parameters
    const { id } = req.params;
    
    // Find the todo by its ID
    const todo = await Todo.findById(id);

    if (!todo) {
      // If it doesn't exist, return a 404 (Not Found) status
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Delete the todo from the database
    await todo.deleteOne();
    
    // Send a success message back to the client
    res.status(200).json({ message: 'Todo successfully deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
