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
router.get('/:orderID', authorization, permMiddleware, logMiddleware, getDelivery)
router.get('/deliveryMan/:deliveryManID', authorization, permMiddleware, logMiddleware, getDeliveryManDeliveries)
router.get('/deliveryMan/:deliveryManID/cooking', authorization, permMiddleware, logMiddleware, getDeliveryManCookingDelivery)
router.post('/', authorization, permMiddleware, logMiddleware, addDelivery)
router.put('/:orderID/status', authorization, permMiddleware, logMiddleware, uppdateStatus)
router.put('/:orderID/deliveryManID', authorization, permMiddleware, logMiddleware, uppdateDeliveryMan)
router.delete('/:orderID', authorization, permMiddleware, logMiddleware, deleteDelivery)
module.exports = router