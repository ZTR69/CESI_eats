const express = require('express')
const router = express.Router()
const {
getOrder,
getOrders,
addOrder,
addItem,
deleteItem,
deleteOrder
} = require('../controllers/orderController')
router.get('/:orderID', getOrder)
router.get('/all', getOrders)
router.post('/', addOrder)
router.put('/:orderID', addItem)
router.delete('/:orderID', deleteOrder)
router.delete('/item/:orderID', deleteItem)
module.exports = router