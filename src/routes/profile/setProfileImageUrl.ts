// express
import express from "express"
import { Request, Response } from "express"

// models
import User from "@/models/User"

// middlewares
import checkToken from "@/middlewares/checktoken"

// firebase
import storage from "@/lib/firebase"
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage"

import multer from "multer"

const upload = multer()

const setProfileImageUrlRoute = express.Router()

setProfileImageUrlRoute.put(
  "/",
  checkToken,
  upload.single("profileImage"),
  async (req: Request, res: Response) => {
    const id = req.cookies.id

    const user = await User.findById(id, "-password")

    if (!user) {
      return res.status(404).json({
        msg: "Usuário não encontrado!",
      })
    }

    if (!req.file) {
      return res.status(400).json({
        msg: "Imagem de perfil não enviada!",
      })
    }

    const profileImage = req.file

    try {
      // Remove a imagem antiga, se existir
      if (user.profileImageName && user.profileImageUrl) {
        const oldImageRef = ref(
          storage,
          `images${user.id}/` + user.profileImageName,
        )
        await deleteObject(oldImageRef)
      }

      const storageRef = ref(
        storage,
        `images${user.id}/` + profileImage.originalname,
      )

      uploadBytes(storageRef, profileImage.buffer).then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          await User.findOneAndUpdate(
            { email: user.email },
            {
              profileImageUrl: url,
              profileImageName: profileImage.originalname,
            },
            { new: true }, // Returns the updated document
          )
          await user.save()
          return res.status(200).json({
            imageUrl: url,
            msg: "Imagem de perfil atualizada",
          })
        })
      })
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar a imagem do usuário" })
      console.log(error)
    }
  },
)

export default setProfileImageUrlRoute
