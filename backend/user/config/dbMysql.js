// Import the required modules
const mysql = require('mysql2');
const { promisify } = require('util');
const asyncHandler = require('express-async-handler')

// Load environment variables from .env file
require('dotenv').config();

// Create a MySQL connection using the environment variables
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Promisify the MySQL connection methods
const connectDB = promisify(connection.connect).bind(connection);
const query = promisify(connection.query).bind(connection);
const endDB = promisify(connection.end).bind(connection);

// Define an asynchronous function to connect to the MySQL database
const connectToMySQL = asyncHandler( async () => {
    try {
        // Connect to the database
        await connectDB();
        // Log a success message
        console.log('Database connection successful');
    } catch (err) {
        // If there is a connection error, log the error and exit the process
        console.error('Database connection error:', err);
        process.exit(1);
    }
});

module.exports = { connectToMySQL, query, endDB };
