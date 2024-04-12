const express = require('express')
const router = express.Router()
const { authorization } = require('../middlewares/authMiddleware')
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
router.get('/all', authorization, permMiddleware, getDeliveries)
router.get('/delivery', authorization, permMiddleware, getDelivery)
router.get('/deliveryMan/', authorization, permMiddleware, getDeliveryManDeliveries)
router.get('/deliveryMan/cooking/', authorization, permMiddleware, getDeliveryManCookingDelivery)
router.post('/add/', authorization, permMiddleware, addDelivery)
router.put('/status/', authorization, permMiddleware, uppdateStatus)
router.put('/deliveryManID/', authorization, permMiddleware, uppdateDeliveryMan)
router.delete('/delivery', authorization, permMiddleware, deleteDelivery)
module.exports = router