// express
import { Request, Response, NextFunction } from "express"

// json web token
import { Secret, verify } from "jsonwebtoken"

function checkToken(req: Request, res: Response, next: NextFunction) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" })
  }

  try {
    const secret = process.env.SECRET as Secret

    verify(token, secret)

    next()
  } catch (error) {
    res.status(400).json({ msg: "token invalido!" })
  }
}

export default checkToken
