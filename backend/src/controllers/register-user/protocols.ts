export interface RegisterUserParams {
  email: string
  password: string
  confirmpassword: string
}

export interface ReturnRegisterUser {
  uuid: string
  id: string
}

export interface IRegisterUserRepository {
  registerUser(params: RegisterUserParams): Promise<ReturnRegisterUser>
}
