import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RedisService {
  constructor(private logger: Logger) {}

  setValue(key: string, _value: any) {
    this.logger.log(`[Redis] Storing value for key ${key}`)
  }

  getValue(key: string) {
    this.logger.log(`[Redis] Retrieving value for key ${key}`)
  }
}
