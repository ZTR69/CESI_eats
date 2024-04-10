// Tab with all permissions associate to url
const asyncHandler = require('express-async-handler');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const PermissionsHasRole = require('../models/permissionHasRoleModel');

const initPermissions = asyncHandler( async () => {

  console.log('Init permissions');

  await Role.bulkCreate([
    { id_role: 3, title: 'deliveryman', description: 'Role for delivery personnel' },
    { id_role: 5, title: 'commercial service', description: 'Role for commercial service personnel' },
    { id_role: 4, title: 'technical service', description: 'Role for technical service personnel' },
    { id_role: 2, title: 'restorer', description: 'Role for restorer personnel' },
    { id_role: 1, title: 'customer', description: 'Role for customers' },
    { id_role: 6, title: 'suspend', description: 'Role for suspended' }
  ]);

  // Insertion des permissions
  const permissions = await Permission.bulkCreate([
    { name: 'read', description: 'Read permission' },
    { name: 'write', description: 'Write permission' },
    { name: 'delete', description: 'Delete permission' },
    { name: 'read_all_clients', description: 'Read permission for all clients' },
    { name: 'write_all_clients', description: 'Write permission for all clients' },
    { name: 'delete_all_clients', description: 'Delete permission for all clients' },
    { name: 'suspend_all_clients', description: 'Suspend permission for all clients' },
    { name: 'no_perm', description: 'no perm for client' },
    { name: 'read_restaurant', description: 'Read restaurant' },
    { name: 'read_all_restaurant', description: 'Read all restaurant' },
    { name: 'update_restaurant', description: 'write restaurant' },
    { name: 'create_restaurant', description: 'create restaurant' },
    { name: 'delete_restaurant', description: 'del restaurant' },
    { name: 'read_menu', description: 'read menu' },
    { name: 'read_all_menu', description: 'read all menu' },
    { name: 'create_menu', description: 'create menu for restau' },
    { name: 'update_menu', description: 'update menu for restau' },
    { name: 'delete_menu', description: 'delete menu for restau' }
  ]);

  // Insertion des permissions pour chaque rôle
  const rolePermissions = [
    { roleId: 1, permissions: ['read', 'write', 'delete', 'read_restaurant', 'read_menu'] },
    { roleId: 2, permissions: ['read', 'write', 'delete', 'read_restaurant', 'create_restaurant', 'update_restaurant', 'delete_restaurant', 'read_menu', 'create_menu', 'update_menu', 'delete_menu'] },
    { roleId: 3, permissions: ['read', 'write', 'delete'] },
    { roleId: 4, permissions: ['read', 'write', 'delete'] },
    { roleId: 5, permissions: ['read', 'write', 'delete', 'read_all_clients', 'write_all_clients', 'delete_all_clients', 'suspend_all_clients', 'read_all_clients'] },
    { roleId: 6, permissions: ['no_perm'] }
  ];

  const allPermissions = await Permission.findAll();

  // Insertion des permissions pour chaque rôle
  for (const { roleId, permissions } of rolePermissions) {
    for (const permissionName of permissions) {
      const permission = allPermissions.find(p => p.name === permissionName);
      if (permission) {
        await PermissionsHasRole.create({ role_id_role: roleId, permissions_id_permission: permission.id_permission });
      } else {
        console.error(`Permission ${permissionName} not found.`);
      }
    }
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
  },
  '/getMenu': {
      'GET': ['read_all_menu']
  },
  '/getByIdMenu': {
      'GET': ['read_menu']
  },
  '/createMenu': {
      'POST': ['create_menu']
  },
  '/updateMenu': {
      'PUT': ['update_menu']
  },
  '/deleteMenu': {
      'DELETE': ['delete_menu']
  },
};

module.exports = { permTab, initPermissions };