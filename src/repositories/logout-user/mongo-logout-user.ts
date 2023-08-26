import {
  ILogoutUserRepository,
  LogoutUserParams,
  LogoutUserReturnTypes,
} from "@/controllers/logout-user/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { ObjectId } from "mongodb"

export class LogoutUserRepository implements ILogoutUserRepository {
  async logoutUser(params: LogoutUserParams): Promise<LogoutUserReturnTypes> {
    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(params.id),
    })

    if (!user) {
      throw new Error("User not find!")
    }

    return {
      success: true,
    }
  }
}
