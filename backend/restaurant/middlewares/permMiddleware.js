const asyncHandler = require('express-async-handler');
const { permTab, getPermTab } = require('../config/perm');

let permissionsByRole = {};

// Async IIFE
(async () => {
  permissionsByRole = await getPermTab();
})();

const permMiddleware = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.user);
    // Get user id from token
    const id = req.user.id_user;
    const id_role = req.user.id_role;
    console.log('connected in permmiddleWare : ' + id + id_role);
    // Get verb http from request
    const verb = req.method;

    // Verify permissionsByRole is not empty
    if (Object.keys(permissionsByRole).length === 0) {
      throw new Error('Permissions not loaded');
    }

    // Get permission from permission table
    const permissionTab = permTab[req.path][verb][0];
    const permissionNames = permissionsByRole[id_role] || [];

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