import { HttpRequest, HttpResponse, IControllerUserLinks } from "../protocols"
import {
  IUserLinksRepository,
  setUserLinksParams,
  userLinksParams,
  userLinksReturnTypes,
} from "./protocols"
import { badRequest, ok, serverError } from "../helpers"

export class UserLinksController implements IControllerUserLinks {
  constructor(private readonly userLinksRepository: IUserLinksRepository) {}

  async getLinks(
    HttpRequest: HttpRequest<userLinksParams>,
  ): Promise<HttpResponse<userLinksReturnTypes | string>> {
    try {
      if (!HttpRequest.body?.id) {
        badRequest("Links vazio")
      }

      const userlinks = await this.userLinksRepository.getLinks(
        HttpRequest.body!,
      )

      return ok<userLinksReturnTypes>(userlinks)
    } catch (error) {
      return serverError()
    }
  }

  async setLinks(
    HttpRequest: HttpRequest<setUserLinksParams>,
  ): Promise<HttpResponse<userLinksReturnTypes | string>> {
    try {
      if (!HttpRequest.body?.id || !HttpRequest.body.links) {
        throw new Error()
      }

      const userlinks = await this.userLinksRepository.setLinks(
        HttpRequest.body!,
      )

      return ok<userLinksReturnTypes>(userlinks)
    } catch (error) {
      return serverError()
    }
  }
}
