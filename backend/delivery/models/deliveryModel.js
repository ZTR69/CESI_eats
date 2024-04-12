mongoose = require('mongoose')
const deliverySchema = mongoose.Schema(
    {
        orderID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        restaurantID: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        deliveryManID: {
            type: String,
            required: true,
            default: 'none'
        },
        addressRestaurant: {
            type: String,
            required: true
        },
        addressDelivery: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'cooking'
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model('Delivery', deliverySchema)
