import {
  ChecktokenParams,
  ChecktokenReturnTypes,
  IChecktokenRepository,
} from "@/controllers/checktoken/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { Secret, verify } from "jsonwebtoken"
import { ObjectId } from "mongodb"

export class ChecktokenRepository implements IChecktokenRepository {
  async checktoken(params: ChecktokenParams): Promise<ChecktokenReturnTypes> {
    const user = await MongoClient.db.collection<MongoUser>("users").findOne({
      _id: new ObjectId(params.id),
    })

    if (!user) {
      throw new Error()
    }

    const secret = process.env.SECRET as Secret

    verify(params.token, secret)

    return {
      msg: "success",
    }
  }
}
