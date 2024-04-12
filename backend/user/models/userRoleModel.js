const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');
const User = require('./userModel');
const Role = require('./roleModel');

const UserRole = sequelize.define('UserRole', {
  role_user_id_user: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  role_id_role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role,
      key: 'id_role'
    }
  }
}, {
  tableName: 'user_has_role',
  timestamps: false
});

module.exports = UserRole;