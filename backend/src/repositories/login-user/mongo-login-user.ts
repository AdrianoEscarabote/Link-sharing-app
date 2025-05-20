import {
  ILoginUserRepository,
  LoginUserParams,
} from "@/controllers/login-user/protocols"
import { MongoClient } from "@/database/mongo"
import { MongoUser } from "../mongo-protocols"
import { compare } from "bcrypt"
import { LoginUserReturnTypes } from "@/controllers/login-user/protocols"

export class MongoLoginUserRepository implements ILoginUserRepository {
  async loginUser(params: LoginUserParams): Promise<LoginUserReturnTypes> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email: params.email })

    if (user === null) {
      throw new Error("User does not exist")
    }

    // check if password match
    const checkPassword = await compare(
      params.password as string,
      user.password as string,
    )

    if (!checkPassword) {
      throw new Error("Invalid password!")
    }

    const { _id } = user

    return { id: _id.toHexString(), success: true }
  }
}
