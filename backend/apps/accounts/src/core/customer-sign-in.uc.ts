export type CustomerSignInOptions = {
  username: string
  password: string
}

export type CustomerSignInResult = {
  customerId: string
  accessToken: string
  refreshToken: string
}

export interface CustomerSignInUC {
  execute(credentials: CustomerSignInOptions): Promise<CustomerSignInResult>
}
