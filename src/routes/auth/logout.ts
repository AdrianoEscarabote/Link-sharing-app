// express
import express, { Response, Request } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// repository
import { LogoutUserRepository } from "@/repositories/logout-user/mongo-logout-user"
// controller
import { LogoutUserController } from "@/controllers/logout-user/logout-user"

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req: Request, res: Response) => {
  const id = req.cookies.id

  const bodyFormated = {
    id,
  }

  const logoutUserRepository = new LogoutUserRepository()

  const logoutUserController = new LogoutUserController(logoutUserRepository)

  const { body, statusCode } = await logoutUserController.handle(
    {
      body: bodyFormated,
    },
    res,
  )

  res.status(statusCode).send(body)
})

export default logoutRoute
