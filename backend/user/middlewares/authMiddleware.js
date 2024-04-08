const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Protect routes
const authentificate = asyncHandler(async (req, res, next) => {
    let token = null
    // Token sent format: "Bearer eyJhbGciOi..."
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token (id) without the password
            const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } })
            if (user) {
                delete user.password
                req.user = user
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
    }
})

module.exports = { authentificate }