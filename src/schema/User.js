const mongoose = require("mongoose");
const LinkSchema = require("../schema/Link");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  previewEmail: String,
  links: [LinkSchema],
});

module.exports = UserSchema;
