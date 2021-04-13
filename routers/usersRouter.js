const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  loginUser,
  viewUserInfo,
  updateUser,
} = require("../controllers/usersControllers");

const { userValidationRules, userValidationErrorHandler } = require('../middleware/validation.js')

router.route("/").get(getUsers).post(userValidationRules(), userValidationErrorHandler, addUser);

router.route("/login").post(loginUser);

router.route("/:id").get(viewUserInfo).put(updateUser);

module.exports = router;
