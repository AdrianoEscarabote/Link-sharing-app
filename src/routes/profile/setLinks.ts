// express
import express from "express"
import { Request, Response } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// models
import User from "@/models/User"

const setLinksRoute = express.Router()

setLinksRoute.post("/", checkToken, async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id

    const { links } = req.body

    if (!links) {
      return res.status(400).json({
        msg: "links vazio!",
      })
    }

    const user = await User.findById(id, "-email -password")

    if (!user) {
      return res.status(400).json({
        msg: "usuario não encontrado! vasco",
      })
    }
    const linkAlreadyExists = user.links.filter(
      (link) => link.platform === links.platform,
    )[0]

    if (linkAlreadyExists) {
      return res.status(400).json({
        msg: "este link já existe!",
      })
    }

    user.links = links

    await user.save()

    return res.status(200).json({
      msg: "links inserido!",
      links: user.links,
    })
  } catch (error) {
    return res.status(500).json({
      msg: `${error}`,
    })
  }
})

export default setLinksRoute
