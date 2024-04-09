// permissions_has_role.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const PermissionsHasRole = sequelize.define('permissions_has_role', {
    role_user_id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permissions_id_permission: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    role_id_role: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = PermissionsHasRole;