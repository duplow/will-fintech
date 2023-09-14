import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { CustomerSignInUC } from '../core/customer-sign-in.uc'
import { defaultErrorHandler } from './logic/defaullt-error-handler'
import { InvalidCredentialsException } from 'src/core/exceptions/InvalidCredentialsException'
import { Response } from 'express'
import { CustomerSignUpUC } from 'src/core/customer-sign-up.uc'
import { CustomerSignInImpl } from 'src/application/auth/customer-sign-in.uc.impl'
import { CustomerSignUpImpl } from 'src/application/auth/customer-sign-up.uc.impl'

interface SignUpPayload {
  fullname: string
  nickname: string
  username: string
  password: string
  documentNumber: string
}

interface SignInPayload {
  username: string
  password: string
}

@Controller('/users') // TODO: Split sign-up and sign-in in auth and user
export class AuthController {
  constructor(
    //@Inject(CustomerSignUpImpl)
    private readonly customerSignUpUserCase: CustomerSignUpImpl,
    //@Inject(CustomerSignInUC)
    private readonly customerSignInUserCase: CustomerSignInImpl,
  ) {}

  @Post('/sign-up')
  async signUp(
    @Body() data: SignUpPayload,
    @Res() res: Response,
  ): Promise<{ customerId: string }> {
    try {
      const { customerId } = await this.customerSignUpUserCase.execute({
        ...data,
        document_number: data.documentNumber,
        max_credit_limit: 1000,
      })

      res.header('X-User-Id', customerId)

      return {
        customerId,
      }
    } catch (ex) {
      this.handleErrors(ex)
    }
  }

  @Post('/sign-in')
  async signIn(
    @Body() data: SignInPayload,
    @Res() res: Response,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const { customerId, accessToken, refreshToken } =
        await this.customerSignInUserCase.execute(data)

      res.header('X-User-Id', customerId)
      res.header('X-Token', accessToken)

      return {
        accessToken,
        refreshToken,
      }
    } catch (ex) {
      this.handleErrors(ex)
    }
  }

  handleErrors(ex: Error) {
    if (ex instanceof InvalidCredentialsException) {
      return {
        status: 403,
        data: {
          property: 'receiverId',
          message: 'Destination user not found',
          transient: false,
        },
      }
    }

    return defaultErrorHandler(ex)
  }
}
