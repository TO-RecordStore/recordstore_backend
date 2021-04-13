const User = require("../models/User");
const bcrypt = require('bcryptjs')

const { errorHandler } = require("../utilities/errorHandler");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    next(errorHandler(`Cannot get users`));
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    next(errorHandler(`Invalid signup data`, 400));
  }
};

exports.loginUser = async (req, res, next) => {
  const loginInfo = req.body;

  try {
    const user = await User.findOne({
      email: loginInfo.email
    });
    if (!user) return next(errorHandler("User not found!", 401))

    const passwordMatches = bcrypt.compareSync(loginInfo.password, user.password)

    if(!passwordMatches) return next(errorHandler('Wrong password', 401))

    res.json(user);
  } catch (err) {
    next(errorHandler(`Bad request!`, 400));
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
    next(errorHandler(`Could not find user with id: ${id}`, 400));
  }
};

exports.viewUserInfo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    next(errorHandler(`No such user!`, 400));
  }
};
