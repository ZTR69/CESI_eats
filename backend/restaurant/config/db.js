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

// Define an asynchronous function to get the schema of a table
const getTableSchema = asyncHandler( async (tableName) => {
    try {
        // Execute the SQL query to describe the table
        const schema = await query(`DESCRIBE ${tableName}`);
        // Log the schema
        console.log(`Schema for ${tableName}:`, schema);
        return schema;
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error(`Error retrieving schema for ${tableName}:`, err);
        throw err;
    }
});

// Define an asynchronous function to fetch data from the 'menu' table
const getMenu = asyncHandler( async () => {
    try {
        // Execute the SQL query to fetch all records from the 'menu' table
        const menu = await query('SELECT * FROM menu;');
        // Log the fetched records
        console.log('Articles fetched from the database:', menu);
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error('Error executing the query:', err);
        throw err;
    }
});

// Define an asynchronous function to fetch all table names in the database
const showTables = asyncHandler( async () => {
    try {
        // Execute the SQL query to fetch all table names
        const tables = await query('SHOW TABLES;');
        // Log the fetched table names
        console.log('Tables:', tables);
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error('Error executing the query:', err);
        throw err;
    }
});

// Define an asynchronous function to add a restaurant to the 'restaurant' table
const addRestaurant = asyncHandler( async (restaurant) => {
    try {
        // Execute the SQL query to insert the restaurant into the 'restaurant' table
        const result = await query('INSERT INTO restaurant SET ?', restaurant);
        // Log the result
        console.log('Restaurant added:', result);
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error('Error executing the query:', err);
        throw err;
    }
});

// Define an asynchronous function to add a menu to the 'menu' table
const addMenu = asyncHandler( async (menu) => {
    try {
        // Execute the SQL query to insert the menu into the 'menu' table
        const result = await query('INSERT INTO menu SET ?', menu);
        // Log the result
        console.log('Menu added:', result);
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error('Error executing the query:', err);
        throw err;
    }
});

// Define an asynchronous function to add an article to the 'article' table
const addArticle = asyncHandler( async (article) => {
    try {
        // Execute the SQL query to insert the article into the 'article' table
        const result = await query('INSERT INTO article SET ?', article);
        // Log the result
        console.log('Article added:', result);
    } catch (err) {
        // If there is an error executing the query, log the error and throw it
        console.error('Error executing the query:', err);
        throw err;
    }
});

// Export the functions and methods for use in other parts of your application
module.exports = {
    connectToMySQL,
    getTableSchema,
    getMenu,
    showTables,
    addRestaurant,
    addMenu,
    addArticle
};