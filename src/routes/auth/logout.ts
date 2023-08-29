// express
import express, { Response, Request } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req: Request, res: Response) => {
  const id = req.cookies.id
  const token = req.cookies.token

  if (!id || !token) {
    return res.status(400).json({
      msg: "id or token not found!",
    })
  }

  res.clearCookie("id")
  res.clearCookie("token")

  return res.status(200).json({
    msg: "success!",
  })
})

export default logoutRoute
