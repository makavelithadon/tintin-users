const mongoose = require("mongoose");
const { isEmail, isValidPassword } = require("./../utils");
const uniqueValidator = require("mongoose-unique-validator");

const User = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true, required: true, validate: isEmail },
  password: { type: String, required: true }
});

User.pre("save", function(next) {
  let now = Date.now();

  this.updatedAt = now;
  // Set a value for createdAt only if it is null
  if (!this.createdAt) {
    this.createdAt = now;
  }

  // Call the next function in the pre-save chain
  next();
});

User.plugin(uniqueValidator);

module.exports = mongoose.model("User", User);
