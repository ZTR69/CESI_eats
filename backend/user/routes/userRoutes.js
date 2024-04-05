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

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getMe', authentificate, getMe)
router.put('/update', authentificate, updateUser)
router.delete('/delete', authentificate, deleteUser)

module.exports = router