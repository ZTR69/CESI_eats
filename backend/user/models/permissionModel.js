// Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Permission = sequelize.define('permissions', {
    id_permission: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Permission;