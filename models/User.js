const env = require('../config/config');
const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {errorHandler} = require('../utilities/errorHandler')


const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      required: true,
      default: 'http://localhost:5001/statics/avatar-01.jpg',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (docOriginal, docToReturn) => {
        delete docToReturn.password;
      },
    },
  }
);


UserSchema.post('save', (error, doc, next) => {
  const key = Object.keys(error.keyValue)[0];
  if(error.name === 'MongoError' && error.code === 11000) {
    next(errorHandler(`User with this ${key} already exists`))
  } else {
    next()
  }
})

UserSchema.pre("save", function () {
  const user = this;
  if (user.isModified('password'))
    user.password = bcrypt.hashSync(user.password, 8);
});

UserSchema.methods.generateAuthToken = function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, env.jwtKey).toString();

  return token;
};

UserSchema.statics.findByToken = function (token) {
  const User = this;

  try {
    const decoded = jwt.verify(token, env.jwtKey);
    return User.findOne({ _id: decoded._id });
  } catch (err) {
    return;
  }
};

const User = model('User', UserSchema);

module.exports = User;
