// express
import express from "express"
import { Response, Request } from "express"

// Models
import User from "@/models/User"

// json web token
import { Secret, sign } from "jsonwebtoken"

// bcrypt
import { compare } from "bcrypt"

const loginRoute = express.Router()

interface LoginRouteBodyTypes {
  email: string
  password: string
  confirmpassword: string
}

// Login User
loginRoute.post("/", async (req: Request, res: Response) => {
  const { email, password }: LoginRouteBodyTypes = req.body

  if (!email) {
    return res.status(422).json({ msg: "The email is wrong!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "The password is wrong!" })
  }

  // check if user exists
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ msg: "User does not exist!" })
  }

  // check if password match
  const checkPassword = await compare(password, user.password as string)

  if (!checkPassword) {
    return res.status(422).json({ msg: "Invalid password!" })
  }

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)

  try {
    const secret = process.env.SECRET as Secret

    const token = sign(
      {
        id: user._id,
      },
      secret,
    )

    res.cookie("id", user._id, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    })

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: expirationDate,
    })

    return res.status(200).json({
      msg: "Authentication successful!",
      _id: user._id,
      token: token,
    })
  } catch (e) {
    return res.send(500).json({
      mesg: "There was a server error, please try again later!",
    })
  }
})

export default loginRoute
