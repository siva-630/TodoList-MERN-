// Import the required packages
import express from 'express'; // Express is our web server framework
import cors from 'cors';       // CORS allows our React frontend to talk to our backend
import dotenv from 'dotenv';   // Dotenv lets us read variables from the .env file

// Import our custom database connection function and routes
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

// Load environment variables from the .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize our Express application
const app = express();

// --- Middleware setup ---
// Enable CORS so the frontend can make requests to this backend
app.use(cors());
// Parse incoming JSON data from request bodies
app.use(express.json());

// --- Routes setup ---
// Any request that starts with '/api/todos' will be handled by todoRoutes
app.use('/api/todos', todoRoutes);

// Define the port number (use the one from .env, or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
