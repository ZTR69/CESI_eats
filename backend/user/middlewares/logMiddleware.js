const asyncHandler = require('express-async-handler')
const mongo = require('../config/dbMongo')

// Log the request method and URL
const logMiddleware = asyncHandler(async (req, res, next) => {
    // Insert the request information into the 'logs' collection
    await db.collection('logs').insertOne({
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date()
    });

    next()
})

module.exports = logMiddleware