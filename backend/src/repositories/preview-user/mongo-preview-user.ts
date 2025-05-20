import {
  IPreviewUserRepository,
  PreviewUserParams,
  ReturnPreviewUser,
} from "@/controllers/preview-user/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoPreviewUser } from "../mongo-protocols"

export class PreviewUserRepository implements IPreviewUserRepository {
  async handle(params: PreviewUserParams): Promise<ReturnPreviewUser> {
    if (!params.uuid) {
      throw new Error("uuid not found!")
    }

    const user = await MongoClient.db
      .collection<MongoPreviewUser>("users")
      .findOne({ uuid: params.uuid })

    if (user === null) {
      throw new Error("User does not exist")
    }

    const { firstName, lastName, links, previewEmail, profileImageUrl, uuid } =
      user

    return { firstName, lastName, links, previewEmail, profileImageUrl, uuid }
  }
}
