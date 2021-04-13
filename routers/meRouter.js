const express = require('express')
const router = express.Router()
const {getUserOrders} = require('../controllers/ordersControllers')
const {auth} = require('../middleware/authentication')

router.route('/orders').get(auth, getUserOrders)

module.exports = router
