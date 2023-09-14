import { Injectable } from '@nestjs/common'
import { Logger, Repository } from 'typeorm'
import { BalanceTransaction } from '../entities/balance_transaction.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { v4 as uuid } from 'uuid'
import {
  InsufficientFundsException,
  MakeTransferUC,
  TransactionOptions,
  TransferAmountCannotBeNegativeOrZeroException,
  UserNotFoundException,
} from '../core/make_transfer.uc'

@Injectable()
export class MakeTransferServiceImpl implements MakeTransferUC {
  constructor(
    private logger: Logger,
    @InjectRepository(User)
    private usersRepository: Repository<User>, // TODO: Change for a UserService or UserRepositoryService
    @InjectRepository(BalanceTransaction)
    private balanceTransactionRepository: Repository<BalanceTransaction>, // TODO: Replace per a BalanceTransactionService or BalanceTransactionRepositoryService
  ) {}

  /**
   * Validate transaction
   * @throws InsufficientFundsException
   * @throws UserNotFoundException
   * @throws TransferAmountCannotBeNegativeOrZeroException
   */
  async validateTransaction(
    transaction: TransactionOptions,
    sender: User,
    receiver: User,
  ) {
    if (transaction.amount <= 0)
      throw new TransferAmountCannotBeNegativeOrZeroException(
        'Amount cannot be negative or equal zero',
      )

    if (transaction.senderId === transaction.receiverId)
      throw new Error('Transfer receiver cannot be same as sender')

    if (!sender) throw new UserNotFoundException('User sender not found')

    if (!receiver) throw new UserNotFoundException('User receiver not found')

    if (sender.balance < transaction.amount)
      // TODO: Get updated balance
      throw new InsufficientFundsException('Insufficient funds')
  }

  /**
   * Validate transaction
   * @throws InsufficientFundsException
   * @throws UserNotFoundException
   * @throws TransferAmountCannotBeNegativeOrZeroException
   */
  async execute(transaction: TransactionOptions) {
    ;(async () => {
      const correlationId = uuid()

      try {
        // Start database transaction
        // Try to get locks for this operation on redis

        const [sender, receiver] = await Promise.all([
          this.usersRepository.findOneBy({ id: transaction.senderId }),
          this.usersRepository.findOneBy({ id: transaction.receiverId }),
        ])

        await this.validateTransaction(transaction, sender, receiver)

        await this.balanceTransactionRepository.save({
          user_id: transaction.senderId,
          amount: transaction.amount * -1,
          description: `Transfer to ${receiver.nickname}`,
          correlation_id: correlationId,
        })

        await this.balanceTransactionRepository.save({
          user_id: transaction.receiverId,
          amount: transaction.amount,
          description: `Transfer from ${sender.nickname}`,
          correlation_id: correlationId,
        })

        // TODO: Check transaction before commit
        // TODO: Clean balance cache for sender and receiver
        // TODO: Asks to recalculated sender and receiver balance (async)
        // Commit or rollback transaction
      } catch (e) {
        // Rollback database transaction
      }
    })()
  }
}
