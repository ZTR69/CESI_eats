// menu_has_articleModel.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql');

class Menu_has_article extends Model {}

Menu_has_article.init(
  {
    Menu_id_menu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Article_id_article: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Menu_has_article',
  }
);

module.exports = Menu_has_article;