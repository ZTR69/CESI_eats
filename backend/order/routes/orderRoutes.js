const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

const {
getOrder,
getOrders,
getRestaurantOrders,
getRestaurantPendingOrders,
addOrder,
addItem,
uppdateStatus,
deleteItem,
deleteOrder
} = require('../controllers/orderController')
router.get('/all', authorization, permMiddleware, logMiddleware, getOrders)
router.get('/:orderID', authorization, permMiddleware, logMiddleware, getOrder)
router.get('/restaurant/:restaurantID', authorization, permMiddleware, logMiddleware, getRestaurantOrders)
router.get('/restaurant/:restaurantID/pending', authorization, permMiddleware, logMiddleware, getRestaurantPendingOrders)
router.post('/', authorization, permMiddleware, logMiddleware, addOrder)
router.put('/:orderID/item', authorization, permMiddleware, logMiddleware, addItem)
router.put('/:orderID/status', authorization, permMiddleware, logMiddleware, uppdateStatus)
router.delete('/item/:orderID', authorization, permMiddleware, logMiddleware, deleteItem)
router.delete('/:orderID', authorization, permMiddleware, logMiddleware, deleteOrder)
module.exports = router