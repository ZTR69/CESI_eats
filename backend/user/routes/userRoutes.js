const express = require('express')

const router = express.Router()

const {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getMeCommercial,
    updateCommercial,
    deleteCommercial,
    suspendCommercial,
    unsuspendCommercial
} = require('../controllers/userController')

const { authentificate } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const permMiddleware = require('../middlewares/permMiddleware')

router.post('/register', logMiddleware, registerUser)
router.post('/login', logMiddleware, loginUser)
router.get('/getMe', authentificate, permMiddleware, logMiddleware, getMe)
router.put('/update', authentificate, permMiddleware, logMiddleware, updateUser)
router.delete('/delete', authentificate, permMiddleware, logMiddleware, deleteUser)
router.get('/getMeCommercial', authentificate, permMiddleware, logMiddleware, getMeCommercial)
router.put('/updateCommercial', authentificate, permMiddleware, logMiddleware, updateCommercial)
router.delete('/deleteCommercial', authentificate, permMiddleware, logMiddleware, deleteCommercial)
router.put('/suspendCommercial', authentificate, permMiddleware, logMiddleware, suspendCommercial)
router.put('/unsuspendCommercial', authentificate, permMiddleware, logMiddleware, unsuspendCommercial)

module.exports = router