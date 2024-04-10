// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')

// Definition du port
const port = process.env.PORT || 5000

// Connexion à MySQL
const sequelize = require('./config/dbMysql.js')
sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

// Import des modèles
const User = require('./models/userModel.js')
const Role = require('./models/roleModel.js')
const UserRole = require('./models/userRoleModel.js')
const PermissionsHasRole = require('./models/permissionHasRoleModel.js')
const Permission = require('./models/permissionModel.js')

sequelize.sync({ force: true })
  .then(() => {
    console.log('All tables have been successfully created.');
    // Init permissions
    const perm = require('./config/perm.js')
    perm.initPermissions()
  })
  .catch(error => console.error('Unable to create tables:', error));


// Connexion to MongoDB
const connectDB = require('./config/dbMongo')
connectDB()

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