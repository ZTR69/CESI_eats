const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Restaurant = sequelize.define('Restaurant', {
    id_restaurant: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    Note: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Adress: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    user_id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: 'Restaurants',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_restaurant']
        },
        {
            fields: ['user_id_user']
        }
    ]
});

module.exports = Restaurant;
