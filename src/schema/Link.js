const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  id: String,
  platform: String,
  link: String,
});

module.exports = LinkSchema;
