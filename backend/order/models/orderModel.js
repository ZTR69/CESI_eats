mongoose = require('mongoose')
const itemSchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true
        },

        prix: {
            type: Number,
            required: true
        }
    }
)
const orderSchema = mongoose.Schema(
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
        date: {
            type: Date,
            required: true
        },
        items: {
            type: [itemSchema],
            default: undefined
        },
        addressDelivery: {
            type: String,
            required: true
        },
        addressRestaurant: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'pending'
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model('Order', orderSchema)