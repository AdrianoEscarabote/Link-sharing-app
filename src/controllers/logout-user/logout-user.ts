import { Response } from "express"
import { badRequest, ok, serverError } from "../helpers"
import {
  ILogoutUserRepository,
  LogoutUserParams,
  LogoutUserReturnTypes,
} from "../logout-user/protocols"
import { HttpRequest, HttpResponse, IController } from "../protocols"
import { clearCookies } from "@/utils/clearcookies"

export class LogoutUserController implements IController {
  constructor(private readonly LogoutUserRepository: ILogoutUserRepository) {}
  async handle(
    HttpRequest: HttpRequest<LogoutUserParams>,
    res: Response<unknown>,
  ): Promise<HttpResponse<LogoutUserReturnTypes | string>> {
    if (!HttpRequest.body?.id) {
      return badRequest("id not found!")
    }

    const { success } = await this.LogoutUserRepository.logoutUser(
      HttpRequest.body!,
    )

    if (!success) return serverError()

    clearCookies(res)

    return ok<LogoutUserReturnTypes>(success)
  }
}
