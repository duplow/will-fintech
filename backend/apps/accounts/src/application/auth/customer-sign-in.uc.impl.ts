import { Injectable } from '@nestjs/common'
import { Logger, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import {
  CustomerSignInUC,
  CustomerSignInOptions,
  CustomerSignInResult,
} from '../../core/customer-sign-in.uc'
import { InvalidCredentialsException } from 'src/core/exceptions/InvalidCredentialsException'
import { AuthenticationService } from 'src/adapters/authentication-service.interface'

@Injectable()
export class CustomerSignInImpl implements CustomerSignInUC {
  constructor(
    private logger: Logger,
    private authenticationService: AuthenticationService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Execute transaction
   * @throws InvalidCredentialsException
   * @throws MaximumNumberOfSignInAttemptsReachedException
   */
  async execute(
    credentials: CustomerSignInOptions,
  ): Promise<CustomerSignInResult> {
    // TODO: Add sleep 2s to avoid brute force
    // TODO: Check max attempts?

    const foundCustomer = await this.usersRepository.findOneBy({
      //kind: 'customer',
      account_email: credentials.username,
    })

    if (!foundCustomer) {
      throw new InvalidCredentialsException()
    }

    const isPasswordsMatching =
      await this.authenticationService.checkPasswordMatch(
        foundCustomer.account_password_hash,
        credentials.password,
      )

    if (!isPasswordsMatching) {
      throw new InvalidCredentialsException()
    }

    const { accessToken, refreshToken } =
      await this.authenticationService.generateTokens(foundCustomer)

    return {
      customerId: foundCustomer.id,
      accessToken,
      refreshToken,
    }
  }
}
