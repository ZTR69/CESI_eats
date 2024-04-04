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

const createDeliveryRole = asyncHandler(async () => {
    try {
        // Connect to the database
        await connectDB();
        // Create the delivery role
        await query('INSERT INTO role (title, description) VALUES (?, ?)', ['deliveryman', 'Role for delivery personnel']);
        // Log a success message
        console.log('Delivery role created successfully');
    } catch (err) {
        // If there is a connection error, log the error and exit the process
        console.error('Error creating delivery role:', err);
        process.exit(1);
    }
});

const createRestorerRole = asyncHandler(async () => {
    try {
        await connectDB();
        await query('INSERT INTO role (title, description) VALUES (?, ?)', ['restorer', 'Role for restorer personnel']);
        console.log('Restorer role created successfully');
    } catch (err) {
        console.error('Error creating restorer role:', err);
        process.exit(1);
    }
});

const createCustomerRole = asyncHandler(async () => {
    try {
        await connectDB();
        await query('INSERT INTO role (title, description) VALUES (?, ?)', ['customer', 'Role for customers']);
        console.log('Customer role created successfully');
    } catch (err) {
        console.error('Error creating customer role:', err);
        process.exit(1);
    }
});

const createTechnicalServiceRole = asyncHandler(async () => {
    try {
        await connectDB();
        await query('INSERT INTO role (title, description) VALUES (?, ?)', ['technical service', 'Role for technical service personnel']);
        console.log('Technical service role created successfully');
    } catch (err) {
        console.error('Error creating technical service role:', err);
        process.exit(1);
    }
});

const createCommercialServiceRole = asyncHandler(async () => {
    try {
        await connectDB();
        await query('INSERT INTO role (title, description) VALUES (?, ?)', ['commercial service', 'Role for commercial service personnel']);
        console.log('Commercial service role created successfully');
    } catch (err) {
        console.error('Error creating commercial service role:', err);
        process.exit(1);
    }
});

module.exports = { connectToMySQL, query, endDB, createDeliveryRole, createRestorerRole, createCustomerRole, createTechnicalServiceRole, createCommercialServiceRole };
