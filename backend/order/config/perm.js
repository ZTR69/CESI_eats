// Tab with all permissions associate to url
const asyncHandler = require('express-async-handler');
const Role = require('../models/roleModel');
const Permission = require('../models/permissionModel');
const PermissionsHasRole = require('../models/permissionHasRoleModel');
const User = require('../models/userModel');
const UserRoles = require('../models/userRoleModel');

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

module.exports = { permTab, initPermissions };