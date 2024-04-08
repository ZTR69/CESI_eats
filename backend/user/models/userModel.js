const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  rib: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  sponsorship_code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  friend_code: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
  
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;