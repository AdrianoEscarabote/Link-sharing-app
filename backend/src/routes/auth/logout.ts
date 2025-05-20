// express
import express, { Response, Request } from "express"

// middlewares
import checkToken from "@/middlewares/checktoken"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "@/repositories/mongo-protocols"
import { ObjectId } from "mongodb"

const logoutRoute = express.Router()

logoutRoute.post("/", checkToken, async (req: Request, res: Response) => {
  try {
    const id = req.cookies.id

    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(id),
    })

    if (!user) {
      return res.status(400).json({
        msg: "user is not present in the database!",
      })
    }

    res.clearCookie("id", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    })

    return res.status(200).json({
      msg: "success!",
    })
  } catch (error) {
    return res.status(500).json({ msg: "server error!" })
  }
})

export default logoutRoute
