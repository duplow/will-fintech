import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('creditcard_bills')
export class CreditcardBill {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  description: string

  @Column()
  status: string

  @Column()
  amount: number

  @Column()
  due_date: Date

  @Column()
  period_start_at: Date

  @Column()
  period_end_at: Date

  @Column()
  paid_amount: number

  @Column()
  created_at: Date
}
