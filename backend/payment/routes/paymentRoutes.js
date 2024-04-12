const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

const {
    addPayment
} = require('../controllers/paymentController')
router.post('/add', authorization, permMiddleware, logMiddleware, addPayment)
module.exports = router

