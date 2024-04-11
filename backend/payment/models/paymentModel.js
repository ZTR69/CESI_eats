mongoose = require('mongoose')
const paymentSchema = mongoose.Schema(
    {
        orderID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        userID: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
)
module.exports = mongoose.model('Payment', paymentSchema)