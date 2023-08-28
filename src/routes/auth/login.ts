// controller
import { LoginUserController } from "@/controllers/login-user/login-user"
// repository
import { MongoLoginUserRepository } from "@/repositories/login-user/mongo-login-user"

// express
import express from "express"
const loginRoute = express.Router()

loginRoute.post("/", async (req, res) => {
  const mongoLoginUserRepository = new MongoLoginUserRepository()

  const loginUserController = new LoginUserController(mongoLoginUserRepository)

  const { body, statusCode } = await loginUserController.handle(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default loginRoute
