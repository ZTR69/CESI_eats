const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Menu = sequelize.define('Menu', {
    id_menu: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Price: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Restaurants_id_restaurant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Menu',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_menu']
        },
        {
            fields: ['Restaurants_id_restaurant']
        }
    ]
});

module.exports = Menu;