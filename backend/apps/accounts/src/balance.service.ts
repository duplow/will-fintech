import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { User } from './entities/user.entity'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

const getUserId = (user: User | string): string => {
  return typeof user === 'string' ? user : (user as User).id
}

@Injectable()
export class BalanceService {
  constructor(
    private readonly httpService: HttpService,
    @InjectQueue('balance')
    private balanceQueue: Queue
  ) {}

  getUserBalance(user: User | string) {
    return this.httpService.get(`http://localhost:3000/cats/${getUserId(user)}`)
  }

  updateUserBalanceAsync(user: User | string) {
    this.balanceQueue.add(
      {
        userId: getUserId(user)
      },
      { priority: 1, delay: 3000, backoff: 3000, attempts: 3 }
    )
  }
}
