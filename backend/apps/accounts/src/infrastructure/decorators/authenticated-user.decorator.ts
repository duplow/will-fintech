import { User } from '../../entities/user.entity'

export const AuthenticatedUser = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    target: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    propertyKey: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parameterIndex: number,
  ): void => {
    console.log('Return current authenticated user')
  }
}
