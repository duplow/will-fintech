import { User } from '../entities/user.entity'

export interface UserRepositoryService {
  getUsers(): Promise<User[]>
  findOneUserById(id: string): Promise<User>
  findManyUserByIds(ids: string[]): Promise<User>
  activateUser(id: string): Promise<User>
  deactivateUser(id: string): Promise<User>
  updateBalance(id: string, newBalance: number)
}
