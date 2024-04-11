// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors');

// Definition du port
const port = process.env.PORT || 5010

// Connexion à MySQL
const sequelize = require('./config/dbMysql.js')
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

sequelize.sync()
    .then(() => {
      console.log('All tables have been successfully created.');
    })
    .catch(error => console.error('Unable to create tables:', error));
  
  

// Connexion à MongoDB
const connectDB = require('./config/dbMongo')
connectDB()

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Utilisation du middleware CORS
app.use(cors());

// Routes
app.use('/api/orders', require('./routes/orderRoutes'))

// Lancement du serveur
app.listen(port, () => {
console.log(`Server started on ${port}`)
})