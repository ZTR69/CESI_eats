const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authMiddleware')
const { logMiddleware } = require('../middlewares/logMiddleware')
const { permMiddleware } = require('../middlewares/permMiddleware')

const {
getDelivery,
getDeliveries,
getDeliveryManDeliveries,
getDeliveryManCookingDelivery,
addDelivery,
uppdateStatus,
uppdateDeliveryMan,
deleteDelivery
} = require('../controllers/deliveryController')
router.get('/all', authorization, permMiddleware, logMiddleware, getDeliveries)
router.get('/delivery', authorization, permMiddleware, logMiddleware, getDelivery)
router.get('/deliveryMan/', authorization, permMiddleware, logMiddleware, getDeliveryManDeliveries)
router.get('/deliveryMan/cooking/', authorization, permMiddleware, logMiddleware, getDeliveryManCookingDelivery)
router.post('/add/', authorization, permMiddleware, logMiddleware, addDelivery)
router.put('/status/', authorization, permMiddleware, logMiddleware, uppdateStatus)
router.put('/deliveryManID/', authorization, permMiddleware, logMiddleware, uppdateDeliveryMan)
router.delete('/delivery', authorization, permMiddleware, logMiddleware, deleteDelivery)
module.exports = router