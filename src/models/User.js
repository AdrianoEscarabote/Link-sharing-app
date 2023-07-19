const mongoose = require("mongoose");
const UserSchema = require("../schema/User");

const User = mongoose.model("User", UserSchema);

module.exports = User;
