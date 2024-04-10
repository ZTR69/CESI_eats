const express = require('express')
const router = express.Router()

const { createMenuWithArticles,
    getMenus,
    getMenuById,
    updateMenu
} = require('../controllers/menuController')

const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

router.route('/createMenu').post(authorization, permMiddleware, logMiddleware, createMenuWithArticles)
router.route('/getMenu').get(authorization, permMiddleware, logMiddleware, getMenus)
router.route('/getByIdMenu').get(authorization, permMiddleware, logMiddleware, getMenuById)
router.route('/updateMenu').put(authorization, permMiddleware, logMiddleware, updateMenu)

module.exports = router