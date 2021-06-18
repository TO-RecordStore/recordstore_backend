const express = require('express');
const router = express.Router();
const { getUserOrders } = require('../controllers/ordersControllers');
const { auth } = require('../middleware/authentication');
const { authUser } = require('../controllers/usersControllers');

router.route('/orders').get(auth, getUserOrders);
router.route('/auth').post(auth, authUser);

module.exports = router;
