// express
import express from "express"
const RegisterRouter = express.Router()

// Register user repository
import { MongoRegisterUserRepository } from "@/repositories/register-user/mongo-register-user"

// Register user controller
import { RegisterUserController } from "@/controllers/register-user/register-user"

RegisterRouter.post("/", async (req, res) => {
  const mongoRegisterUserRepository = new MongoRegisterUserRepository()

  const registerUserController = new RegisterUserController(
    mongoRegisterUserRepository,
  )

  const { body, statusCode } = await registerUserController.handle(
    {
      body: req.body,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default RegisterRouter
