// express
import express from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

import multer from "multer"

// repository
import { MongoProfileUserRepository } from "@/repositories/profile-user/mongo-profile-user"
// controller
import { ProfileUserController } from "@/controllers/profile-user/profile-user"

const upload = multer()

const setProfileImageRoute = express.Router()

setProfileImageRoute.put(
  "/",
  checkToken,
  upload.single("profileImage"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        msg: "Imagem de perfil não enviada!",
      })
    }

    const bodyFormated = {
      id: req.cookies.id,
      file: req.file,
    }

    const mongoProfileUserRepository = new MongoProfileUserRepository()

    const profileUserController = new ProfileUserController(
      mongoProfileUserRepository,
    )

    const { body, statusCode } = await profileUserController.setProfileImage({
      body: bodyFormated,
    })

    res.status(statusCode).send(body)
  },
)

export default setProfileImageRoute
