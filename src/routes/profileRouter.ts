// express
import express from "express"

// routes
import setProfileDetailsRoute from "./profile/setProfileDetails"
import getProfileDataRoute from "./profile/getProfileData"
import setProfileImageRoute from "./profile/setProfileImageUrl"

const profileRouter = express.Router()

profileRouter.use("/getProfileData", getProfileDataRoute)
profileRouter.use("/setProfileDetails", setProfileDetailsRoute)
profileRouter.use("/setProfileImage", setProfileImageRoute)

export default profileRouter
