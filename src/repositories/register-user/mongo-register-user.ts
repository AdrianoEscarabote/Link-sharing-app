import {
  IRegisterUserRepository,
  RegisterUserParams,
} from "@/controllers/register-user/protocols"
import { MongoClient } from "@/database/mongo"
import { UserTypes } from "@/models/User"
import { MongoUser } from "../mongo-protocols"
import { genSalt, hash } from "bcrypt"

export class MongoRegisterUserRepository implements IRegisterUserRepository {
  async registerUser(params: RegisterUserParams): Promise<UserTypes> {
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

    const { _id, ...rest } = user

    return { id: _id.toHexString(), ...rest }
  }
}
