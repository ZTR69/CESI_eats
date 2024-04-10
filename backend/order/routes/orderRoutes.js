const express = require('express')
const router = express.Router()
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
router.get('/all', getOrders)
router.get('/:orderID', getOrder)
router.get('/restaurant/:restaurantID', getRestaurantOrders)
router.get('/restaurant/:restaurantID/pending', getRestaurantPendingOrders)
router.post('/', addOrder)
router.put('/:orderID/item', addItem)
router.put('/:orderID/status', uppdateStatus)
router.delete('/item/:orderID', deleteItem)
router.delete('/:orderID', deleteOrder)
module.exports = router
