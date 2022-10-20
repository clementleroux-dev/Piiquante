//// IMPORT ////
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//// MODEL USER ////
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//// FOR UNIQUE USERS ////
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
