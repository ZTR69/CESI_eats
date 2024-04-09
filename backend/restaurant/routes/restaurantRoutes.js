const express = require('express')
const router = express.Router()

const { createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant } = require('../controllers/restaurantController')

const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

router.route('/create').post(authorization, permMiddleware, logMiddleware, createRestaurant)
router.route('/get').get(authorization, permMiddleware, logMiddleware, getRestaurants)
router.route('/getById').get(authorization, permMiddleware, logMiddleware, getRestaurantById)
router.route('/update').put(authorization, permMiddleware, logMiddleware, updateRestaurant)
router.route('/delete').delete(authorization, permMiddleware, logMiddleware, deleteRestaurant)

module.exports = router