// express
import express from "express"
const getProfileDataRoute = express.Router()

// middlewares
import checkToken from "@/middlewares/checktoken"

// profile user controller
import { ProfileUserController } from "@/controllers/profile-user/profile-user"

// profile user repository
import { MongoProfileUserRepository } from "@/repositories/profile-user/mongo-profile-user"

getProfileDataRoute.get("/", checkToken, async (req, res) => {
  const mongoProfileUserRepository = new MongoProfileUserRepository()

  const profileUserController = new ProfileUserController(
    mongoProfileUserRepository,
  )

  const { body, statusCode } = await profileUserController.getProfileData({
    body: req.body,
  })

  return res.status(statusCode).send(body)
})

export default getProfileDataRoute
