const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// Protect routes
const authorization = asyncHandler(async (req, res, next) => {
    let token = null
    // Token sent format: "Bearer eyJhbGciOi..."
    if (req.headers.authorization
        && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('connected with JWT : ' + decoded.id_user)
            // Set req.user to the id and role id from the token
            req.user = {
                id_user: decoded.id_user,
                id_role: decoded.id_role
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
})

module.exports = { authorization }