const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authentication");

const {
  getUsers,
  addUser,
  loginUser,
  viewUserInfo,
  updateUser,
} = require("../controllers/usersControllers");

const {
  userValidationRules,
  userValidationErrorHandler,
} = require("../middleware/validation.js");

router
  .route("/")
  .get(auth, getUsers)
  .post(userValidationRules(), userValidationErrorHandler, addUser);

router.route("/login").post(loginUser);

router.route("/:id").get(auth, viewUserInfo).put(auth, updateUser);

module.exports = router;
