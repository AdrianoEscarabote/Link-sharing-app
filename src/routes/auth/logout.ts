// express
import express from "express"
import { Response, Request } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"

// Models
import User from "@/models/User"

interface LogoutCookiesTypes {
  id: string
}

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req: Request, res: Response) => {
  try {
    const { id }: LogoutCookiesTypes = req.cookies

    const user = await User.findById(id, "-password -email")

    if (!user) {
      return res.status(400).json({
        msg: "user is not present in the database!",
      })
    }

    res.clearCookie("id")
    res.clearCookie("token")

    return res.status(200).json({
      msg: "success!",
    })
  } catch (error) {
    return res.status(500).json({ msg: "server error!" })
  }
})

export default logoutRoute
