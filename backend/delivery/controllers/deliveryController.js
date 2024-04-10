const asyncHandler = require('express-async-handler')
const DeliveryModel = require('../models/deliveryModel')

const getDelivery = asyncHandler(async (req, res) => {
    const delivery = await DeliveryModel.findOne({ orderID: req.params.orderID })
    if (!delivery) {
        res.status(400)
        throw new Error('delivery not found')
    }
    res.status(200).json(delivery)
})

const getDeliveries = asyncHandler(async (req, res) => {
    const deliverys = await DeliveryModel.find()
    res.status(200).json(deliverys)
})

const getDeliveryManDeliveries = asyncHandler(async (req, res) => {
    const deliverys = await DeliveryModel.find({ deliveryManID: req.params.deliveryManID })
    if (!deliverys) {
        res.status(400)
        throw new Error('deliverys not found')
    }
    res.status(200).json(deliverys)
})

const getDeliveryManPendingDelivery = asyncHandler(async (req, res) => {
    const deliverys = await DeliveryModel.find({ deliveryManID: req.params.deliveryManID, status: 'pending'})
    if (!deliverys) {
        res.status(400)
        throw new Error('deliverys not found')
    }
    res.status(200).json(deliverys)
})

const uppdateStatus = asyncHandler(async (req, res) => {
    const delivery = await DeliveryModel.findOne({ orderID: req.params.orderID })
    if (!delivery) {
        res.status(400)
        throw new Error('delivery not found')
    }
    const updatedOrder = await DeliveryModel.findOneAndUpdate({orderID: req.params.orderID},
        { status: req.body.status }, { new: true })
    res.status(200).json(updatedOrder)
})

const uppdateDeliveryMan = asyncHandler(async (req, res) => {
    const delivery = await DeliveryModel.findOne({ orderID: req.params.orderID })
    if (!delivery) {
        res.status(400)
        throw new Error('delivery not found')
    }
    const updatedDelivery = await DeliveryModel.findOneAndUpdate({orderID: req.params.orderID},
        { deliveryManID: req.body.deliveryManID }, { new: true })
    res.status(200).json(updatedDelivery)
})

const addDelivery = asyncHandler(async (req, res) => {
    if (!req.body.restaurantID) {
        res.status(400)
        throw new Error('Error no Restaurant')
    }
    if (!req.body.orderID) {
        res.status(400)
        throw new Error('Error no order')
    }
    if (!req.body.userID) {
        res.status(400)
        throw new Error('Error no User')
    }
    if (!req.body.addressDelivery) {
        res.status(400)
        throw new Error('Error no addressDelivery')
    }
    if (!req.body.addressRestaurant) {
        res.status(400)
        throw new Error('Error no addressRestaurant')
    }

    const delivery = await DeliveryModel.create({ orderID: req.body.orderID, restaurantID: req.body.restaurantID, userID: req.body.userID, addressDelivery: req.body.addressDelivery, addressRestaurant: req.body.addressRestaurant})
    res.json({ message: delivery })// TO DO retour orderID et itemID
})

const deleteDelivery = asyncHandler(async (req, res) => {
    const delivery = await DeliveryModel.findOne({ orderID: req.params.orderID })
    if (!delivery) {
        res.status(400)
        throw new Error('delivery not found')
    }
    const deletedDelivery = await DeliveryModel.findOneAndDelete(req.params.orderID)
    res.status(200).json(deletedDelivery)
})

module.exports = {
    getDelivery,
    getDeliveries,
    getDeliveryManDeliveries,
    getDeliveryManPendingDelivery,
    addDelivery,
    uppdateStatus,
    uppdateDeliveryMan,
    deleteDelivery
}
