import mongoose from "mongoose"
import UserSchema from "@/schema/User"

const User = mongoose.model("User", UserSchema)

export default User
