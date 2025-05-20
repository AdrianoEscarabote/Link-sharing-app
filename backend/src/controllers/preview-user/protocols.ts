import { LinkType } from "@/models/Link"

interface PreviewUserParams {
  uuid: string
}

interface ReturnPreviewUser {
  firstName: string
  lastName: string
  previewEmail: string
  profileImageUrl: string
  uuid: string
  links: LinkType[]
}

interface IPreviewUserRepository {
  handle(params: PreviewUserParams): Promise<ReturnPreviewUser>
}

export { PreviewUserParams, ReturnPreviewUser, IPreviewUserRepository }
