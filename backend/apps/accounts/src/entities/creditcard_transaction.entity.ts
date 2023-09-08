import { CreditcardTransactionStatusEnum } from '../enums/creditcard_transaction_status.enum'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('creditcard_transactions')
export class CreditcardTransaction {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  purchase_id: string

  @Column()
  installment: number

  @Column()
  total_installments: number

  @Column()
  amount: number

  @Column()
  status: CreditcardTransactionStatusEnum

  @Column()
  created_at: Date

  @Column()
  charged_at: Date
}
