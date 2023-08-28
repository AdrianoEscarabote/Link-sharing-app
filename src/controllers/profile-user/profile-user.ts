import { HttpRequest, HttpResponse, IControllerProfile } from "../protocols"
import {
  IProfileUserRepository,
  ProfileUserParams,
  getProfileUserParams,
  getProfileUserReturn,
  setProfileImageParams,
  setProfileImageReturn,
} from "./protocols"
import { badRequest, ok, serverError } from "../helpers"

export class ProfileUserController implements IControllerProfile {
  constructor(private readonly ProfileUserRepository: IProfileUserRepository) {}
  async setProfileDetails(
    httpRequest: HttpRequest<ProfileUserParams>,
  ): Promise<HttpResponse<ProfileUserParams | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "previewEmail"]

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof ProfileUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      const updateUser = await this.ProfileUserRepository.setProfileUserDetails(
        httpRequest.body!,
      )

      return ok<ProfileUserParams>(updateUser)
    } catch (error) {
      return serverError()
    }
  }
  async getProfileData(
    httpRequest: HttpRequest<getProfileUserParams>,
  ): Promise<HttpResponse<getProfileUserReturn | string>> {
    try {
      if (!httpRequest?.body?.id) {
        return badRequest("id not found")
      }

      const user = await this.ProfileUserRepository.getProfileUserData(
        httpRequest.body!,
      )

      return ok<getProfileUserReturn>(user)
    } catch (error) {
      return serverError()
    }
  }
  async setProfileImage(
    httpRequest: HttpRequest<setProfileImageParams>,
  ): Promise<HttpResponse<setProfileImageReturn | string>> {
    try {
      if (!httpRequest.body?.file || !httpRequest.body?.id) {
        return badRequest("Error")
      }

      const user = await this.ProfileUserRepository.setProfileImage(
        httpRequest.body,
      )

      return ok<setProfileImageReturn>(user)
    } catch (error) {
      return serverError()
    }
  }
}
