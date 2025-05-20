import { LinkType } from "./Link"

export interface UserTypes {
  email: string
  password: string
  id: string
  firstName: string
  lastName: string
  uuid: string
  profileImageUrl: string
  profileImageName: string
  previewEmail: string
  links: LinkType[]
}
