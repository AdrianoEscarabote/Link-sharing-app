import { Response } from "express"

export function setCookies(res: Response, userId: string, token: string): void {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)

  res.cookie("id", userId, {
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
}
