const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  loginUser,
  viewUserInfo,
  updateUser,
} = require("../controllers/usersControllers");

router.route("/").get(getUsers).post(addUser);

router.route("/login").post(loginUser);

router.route("/:id").get(viewUserInfo).put(updateUser);

module.exports = router;
