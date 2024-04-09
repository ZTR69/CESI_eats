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
    '/register': {
        'POST': ['write']
    },
    '/login': {
        'POST': ['write']
    },
    '/getMe': {
        'GET': ['read']
    },
    '/update': {
        'PUT': ['write']
    },
    '/delete': {
        'DELETE': ['delete']
    },
    '/getMeCommercial': {
        'GET': ['read_all_clients']
    },
    '/updateCommercial': {
        'PUT': ['write_all_clients']
    },
    '/deleteCommercial': {
        'DELETE': ['delete_all_clients']
    },
    '/suspendCommercial': {
        'PUT': ['suspend_all_clients']
    },
    '/unsuspendCommercial': {
        'PUT': ['unsuspend_all_clients']
    }
};

module.exports = { permTab, getPermTab };