const express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  createOrder,
} = require("../controllers/ordersControllers");
const { auth } = require("../middleware/authentication");

router.route("/").get(auth, getOrders).post(auth, createOrder);
router.route("/:id").get(auth, getOrder);

module.exports = router;
