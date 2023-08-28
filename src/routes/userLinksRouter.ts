// express
import express from "express"
const userLinksRouter = express.Router()

// routes
import getLinksRoute from "./links/links"
import setLinksRoute from "./links/setLinks"

userLinksRouter.use("/getLinks", getLinksRoute)
userLinksRouter.use("/setLinks", setLinksRoute)

export default userLinksRouter
