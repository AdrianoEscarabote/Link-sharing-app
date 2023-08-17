import mongoose from "mongoose"

const LinkSchema = new mongoose.Schema({
  id: String,
  platform: String,
  link: String,
})

export default LinkSchema
