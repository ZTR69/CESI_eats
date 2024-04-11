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
router.get('/', authorization, permMiddleware, logMiddleware, getOrder)
router.get('/restaurant', authorization, permMiddleware, logMiddleware, getRestaurantOrders)
router.get('/restaurant/pending', authorization, permMiddleware, logMiddleware, getRestaurantPendingOrders)
router.post('/', authorization, permMiddleware, logMiddleware, addOrder)
router.put('/item', authorization, permMiddleware, logMiddleware, addItem)
router.put('/status', authorization, permMiddleware, logMiddleware, uppdateStatus)
router.delete('/item', authorization, permMiddleware, logMiddleware, deleteItem)
router.delete('/', authorization, permMiddleware, logMiddleware, deleteOrder)
module.exports = router
