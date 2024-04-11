// Permission.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

// recover Permission model form db without define it again
const Permission = sequelize.define('Permission', {
    id_permission: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'permissions',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_permission']
        }
    ]
});


module.exports = Permission;