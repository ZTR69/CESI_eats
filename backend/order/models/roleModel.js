const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

const Role = sequelize.define('Role', {
  id_role: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  title: {
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
  tableName: 'role',
  timestamps: false
});

module.exports = Role;