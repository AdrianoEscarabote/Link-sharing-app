// express
import express from "express"
import { Request, Response } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// models
import User from "@/models/User"

const getDataRoute = express.Router()

getDataRoute.post("/", checkToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.cookies

    // check if users exists
    const user = await User.findById(id, "-email -password")

    if (!user) {
      return res.status(404).json({
        msg: "Usuario não encontrado!",
      })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ msg: "server error!" })
  }
})

export default getDataRoute
