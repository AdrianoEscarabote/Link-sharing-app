import { UserTypes } from "@/models/User"

export interface RegisterUserParams {
  email: string
  password: string
  confirmpassword: string
}

export interface IRegisterUserRepository {
  registerUser(params: RegisterUserParams): Promise<UserTypes>
}
