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

const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const permMiddleware = require('../middlewares/permMiddleware')

router.post('/register', logMiddleware, registerUser)
router.post('/login', logMiddleware, loginUser)
router.get('/getMe', authorization, permMiddleware, logMiddleware, getMe)
router.put('/update', authorization, permMiddleware, logMiddleware, updateUser)
router.delete('/delete', authorization, permMiddleware, logMiddleware, deleteUser)
router.get('/getMeCommercial', authorization, permMiddleware, logMiddleware, getMeCommercial)
router.put('/updateCommercial', authorization, permMiddleware, logMiddleware, updateCommercial)
router.delete('/deleteCommercial', authorization, permMiddleware, logMiddleware, deleteCommercial)
router.put('/suspendCommercial', authorization, permMiddleware, logMiddleware, suspendCommercial)
router.put('/unsuspendCommercial', authorization, permMiddleware, logMiddleware, unsuspendCommercial)

module.exports = router