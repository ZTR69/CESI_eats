const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please add an username']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema);
