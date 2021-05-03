const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trime: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    timestamps: true,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
