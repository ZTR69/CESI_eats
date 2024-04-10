// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

// Definition du port
const port = process.env.PORT || 5020

// Connexion to MongoDB
const connectDB = require('./config/dbMongo')
connectDB()

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/delivery', require('./routes/deliveryRoutes'))

// Launch server
app.listen(port, () => {
console.log(`Server started on ${port}`)
})