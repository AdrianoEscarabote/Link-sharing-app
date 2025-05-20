// controller
import { ChecktokenController } from "@/controllers/checktoken/checktoken"
// repository
import { ChecktokenRepository } from "@/repositories/checktoken/mongo-checktoken"
// express
import express, { Request, Response } from "express"
const checkTokenRoute = express.Router()

checkTokenRoute.get("/", async (req: Request, res: Response) => {
  const token = req.cookies.token
  const id = req.cookies.id

  const bodyFormated = {
    token,
    id,
  }

  const checktokenRepository = new ChecktokenRepository()

  const checktokenController = new ChecktokenController(checktokenRepository)

  const { body, statusCode } = await checktokenController.handle({
    body: bodyFormated,
  })

  res.status(statusCode).send(body)
})

export default checkTokenRoute
