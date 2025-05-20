// express
import express from "express"
const authRouter = express.Router()

// routes
import RegisterRouter from "./auth/register"
import loginRoute from "./auth/login"
import checkTokenRoute from "./auth/checktoken"
import logoutRoute from "./auth/logout"

authRouter.use("/register", RegisterRouter)
authRouter.use("/login", loginRoute)
authRouter.use("/logout", logoutRoute)
authRouter.use("/checkToken", checkTokenRoute)

export default authRouter
