import { Injectable } from '@nestjs/common'
import { Logger, Repository } from 'typeorm'
import { BalanceTransaction } from './entities/balance_transaction.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { v4 as uuid } from 'uuid'

type TransactionOptions = {
  senderId: string,
  receiverId: string,
  amount: number
}

@Injectable()
export class TransferService {
  constructor(
    private logger: Logger,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(BalanceTransaction)
    private balanceTransactionRepository: Repository<BalanceTransaction>,
  ) {}

  async validateTransaction(transaction: TransactionOptions) {
    if (transaction.amount <= 0)
      throw new Error('Amount cannot be negative or equal zero')

    if (transaction.senderId === transaction.receiverId)
      throw new Error('Transfer receiver cannot be same as sender')

    const [sender, receiver] = await Promise.all([
      this.usersRepository.findOne({ id: transaction.senderId }), // TODO: Change to UserService, AccountService or CustomerService
      this.usersRepository.findOne({ id: transaction.receiverId }),
    ])

    if (!sender) throw new Error('User sender not found')

    if (!receiver) throw new Error('User receiver not found')

    if (sender.balance < transaction.amount) // TODO: Get updated balance
      throw new Error('Insufficient funds')
  }

  async makeTransaction(transaction: TransactionOptions) {
    ;(async () => {
      const correlationId = uuid()

      try {
        // Start database transaction
        await this.validateTransaction(transaction)

        const [sender, receiver] = await Promise.all([
          this.usersRepository.findOne({ id: transaction.senderId }),
          this.usersRepository.findOne({ id: transaction.receiverId }),
        ])

        await this.balanceTransactionRepository.save({
          user_id: transaction.senderId,
          amount: transaction.amount * -1,
          description: `Transfer to ${receiver.nickname}`,
          correlation_id,
        })

        await this.balanceTransactionRepository.save({
          user_id: transaction.receiverId,
          amount: transaction.amount,
          description: `Transfer from ${sender.nickname}`,
          correlation_id,
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
