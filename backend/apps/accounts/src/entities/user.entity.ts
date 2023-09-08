import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  fullname: string

  @Column()
  nickname: string

  @Column()
  document_number: string

  @Column()
  balance: number

  @Column()
  max_credit_limit: number

  @Column()
  account_email: string

  @Column()
  account_password_hash: string

  @Column({ default: false })
  active: boolean

  @Column()
  last_balance_updated_at: Date

  @Column()
  created_at: Date

  @Column()
  updated_at: Date
}
