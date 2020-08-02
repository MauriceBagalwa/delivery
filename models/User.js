const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { next } = require("cli");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: String,
  level: {
    type: Number,
    default: 1,
  },
  creatAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isvalidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
module.exports = mongoose.model("User", UserSchema);
