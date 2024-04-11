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

/**
 * @swagger
 * /createMenuWithArticles:
 *   post:
 *     summary: Create a menu with articles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMenuWithArticlesPayload'
 *     responses:
 *       201:
 *         description: Menu created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuWithArticles'
 *       400:
 *         description: Invalid menu data
 *       500:
 *         description: Internal server error
 */
const createMenuWithArticles = asyncHandler(async (req, res) => {
    const { Name, Description, Price, Restaurants_id_restaurant, articles, Image } = req.body;
    const menu = await Menu.create({
        Name,
        Description,
        Price,
        Restaurants_id_restaurant,
        Image
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
            articles: articleInstances,
            Image: menu.Image
        });
    } else {
        res.status(400);
        throw new Error('Invalid menu data');
    }
});

/**
 * @swagger
 * /getMenus:
 *   get:
 *     summary: Get all menus with articles
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuWithArticles'
 *       500:
 *         description: Internal server error
 */
const getMenus = asyncHandler(async (req, res) => {
    const menusWithArticles = await Menu.findAll({ include: Article });
    res.json(menusWithArticles)
});

/**
 * @swagger
 * /getMenuById:
 *   get:
 *     summary: Get a menu by ID with articles
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuWithArticles'
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
const getMenuById = asyncHandler(async (req, res) => {
    const menu = await Menu.findByPk(req.query.id, { include: Article });
    if (menu) {
        res.json(menu)
    } else {
        res.status(404)
        throw new Error('Menu not found')
    }
});

/**
 * @swagger
 * /updateMenu:
 *   put:
 *     summary: Update a menu with articles
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateMenuPayload'
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuWithArticles'
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
const updateMenu = asyncHandler(async (req, res) => {
    const { Name, Description, Price, Restaurants_id_restaurant, articles, Image } = req.body;
    const menu = await Menu.findByPk(req.query.id, { include: Article });

    if (menu) {
        menu.Name = Name;
        menu.Description = Description;
        menu.Price = Price;
        menu.Restaurants_id_restaurant = Restaurants_id_restaurant;
        menu.Image = Image;
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

/**
 * @swagger
 * /deleteMenu:
 *   delete:
 *     summary: Delete a menu
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
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