export type CustomerSignUpOptions = {
  fullname: string
  nickname: string
  username: string
  password: string
  document_number: string
  max_credit_limit: number
}

export type CustomerSignUpResult = {
  customerId: string
}

export interface CustomerSignUpUC {
  execute(credentials: CustomerSignUpOptions): Promise<CustomerSignUpResult>
}
