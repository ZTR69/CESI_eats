const express = require('express')

const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
} = require('../controllers/userController')

const { authentificate } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

router.post('/register', logMiddleware, registerUser)
router.post('/login', logMiddleware, loginUser)
router.get('/getMe', authentificate, permMiddleware, logMiddleware, getMe)
router.put('/update', authentificate, logMiddleware, updateUser)
router.delete('/delete', authentificate, logMiddleware, deleteUser)

module.exports = router