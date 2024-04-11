const asyncHandler = require('express-async-handler')
const PaymentModel = require('../models/paymentModel')

const addPayment = asyncHandler(async (req, res) => {
    
    if (!req.body.orderID) {
        res.status(400)
        throw new Error('Order not found')
    }
    const currentDate = new Date().toISOString()
    const payment = await PaymentModel.create({ orderID: req.body.orderID, userID: req.user.id_user, date: currentDate})
    res.json({ message: "ACK"})
})

module.exports = {
    addPayment
}