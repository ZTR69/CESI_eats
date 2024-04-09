// Import the required modules
const asyncHandler = require('express-async-handler')
const query = require('../config/db.js');  // Import the MySQL query function

// Define an asynchronous function to get data from the 'menu' table
const getData = asyncHandler(async (req, res) => {
    // Execute the SQL query to fetch all records from the 'menu' table
    const data = await query('SELECT * FROM menu;');
    // Send the fetched records as a JSON response
    res.json(data)
})

// Define an asynchronous function to add a new record to the 'menu' table
const createData = asyncHandler(async (req, res) => {
    // Extract 'name' and 'price' from the request body
    const { name, price } = req.body
    // Execute the SQL query to insert the new record into the 'menu' table
    const data = await query('INSERT INTO menu (name, price) VALUES (?, ?);', [name, price])
    // Send the inserted record as a JSON response
    res.json(data)
})

// Define an asynchronous function to update a record in the 'menu' table
const updateData = asyncHandler(async (req, res) => {
    // Extract 'name' and 'price' from the request body
    const { name, price } = req.body
    // Execute the SQL query to update the record in the 'menu' table
    const data = await query('UPDATE menu SET name = ?, price = ? WHERE id = ?;', [name, price, req.params.id])
    // Send the updated record as a JSON response
    res.json(data)
})

// Define an asynchronous function to delete a record from the 'menu' table
const deleteData = asyncHandler(async (req, res) => {
    // Execute the SQL query to delete the record from the 'menu' table
    const data = await query('DELETE FROM menu WHERE id = ?;', req.params.id)
    // Send the deleted record as a JSON response
    res.json(data)
})

// Export the functions for use in other parts of your application
module.exports = {
    getData,
    createData,
    updateData,
    deleteData
}