import express from "express"
import setProfileDetailsRoute from "./profile/setProfileDetails"
import setProfileImageUrlRoute from "./profile/setProfileImageUrl"
import getDataRoute from "./profile/getData"
import linksRoute from "./profile/links"
import setLinksRoute from "./profile/setLinks"

const profileRouter = express.Router()

profileRouter.use("/setProfileImageUrl", setProfileImageUrlRoute)
profileRouter.use("/setProfileDetails", setProfileDetailsRoute)
profileRouter.use("/getData", getDataRoute)
profileRouter.use("/links", linksRoute)
profileRouter.use("/setLinks", setLinksRoute)

export default profileRouter
