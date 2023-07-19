const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  platform: String,
  link: String,
});

module.exports = LinkSchema;
