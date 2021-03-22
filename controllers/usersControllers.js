const User = require("../models/User");

const { errorHandler } = require("../utilities/errorHandler");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    errorHandler(`Cannot get users`, next);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    errorHandler(`Invalid signup data`, next, 400);
  }
};

exports.loginUser = async (req, res, next) => {
  const loginInfo = req.body;

  try {
    const user = await User.findOne({
      email: loginInfo.email,
      password: loginInfo.password,
    });
    if (!user) throw new Error("Invalid email and/or password!")
    res.json(user);
  } catch (err) {
    errorHandler(`Bad request!`, next, 400);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    errorHandler(`Could not find user with id: ${id}`, next, 400);
  }
};

exports.viewUserInfo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    errorHandler(`No such user!`, next, 400);
  }
};
