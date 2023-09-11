import { Body, Controller, Get, Header, Post } from '@nestjs/common'
import {
  MakeTransferUC,
  TransactionOptions,
  TransferAmountCannotBeNegativeOrZeroException,
  TransferReceiverAndSenderCannotBeTheSameException,
  UserNotFoundException,
} from '../core/make_transfer.uc'
import { AuthRequired } from '../infrastructure/decorators/auth-required.decorator'
import { User } from 'src/entities/user.entity'
import { AuthenticatedUser } from 'src/infrastructure/decorators/authenticated-user.decorator'
import { defaultErrorHandler } from './logic/defaullt-error-handler'
import { RequestId } from './decorators/request-id.decorator'

interface MakeTransferPayload {
  receiverId: string
  amount: number
}

@Controller('/transfer')
export class TransferController {
  constructor(private readonly makeTransferUserCase: MakeTransferUC) {}

  @Get('/')
  getTransfers(): string {
    throw new Error('Not implemented yet.')
  }

  @Get('/:id')
  getTransfer(): string {
    throw new Error('Not implemented yet.')
  }

  @Post('/')
  @AuthRequired()
  makeTransfer(
    @Body data: MakeTransferPayload,
    @AuthenticatedUser() sender: User,
    @Header('X-Request-Id') requestId: string,
    @RequestId() _requestId: string,
  ) {
    const transactionOptions: TransactionOptions = {
      senderId: sender.id,
      receiverId: data.receiverId,
      amount: data.amount,
      correlationId: requestId,
    }

    return this.makeTransferUserCase
      .execute(transactionOptions)
      .catch(this.handleMakeTransferErrors)
  }

  handleMakeTransferErrors(ex: Error) {
    if (ex instanceof UserNotFoundException) {
      return {
        status: 400,
        data: {
          property: 'receiverId',
          message: 'Destination user not found',
          transient: false,
        },
      }
    }

    if (ex instanceof TransferAmountCannotBeNegativeOrZeroException) {
      return {
        status: 400,
        data: {
          property: 'amount',
          message: 'Transfer amount value cannot be less or equals to zero',
          transient: false,
        },
      }
    }

    if (ex instanceof TransferReceiverAndSenderCannotBeTheSameException) {
      return {
        status: 400,
        data: {
          property: 'receiverId',
          message: 'Destination user cannot be yourself ID',
          transient: false,
        },
      }
    }

    return defaultErrorHandler(ex)
  }
}
