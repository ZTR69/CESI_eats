// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
// Utilisation du middleware CORS
app.use(cors());

// Routes
app.use('/api/users', require('./routes/userRoutes'))

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Cesi_eats',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['./controllers/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/users/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Console log path swagger
console.log('Swagger running on http://localhost:5000/users/api-docs/')

// Launch server
app.listen(port, () => {
console.log(`Server started on ${port}`)
})