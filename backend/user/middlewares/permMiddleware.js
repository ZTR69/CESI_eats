const asyncHandler = require('express-async-handler');
const db = require('../config/dbMysql');
const perm = require('../config/perm');

// Get permission from user id
const permMiddleware = asyncHandler(async (req, res, next) => {
    try {
        // Get user id from token
        const id = req.user.id_user;
        // Get verb http from request
        const verb = req.method;
        // Get permission from permission table
        const permission = perm.permTab[req.originalUrl][verb][0];
        
        // Get permissions from user id
        const [rows] = await db.query(`
        SELECT p.name
        FROM user u
        JOIN user_has_role ur ON u.id_user = ur.user_id_user
        JOIN role r ON ur.role_id_role = r.id_role
        JOIN permissions_has_role pr ON r.id_role = pr.role_id_role
        JOIN permissions p ON pr.permissions_id_permission = p.id_permission
        WHERE u.id_user = ?
        `, [id]);
        
        // Compare permissions
        if (rows.name == permission) {
            next(); 
        } else {
            // The user does not have the requested permission
            res.status(403).send('Forbidden');
        }
    } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized');
    }
});

module.exports = { permMiddleware };