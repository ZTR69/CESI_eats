const express = require('express')
const router = express.Router()
const {
    getData,
    createData,
    updateData,
    deleteData
} = require('../controllers/restaurantController')
router.get('/', getData)
router.post('/', createData)
router.put('/:id', updateData)
router.delete('/:id', deleteData)
module.exports = router