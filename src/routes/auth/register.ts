// express
import express from "express"
import { Response, Request } from "express"

// bcrypt
import { hash, genSalt } from "bcrypt"

// Json web token
import { sign, Secret } from "jsonwebtoken"

// Models
import User from "@/models/User"

// middlewares
import checkToken from "@/middlewares/checktoken"

const RegisterRouter = express.Router()

interface RegisterBodyTypes {
  email: string
  password: string
  confirmpassword: string
}

RegisterRouter.post("/", checkToken, async (req: Request, res: Response) => {
  const { confirmpassword, email, password }: RegisterBodyTypes = req.body

  if (!email) {
    return res.status(422).json({ msg: "email is required!" })
  }

  if (!password) {
    return res.status(422).json({ msg: "password is required!" })
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: "Password and confirmation must match!" })
  }

  // check if user exists
  const userExists = await User.findOne({ email: email })

  if (userExists) {
    return res.status(422).json({ msg: "Please use another email!" })
  }

  // create password
  const salt = await genSalt(12)
  const passwordHash = await hash(password, salt)

  // create user
  const user = new User({
    email,
    password: passwordHash,
  })

  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)

  try {
    await user.save()

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

    res.status(201).json({ success: true, _id: user._id })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

export default RegisterRouter
