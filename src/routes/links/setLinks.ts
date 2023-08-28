// express
import express, { Request, Response } from "express"
const setLinksRoute = express.Router()

// middlewares
import checkToken from "@/middlewares/checktoken"

// repository
import { UserLinksRepository } from "@/repositories/user-links/mongo-user-links"
// controller
import { UserLinksController } from "@/controllers/user-links/user-links"

setLinksRoute.post("/", checkToken, async (req: Request, res: Response) => {
  const id = req.cookies.id

  const { links } = req.body

  const bodyFormated = {
    id,
    links,
  }

  const userLinksRepository = new UserLinksRepository()

  const userLinksController = new UserLinksController(userLinksRepository)

  const { body, statusCode } = await userLinksController.setLinks({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default setLinksRoute
