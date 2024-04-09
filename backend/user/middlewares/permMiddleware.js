const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const UserRole = require('../models/userRoleModel');
const Role = require('../models/roleModel');
const PermissionsHasRole = require('../models/permissionHasRoleModel');
const Permission = require('../models/permissionModel');
const perm = require('../config/perm');

let permissionNames = [];

const getPermTab = asyncHandler( async (req, res, next) => {
  try {
    if (permissionNames.length === 0) {
      // Define associations directly in the function
      Role.belongsToMany(Permission, { through: 'permissions_has_role', foreignKey: 'role_id_role', as: 'Permissions' });
      Permission.belongsToMany(Role, { through: 'permissions_has_role', foreignKey: 'permissions_id_permission', as: 'Roles' });

      const allRoles = await Role.findAll({
        include: [{
          model: Permission,
          as: 'Permissions', // Use the alias defined in the association
          attributes: ['name']
        }]
      });

      // Extract permission names
      permissionNames = allRoles.flatMap(role =>
        role.Permissions.map(permission => permission.name)
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized, permission failed');
  }
});

const permMiddleware = asyncHandler(async (req, res, next) => {
  try {
    // Get user id from token
    const id = req.user.id_user;
    console.log('connected in permmiddleWare : ' + id);
    // Get verb http from request
    const verb = req.method;
    // Get permission from permission table
    const permissionTab = perm.permTab[req.path][verb][0];

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

module.exports = { permMiddleware, getPermTab };