// Import mongoose to connect to the database
import mongoose from 'mongoose';

// Create an asynchronous function to handle the database connection
const connectDB = async () => {
  try {
    // Attempt to connect using the URI stored in our .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If successful, log the connection host to the console
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    // If there is an error (like wrong password or network issue), log it
    console.error(`Database connection error: ${error.message}`);
    
    // Exit the process with failure code 1
    process.exit(1);
  }
};

// Export the function so we can use it in index.js
export default connectDB;
