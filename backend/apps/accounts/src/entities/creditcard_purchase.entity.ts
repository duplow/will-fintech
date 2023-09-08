import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('creditcard_purchases')
export class CreditcardPurchase {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  description: string

  @Column()
  installment: number

  @Column()
  total_installments: number

  @Column()
  total_amount: number

  @Column()
  purchased_at: Date

  @Column()
  charged_at: Date
}
