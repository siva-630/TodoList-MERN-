// Import Mongoose to define the structure of our data
import mongoose from 'mongoose';

// Define a schema (the structure) for a Todo item
const todoSchema = new mongoose.Schema({
  title: {
    type: String,     // The title must be a string of text
    required: true,   // It is required, so a todo cannot be saved without a title
  },
  completed: {
    type: Boolean,    // The completed status must be true or false
    default: false,   // By default, a new todo is NOT completed
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' timestamps to each todo
  timestamps: true,
});

// Create a model based on the schema and export it
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
