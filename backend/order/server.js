// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5010

// Couleur dans la console
const colors = require('colors')

// Connexion à MongoDB
const connectDB = require('./config/db')
connectDB()

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded())

// Routes
app.use('/api/order', require('./routes/orderRoutes'))

// Lancement du serveur
app.listen(port, () => {
console.log(`Server started on ${port}`)
})