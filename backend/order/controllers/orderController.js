const asyncHandler = require('express-async-handler')
const OrderModel = require('../models/orderModel')

const getOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.params.orderID })
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

const addOrder = asyncHandler(async (req, res) => {
    if (!req.body.restaurantID) {
        res.status(400)
        throw new Error('Error no Restaurant')
    }
    if (!req.body.itemName) {
        res.status(400)
        throw new Error('Error no Item')
    }
    if (!req.body.userID) {
        res.status(400)
        throw new Error('Error no User')
    }
    if (!req.body.addressDelivery) {
        res.status(400)
        throw new Error('Error no User')
    }
    const currentDate = new Date().toISOString()
    const order = await OrderModel.create({ orderID: new mongoose.Types.ObjectId(), restaurantID: req.body.restaurantID, items: { itemName: req.body.itemName, prix: "10"}, userID: req.body.userID, date: currentDate, addressDelivery: req.body.addressDelivery})
    res.json({ message: order })// TO DO retour orderID et itemID
})

const addItem = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.params.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const newItem = JSON.parse(req.body.newItem)
    const updatedOrder = await OrderModel.findOneAndUpdate({orderID: req.params.orderID},
        { $push: { items: newItem } }, { new: true })
    res.status(200).json(updatedOrder) // TO DO retour itemID
})

const deleteOrder = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.params.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const deletedOrder = await OrderModel.findOneAndDelete(req.params.orderID)
    res.status(200).json(deletedOrder)
})

const deleteItem = asyncHandler(async (req, res) => {
    const order = await OrderModel.findOne({ orderID: req.params.orderID })
    if (!order) {
        res.status(400)
        throw new Error('Order not found')
    }
    const deleteItem = await OrderModel.findOneAndUpdate({orderID: req.params.orderID},
        { $pull: { items: { _id: req.body.itemID} } }, { new: true })
    res.status(200).json(deleteItem)
})

module.exports = {
    getOrder,
    getOrders,
    addOrder,
    addItem,
    deleteItem,
    deleteOrder
}