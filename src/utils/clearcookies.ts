import { Response } from "express"

export function clearCookies(res: Response): void {
  res.clearCookie("id")
  res.clearCookie("token")
}
