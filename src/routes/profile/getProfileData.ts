// express
import express from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// models
import { ProfileUserController } from "@/controllers/profile-user/profile-user"
// repository
import { MongoProfileUserRepository } from "@/repositories/profile-user/mongo-profile-user"

const getProfileDataRoute = express.Router()

getProfileDataRoute.get("/", checkToken, async (req, res) => {
  const id = req.cookies.id as string
  const mongoProfileUserRepository = new MongoProfileUserRepository()

  const profileUserController = new ProfileUserController(
    mongoProfileUserRepository,
  )
  const bodyFormated = {
    id,
  }

  const { body, statusCode } = await profileUserController.getProfileData({
    body: bodyFormated,
  })

  return res.status(statusCode).send(body)
})

export default getProfileDataRoute
