import {
  IRegisterUserRepository,
  RegisterUserParams,
  ReturnRegisterUser,
} from "@/controllers/register-user/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { genSalt, hash } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

export class MongoRegisterUserRepository implements IRegisterUserRepository {
  async registerUser(params: RegisterUserParams): Promise<ReturnRegisterUser> {
    const userExists = await MongoClient.db.collection("users").findOne({
      email: params.email,
    })

    if (userExists) {
      throw new Error()
    }

    const salt = await genSalt(12)
    const passwordHash = await hash(params.password, salt)

    const userData = {
      email: params.email,
      password: passwordHash,
      uuid: uuidv4(),
    }

    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(userData)

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId })

    if (!user) {
      throw new Error("User not created")
    }

    const { uuid, _id } = user

    return { uuid, id: _id.toHexString() }
  }
}
