import { LinkType } from "@/models/Link"

export interface userLinksParams {
  id: string
}

export interface setUserLinksParams {
  links: LinkType[]
  id: string
}

export interface userLinksReturnTypes {
  links: LinkType[]
}

export interface IUserLinksRepository {
  getLinks(params: userLinksParams): Promise<userLinksReturnTypes>
  setLinks(params: setUserLinksParams): Promise<userLinksReturnTypes>
}
