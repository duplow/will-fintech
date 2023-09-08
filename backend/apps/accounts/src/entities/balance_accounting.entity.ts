import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('balance_accountings')
export class BalanceAccounting {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  balance: number

  @Column()
  last_updated_at: Date // accounting_time

  @Column()
  created_at: Date
}
