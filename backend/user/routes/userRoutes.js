const express = require('express')

const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe
} = require('../controllers/userController')

const { authentificate } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getMe', authentificate, getMe)

module.exports = router