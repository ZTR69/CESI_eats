const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');
const Role = require('../models/roleModel');
const PermissionsHasRole = require('../models/permissionHasRoleModel');
const Permission = require('../models/permissionModel');
const perm = require('../config/perm');

const permMiddleware = asyncHandler(async (req, res, next) => {
  try {
    // Get user id from token
    const id = req.user.id_user;
    console.log('connected in permmiddleWare : ' + id);
    // Get verb http from request
    const verb = req.method;
    // Get permission from permission table
    const permissionTab = perm.permTab[req.path][verb][0];

    // Define the relationships between the models
    User.belongsToMany(Role, { through: 'user_has_role', foreignKey: 'user_id_user' });
    Role.belongsToMany(User, { through: 'user_has_role', foreignKey: 'role_id_role' });
    Role.belongsToMany(Permission, { through: 'permissions_has_role', foreignKey: 'role_id_role' });
    Permission.belongsToMany(Role, { through: 'permissions_has_role', foreignKey: 'permissions_id_permission' });

    // Check if user is not suspended
    const userSuspended = await User.findByPk(id);

    if (userSuspended.suspended_until != null) {
      console.log('suspended until : ' + userSuspended.suspended_until);
      res.status(401);
      throw new Error('User suspended');
    }

    // Get the user with its roles and permissions
    const user = await User.findByPk(id, {
        include: [{
            model: Role,
            through: { attributes: [] }, // Ne pas inclure les attributs de la table de jointure
            include: [{
            model: Permission,
            attributes: ['name']
            }]
        }]
    });

    // Extraire les noms de permission
    const permissionNames = user.Roles.flatMap(role => 
        role.permissions.map(permission => permission.name)
    );
    
    console.log('sql perm : ' + permissionNames);
    console.log('permTab : ' + permissionTab);

    // Check if the user has the required permissions
    const hasPermissions = permissionNames.some(permission => 
        permissionTab.includes(permission)
    );
      
    if (!hasPermissions) {
        throw new Error('Insufficient permissions');
    }

    // Continue to the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized, permission failed');
  }
});

module.exports = permMiddleware;