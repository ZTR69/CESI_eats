// Tab with all permissions associate to url
const asyncHandler = require('express-async-handler');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');

const getPermTab = asyncHandler( async () => {
    try {
      // Define associations directly in the function
      Role.belongsToMany(Permission, { through: 'permissions_has_role', foreignKey: 'role_id_role'});
      Permission.belongsToMany(Role, { through: 'permissions_has_role', foreignKey: 'permissions_id_permission'});
  
      const allRoles = await Role.findAll({
        include: [{
          model: Permission,
          attributes: ['name'],
          through: { attributes: [] } // Exclude through table fields
        }]
      });

      const permissionsByRole = {};
  
      allRoles.forEach(role => {
        permissionsByRole[role.id_role] = role.permissions.map(permission => permission.name);
      });
      return permissionsByRole;
    } catch (error) {
      console.log(error);
    }
  });

const permTab = {
    '/get': {
        'GET': ['read_all_restaurant']
    },
    '/getById': {
        'GET': ['read_restaurant']
    },
    '/create': {
        'POST': ['create_restaurant']
    },
    '/update': {
        'PUT': ['update_restaurant']
    },
    '/delete': {
        'DELETE': ['delete_restaurant']
    }
};

module.exports = { permTab, getPermTab };