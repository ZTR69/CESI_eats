const express = require('express')
const router = express.Router()
const {
getDelivery,
getDeliveries,
getDeliveryManDeliveries,
getDeliveryManPendingDelivery,
addDelivery,
uppdateStatus,
uppdateDeliveryMan,
deleteDelivery
} = require('../controllers/deliveryController')
router.get('/all', getDeliveries)
router.get('/:orderID', getDelivery)
router.get('/deliveryMan/:deliveryManID', getDeliveryManDeliveries)
router.get('/deliveryMan/:deliveryManID/pending', getDeliveryManPendingDelivery)
router.post('/', addDelivery)
router.put('/:orderID/status', uppdateStatus)
router.put('/:orderID/deliveryManID', uppdateDeliveryMan)
router.delete('/:orderID', deleteDelivery)
module.exports = router