const asyncHandler = require('express-async-handler')
const OrderModel = require('../models/orderModel')

const getOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.query.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    res.status(200).json(order)
})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find()
    res.status(200).json(orders)
})

const getRestaurantOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({ restaurantID: req.query.restaurantID })
    if (!orders) {
        res.status(400)
        throw new Error('Orders not found')
    }
    res.status(200).json(orders)
})

const getRestaurantPendingOrders = asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({ restaurantID: req.query.restaurantID, status: 'pending'})
    if (!orders) {
        res.status(400)
        throw new Error('Orders not found')
    }
    res.status(200).json(orders)
})

const uppdateStatus = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.query.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const updatedOrder = await OrderModel.findOneAndUpdate({orderID: req.query.orderID},
        { status: req.body.status }, { new: true })
    res.status(200).json(updatedOrder)
})

const addItem = asyncHandler(async (req, res, orderId) => {
    const order = await OrderModel.findOne({ orderID: orderId })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const updatedOrder = await OrderModel.findOneAndUpdate({orderID: orderId},
        { $push: { items: {"itemName": req.title,"prix": req.price} } }, { new: true })
})

const addOrder = asyncHandler(async (req, res) => {
    
    if (!req.body.items || !Array.isArray(req.body.items)) {
        res.status(400)
        throw new Error('Items not provided or not an array')
    }
    const currentDate = new Date().toISOString()
    req.body.items[0]
    const order = await OrderModel.create({ orderID: new mongoose.Types.ObjectId(), restaurantID: req.body.items[0].restaurantId, userID: req.user.id_user, date: currentDate, addressDelivery: req.body.items[0].userAddress, addressRestaurant: req.body.items[0].restaurantAddress})
    
    req.body.items.forEach(async (item) => { await addItem(item, res, order.orderID) })
    res.json({ message: order.orderID })
})

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.query.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const deletedOrder = await OrderModel.findOneAndDelete(req.query.orderID)
    res.status(200).json(deletedOrder)
})

const deleteItem = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.query.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const deleteItem = await OrderModel.findOneAndUpdate({orderID: req.query.orderID},
        { $pull: { items: { _id: req.body.itemID} } }, { new: true })
    res.status(200).json(deleteItem)
})

module.exports = {
    getOrder,
    getOrders,
    getRestaurantOrders,
    getRestaurantPendingOrders,
    uppdateStatus,
    addOrder,
    addItem,
    deleteItem,
    deleteOrder
}