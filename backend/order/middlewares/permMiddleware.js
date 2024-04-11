const asyncHandler = require('express-async-handler');
const { permTab } = require('../config/perm');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const PermissionsHasRole = require('../models/permissionHasRoleModel');

const permMiddleware = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.user);
    // Get user id from token
    const id = req.user.id_user;
    const id_role = req.user.id_role;
    console.log('connected in permmiddleWare : ' + id + id_role);
    // Get verb http from request
    const verb = req.method;

    // Define a many-to-many relation between Role and Permission through the "perm_role" table
    Permission.belongsToMany(Role, { through: 'perm_role', foreignKey: 'permissions_id_permission'});
    Role.belongsToMany(Permission, { through: 'perm_role', foreignKey: 'role_id_role'});

    // Check if a role with the provided id_role exists
    const role = await Role.findByPk(id_role);
    if (!role) {
      console.log(`Role with id_role ${id_role} not found`);
      return;
    }

    // Get permissions by role
    const roleWithPermissions = await Role.findByPk(id_role, {
      include: [{
        model: Permission,
        through: {
          model: PermissionsHasRole,
          attributes: [],  // This will skip the perm_role table's properties in the returned data
        },
      }]
    });

    if (!roleWithPermissions.Permissions) {
      console.log(`Permissions for role with id_role ${id_role} not found`);
      return;
    }

    const permissionNames = roleWithPermissions.Permissions.map(permission => permission.name);
    // Get permission names
    console.log('permNames : ' + permissionNames);

    // Get permission from permission table
    const permissionTab = permTab[req.path][verb][0];

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
    throw new Error('Not authorized, permission failed : ' + error);
  }
});

module.exports = { permMiddleware };