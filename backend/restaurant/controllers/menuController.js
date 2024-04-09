const asyncHandler = require('express-async-handler');
const Menu = require('../models/menuModel');
const Article = require('../models/articleModel');
const Menu_has_article = require('../models/menuHasArticles');

Menu.belongsToMany(Article, { 
    through: Menu_has_article, 
    foreignKey: 'Menu_id_menu' 
});

Article.belongsToMany(Menu, { 
    through: Menu_has_article, 
    foreignKey: 'Article_id_article' 
});

const createMenuWithArticles = asyncHandler(async (req, res) => {
    const { Name, Description, Price, Restaurants_id_restaurant, articles } = req.body;
    const menu = await Menu.create({
        Name,
        Description,
        Price,
        Restaurants_id_restaurant
    });

    console.log('menu' + menu);
    console.log('articles' + articles);

    if (menu) {
        const articleInstances = await Promise.all(articles.map(article => Article.create(article)));
        await menu.addArticles(articleInstances);

        res.status(201).json({
            id_menu: menu.id_menu,
            Name: menu.Name,
            Description: menu.Description,
            Price: menu.Price,
            Restaurants_id_restaurant: menu.Restaurants_id_restaurant,
            articles: articleInstances
        });
    } else {
        res.status(400);
        throw new Error('Invalid menu data');
    }
});

const getMenus = asyncHandler(async (req, res) => {
    const menusWithArticles = await Menu.findAll({ include: Article });
    res.json(menusWithArticles)
});

const getMenuById = asyncHandler(async (req, res) => {
    const menu = await Menu.findByPk(req.query.id, { include: Article });
    if (menu) {
        res.json(menu)
    } else {
        res.status(404)
        throw new Error('Menu not found')
    }
});

const updateMenu = asyncHandler(async (req, res) => {
    const { Name, Description, Price, Restaurants_id_restaurant, articles } = req.body;
    const menu = await Menu.findByPk(req.query.id, { include: Article });

    if (menu) {
        menu.Name = Name;
        menu.Description = Description;
        menu.Price = Price;
        menu.Restaurants_id_restaurant = Restaurants_id_restaurant;
        await menu.save();

        const articleInstances = await Promise.all(articles.map(async article => {
            if (article.id_article) {
                const existingArticle = await Article.findByPk(article.id_article);
                if (existingArticle) {
                    return existingArticle.update(article);
                }
            }
            return Article.create(article);
        }));

        await menu.setArticles(articleInstances);

        res.json({
            ...menu.toJSON(),
            articles: articleInstances.map(article => article.toJSON())
        });
    } else {
        res.status(404);
        throw new Error('Menu not found');
    }
});

const deleteMenu = asyncHandler(async (req, res) => {
    const menu = await Menu.findByPk(req.query.id)
    if (menu) {
        await menu.destroy();
        res.json({ message: 'Menu removed' });
    } else {
        res.status(404)
        throw new Error('Menu not found')
    }
});

module.exports = { createMenuWithArticles, getMenus, getMenuById, updateMenu, deleteMenu };