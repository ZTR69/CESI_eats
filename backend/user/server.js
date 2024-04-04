// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

// Couleur dans la console
const colors = require('colors')

// Connexion à MongoDB
const db = require('./config/db.js')
db.connectToMySQL();
db.createDeliveryRole();
db.createRestorerRole();
db.createCustomerRole();
db.createTechnicalServiceRole();
db.createCommercialServiceRole();

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))

// Launch server
app.listen(port, () => {
console.log(`Server started on ${port}`)
})