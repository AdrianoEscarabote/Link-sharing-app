// express
import express from "express"
import { Request, Response } from "express"

// models
import User from "@/models/User"

// middlewares
import checkToken from "@/middlewares/checktoken"

const setProfileDetailsRoute = express.Router()

setProfileDetailsRoute.put(
  "/",
  checkToken,
  async (req: Request, res: Response) => {
    const id = req.cookies.id

    const user = await User.findById(id, "-password")

    if (!user) {
      return res.status(404).json({
        msg: "Usuario não encontradoas!",
      })
    }

    const { previewEmail, firstName, lastName } = req.body

    if (!user) {
      return res.status(404).json({ msg: "Usuario não encontrado!" })
    }
    if (!previewEmail) {
      return res.status(404).json({ msg: "previewEmail não está presente!" })
    }
    if (!firstName) {
      return res.status(404).json({ msg: "firstName não está presente" })
    }
    if (!lastName) {
      return res.status(404).json({ msg: "lastName não está presente!" })
    }

    try {
      const updatedUser = await User.findOneAndUpdate(
        { email: user.email },
        { firstName, lastName, previewEmail },
        { new: true }, // Returns the updated document
      )

      if (!updatedUser) {
        // Caso o usuário não seja encontrado
        return res
          .status(404)
          .json({ msg: "updateruserUsuário não encontrado!" })
      }

      res.status(200).json({ msg: "Usuário atualizado!", user: updatedUser })
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar o perfil do usuário" })
      console.error(error)
    }
  },
)

export default setProfileDetailsRoute
