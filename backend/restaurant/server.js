// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

// Definition du port
const port = process.env.PORT || 5001

// Connexion à MySQL
const sequelize = require('./config/dbMysql.js')
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

// Connexion to MongoDB
const connectDB = require('./config/dbMongo')
connectDB()

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/restaurant', require('./routes/restaurantRoutes'))

// Launch server
app.listen(port, () => {
console.log(`Server started on ${port}`)
})