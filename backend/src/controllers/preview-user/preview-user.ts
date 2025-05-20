import { HttpRequest, HttpResponse, IController } from "../protocols"
import {
  IPreviewUserRepository,
  PreviewUserParams,
  ReturnPreviewUser,
} from "./protocols"
import { badRequest, ok } from "../helpers"

class PreviewController implements IController {
  constructor(private readonly PreviewRepository: IPreviewUserRepository) {}

  async handle(
    HttpRequest: HttpRequest<PreviewUserParams>,
  ): Promise<HttpResponse<ReturnPreviewUser | string>> {
    if (!HttpRequest.body?.uuid) {
      return badRequest("uuid not found!")
    }

    const user = await this.PreviewRepository.handle(HttpRequest.body)

    return ok<ReturnPreviewUser>(user)
  }
}

export default PreviewController
