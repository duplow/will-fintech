import { Injectable } from '@nestjs/common'
import { Logger, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../entities/user.entity'
import {
  CustomerSignUpUC,
  CustomerSignUpOptions,
  CustomerSignUpResult,
} from '../../core/customer-sign-up.uc'
import { AuthenticationService } from 'src/adapters/authentication-service.interface'

@Injectable()
export class CustomerSignUpImpl implements CustomerSignUpUC {
  constructor(
    // private logger: Logger,
    private authenticationService: AuthenticationService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Execute transaction
   * @throws EmailAlreadyInUseException
   * @throws PasswordTooWeakException
   * @throws DocumentNumberAlreadyInUseException
   */
  async execute(params: CustomerSignUpOptions): Promise<CustomerSignUpResult> {
    // TODO: Add sleep 2s to avoid brute force
    // TODO: Check max attempts?

    const foundCustomer = await this.usersRepository.findOneBy({
      //kind: 'customer',
      account_email: params.username,
    })

    if (foundCustomer) {
      throw new Error('EmailAlreadyInUseException')
    }

    const { id } = await this.usersRepository.create({
      fullname: params.fullname,
      nickname: params.nickname,
      account_email: params.username,
      account_password_hash: params.password, // TODO: Encrypt password
      document_number: params.document_number,
      max_credit_limit: params.max_credit_limit ?? 0,
    })

    return {
      customerId: id,
    }
  }
}
