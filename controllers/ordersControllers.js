const Order = require("../models/Order");
const { errorHandler } = require("../utilities/errorHandler");

// ADMIN
exports.getOrders = async (_, res, next) => {
  try {
    const orders = await Order.find().populate("userId")
    res.json(orders);
  } catch (err) {
    next(errorHandler("Cannot get orders"));
  }
};


// receive user ID in the request
// me route: /userId/orders
exports.getUserOrders = async (req, res, next) => {
	const {userId} = req.params;
  try {
    const userOrders = await Order.find({ userId });
    res.json(userOrders);
  } catch (err) {
    next(errorHandler("Cannot get orders"));
  }
};

exports.getOrder = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const currentOrder = await Order.findOne({ _id });
    res.json(currentOrder);
  } catch (err) {
    next(errorHandler("This order doesn't exist"));
  }
};

// receive user ID in the request?
exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (err) {
    next(errorHandler("Cannot create an order: invalid data!"));
  }
};