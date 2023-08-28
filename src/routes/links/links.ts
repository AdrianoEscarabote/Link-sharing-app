// express
import express, { Request, Response } from "express"
const getLinksRoute = express.Router()

// middlewares
import checkToken from "@/middlewares/checktoken"

// user linsk controller
import { UserLinksController } from "@/controllers/user-links/user-links"

// user links repository
import { UserLinksRepository } from "@/repositories/user-links/mongo-user-links"

getLinksRoute.get("/", checkToken, async (req: Request, res: Response) => {
  const id = req.cookies.id
  console.log("valor do id", id)

  if (!id) {
    return res.status(400).json({
      msg: "id não disponivel!",
    })
  }

  const bodyFormated = {
    id,
  }

  const userLinksRepository = new UserLinksRepository()

  const userLinksController = new UserLinksController(userLinksRepository)

  const { body, statusCode } = await userLinksController.getLinks({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default getLinksRoute
