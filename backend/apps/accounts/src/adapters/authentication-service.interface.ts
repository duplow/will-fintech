import { User } from '../entities/user.entity'

export interface AuthenticationService {
  findUserByEmail(email: string): Promise<User>
  checkPasswordMatch(
    hashedPassword: string,
    givenPassword: string,
  ): Promise<boolean>
  generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }>
}
