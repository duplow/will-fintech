import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('balance_transactions')
export class BalanceTransaction {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  amount: number

  @Column()
  description: string

  @Column()
  transaction_time: Date
}
