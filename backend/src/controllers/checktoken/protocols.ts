export interface ChecktokenParams {
  id: string
  token: string
}

export interface ChecktokenReturnTypes {
  msg: string
}

export interface IChecktokenRepository {
  checktoken(params: ChecktokenParams): Promise<ChecktokenReturnTypes>
}
