const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbMysql'); // Assurez-vous que ce chemin mène à votre instance Sequelize

const Article = sequelize.define('Article', {
    id_article: {
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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Image: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    tableName: 'Article',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['id_article']
        }
    ]
});

module.exports = Article;