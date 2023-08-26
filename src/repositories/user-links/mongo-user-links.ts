import {
  IUserLinksRepository,
  setUserLinksParams,
  userLinksParams,
  userLinksReturnTypes,
} from "@/controllers/user-links/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { ObjectId } from "mongodb"

export class UserLinksRepository implements IUserLinksRepository {
  async getLinks(params: userLinksParams): Promise<userLinksReturnTypes> {
    if (!params.id) {
      throw new Error()
    }

    const filter = {
      _id: new ObjectId(params.id),
    }

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    if (!user?.links || user.links.length === 0 || !user) {
      throw new Error("User not find!")
    }

    const { links } = user

    return {
      links,
    }
  }
  async setLinks(params: setUserLinksParams): Promise<userLinksReturnTypes> {
    if (!params.id) {
      throw new Error()
    }

    const filter = {
      _id: new ObjectId(params.id),
    }

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne(filter)

    console.log("valor do usuario ", user)

    if (!user) throw new Error()

    /* const { links } = user

    const linkAlreadyExists = user.links.filter(
      (link) => link.platform === links.platform,
    )[0] */

    /* if (linkAlreadyExists) {
      throw new Error()
    } */

    const updateUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOneAndUpdate(
        filter,
        {
          $set: { links: params.links },
        },
        {
          returnDocument: "after",
        },
      )

    if (!updateUser.value) {
      throw new Error("User not updated!")
    }

    const { links } = updateUser.value

    return {
      links,
    }
  }
}
