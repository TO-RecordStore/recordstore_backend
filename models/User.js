const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");

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
      default: "http://localhost:5001/statics/avatar-01.jpg",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (_, returned) => delete returned.password
    }
  }
);

UserSchema.pre("save", function () {
  const user = this;
  if (user.isModified("password"))
    user.password = bcrypt.hashSync(user.password, 8);
});

const User = model("User", UserSchema);

module.exports = User;
