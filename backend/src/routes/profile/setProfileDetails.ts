// express
import express from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// repository
import { MongoProfileUserRepository } from "@/repositories/profile-user/mongo-profile-user"
// controller
import { ProfileUserController } from "@/controllers/profile-user/profile-user"

const setProfileDetailsRoute = express.Router()

setProfileDetailsRoute.put("/", checkToken, async (req, res) => {
  const id = req.cookies.id
  const bodyFormated = {
    id,
    ...req.body,
  }

  const mongoProfileUserRepository = new MongoProfileUserRepository()

  const profileUserController = new ProfileUserController(
    mongoProfileUserRepository,
  )

  const { body, statusCode } = await profileUserController.setProfileDetails({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default setProfileDetailsRoute
