import mongoose from "mongoose"
import LinkSchema from "./Link"

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  profileImageUrl: String,
  profileImageName: String,
  previewEmail: String,
  links: [LinkSchema],
})

export default UserSchema
