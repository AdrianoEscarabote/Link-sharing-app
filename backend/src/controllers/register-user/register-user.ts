import validator from "validator"
import { HttpRequest, HttpResponse, IController } from "@/controllers/protocols"
import { IRegisterUserRepository, RegisterUserParams } from "./protocols"
import { UserTypes } from "@/models/User"
import { Conflict, badRequest } from "../helpers"
import { registered } from "../helpers"
import { Secret, sign } from "jsonwebtoken"
import { setCookies } from "@/utils/setcookies"
import { Response } from "express"

export class RegisterUserController implements IController {
  constructor(
    private readonly registerUserRepository: IRegisterUserRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<RegisterUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<UserTypes | string>> {
    try {
      const requiredFields = ["email", "password", "confirmpassword"]

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof RegisterUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }
      const emailIsValid = validator.isEmail(httpRequest.body!.email)

      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }

      if (httpRequest?.body?.confirmpassword !== httpRequest?.body?.password) {
        throw new Error("Password and confirmation password must match")
      }

      const user = await this.registerUserRepository.registerUser(
        httpRequest.body!,
      )

      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

      const secret = process.env.SECRET as Secret

      const token = sign(
        {
          id: user.id,
        },
        secret,
      )

      setCookies(res, user.id, token)

      return registered<UserTypes>(user)
    } catch (error) {
      return Conflict()
    }
  }
}
