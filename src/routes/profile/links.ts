// express
import express from "express"
import { Request, Response } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// models
import User from "@/models/User"

const linksRoute = express.Router()

linksRoute.get("/", checkToken, async (req: Request, res: Response) => {
  const id = req.cookies.id

  if (!id) {
    return res.status(400).json({
      msg: "id não disponivel!",
    })
  }

  const user = await User.findById(id, "-email -password")

  if (!user) {
    return res.status(400).json({
      msg: "usuario não encontrado!",
    })
  }

  if (user.links.length === 0) {
    return res.status(400).json({
      msg: "links vazio!",
    })
  }

  return res.status(200).json({
    links: user.links,
  })
})

export default linksRoute
