import express from "express"

const authRouter = express.Router()
import RegisterRouter from "./auth/register"
import loginRoute from "./auth/login"
import logoutRoute from "./auth/logout"
import checkTokenRoute from "./auth/checktoken"

authRouter.use("/register", RegisterRouter)
authRouter.use("/login", loginRoute)
authRouter.use("/logout", logoutRoute)
authRouter.use("/checkToken", checkTokenRoute)

export default authRouter
