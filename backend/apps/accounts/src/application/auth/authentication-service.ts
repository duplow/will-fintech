import { AuthenticationService } from 'src/adapters/authentication-service.interface'
import { User } from 'src/entities/user.entity'

export class AuthenticationServiceImpl implements AuthenticationService {
  findUserByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  checkPasswordMatch(hashedPassword: string, givenPassword: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string; }> {
    throw new Error("Method not implemented.");
  }

}