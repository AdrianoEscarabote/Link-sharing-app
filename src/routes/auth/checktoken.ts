// express
import express from "express"
import { Request, Response } from "express"

// json web token
import { verify, Secret } from "jsonwebtoken"

// models
import User from "@/models/User"

const checkTokenRoute = express.Router()

checkTokenRoute.get("/", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token
    const id = req.cookies.id

    if (!token && !id) {
      return res.status(404).json({
        msg: "error!",
      })
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ msg: "error!" })
    }

    const secret = process.env.SECRET as Secret

    verify(token, secret)

    // Returns user details
    return res.status(200).json({
      msg: "success",
    })
  } catch (error) {
    return res.status(500).json({ msg: "Invalid token!" })
  }
})

export default checkTokenRoute
