export interface LogoutUserParams {
  id: string
}

export interface LogoutUserReturnTypes {
  success: boolean
}

export interface ILogoutUserRepository {
  logoutUser(params: LogoutUserParams): Promise<LogoutUserReturnTypes>
}
