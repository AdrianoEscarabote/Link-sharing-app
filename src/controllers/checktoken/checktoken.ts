import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  ChecktokenParams,
  ChecktokenReturnTypes,
  IChecktokenRepository,
} from "./protocols"
import { badRequest, ok } from "../helpers"

export class ChecktokenController implements IController {
  constructor(private readonly ChecktokenRepository: IChecktokenRepository) {}

  async handle(
    HttpRequest: HttpRequest<ChecktokenParams>,
  ): Promise<HttpResponse<ChecktokenReturnTypes | string>> {
    if (!HttpRequest.body?.id || !HttpRequest.body?.token) {
      return badRequest("token and id not found!")
    }

    const { msg } = await this.ChecktokenRepository.checktoken(HttpRequest.body)

    return ok<ChecktokenReturnTypes>(msg)
  }
}
