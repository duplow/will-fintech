import { DynamicModule, Logger, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { Redis } from 'ioredis'
import {
  ConnectionProvider,
  RedisConnectionOptions
} from './connection.provider'

let redisClient: Redis = null

export const getSingleton = (): Redis => {
  return redisClient
}

@Module({
  imports: [],
  controllers: [],
  providers: [RedisService, Logger],
})
export class RedisModule {

  constructor(
    private logger: Logger,
    private connection: ConnectionProvider
  ) {}

  static forRoot(options?: RedisConnectionOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        RedisService,
        Logger,
        {
          provide: ConnectionProvider,
          useValue: new ConnectionProvider(options),
        },
      ],
      exports: [RedisService],
    }
  }

  onModuleInit() {
    this.logger.log('[RedisModule] Starting redis client')
    redisClient = new Redis(this.connection.getOptions())

    redisClient.on('connect', () => {
      this.logger.debug('[RedisModule] Connection estabilished')
    })

    redisClient.on('close', () => {
      this.logger.debug('[RedisModule] Connection closed')
    })

    redisClient.on('error', (e) => {
      this.logger.error(`[RedisModule] Unexpected error ${e.message}`)
    })
  }

  onModuleDestroy() {
    this.logger.log('[RedisModule] Connection detroyed')
    // TODO: Disconnect ioredis
  }
}
