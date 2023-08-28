import { LinkType } from "@/models/Link"

export interface ProfileUserParams {
  id: string
  firstName: string
  lastName: string
  previewEmail: string
}

export interface setProfileUserDetailsReturn {
  firstName: string
  lastName: string
  previewEmail: string
}

export interface getProfileUserReturn {
  firstName: string
  lastName: string
  profileImageUrl: string
  links: LinkType[]
  previewEmail: string
}

export interface getProfileUserParams {
  id: string
}

export interface setProfileImageParams {
  file: Express.Multer.File
  id: string
}

export interface setProfileImageReturn {
  imageUrl: string
}

export interface IProfileUserRepository {
  setProfileUserDetails(
    params: ProfileUserParams,
  ): Promise<setProfileUserDetailsReturn>
  getProfileUserData(
    params: getProfileUserParams,
  ): Promise<getProfileUserReturn>
  setProfileImage(params: setProfileImageParams): Promise<setProfileImageReturn>
}
