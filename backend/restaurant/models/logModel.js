const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
    {
        method: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Log', logSchema);