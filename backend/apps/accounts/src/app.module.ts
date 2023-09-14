import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { BalanceService } from './balance.service'
import { AudioConsumer } from './audio.consumer'
import { RedisModule } from './common/redis.module'
import { ConfigurationModule } from './configuration.module'
import { DatabaseModule } from './database.module'
import { AuthController } from './controllers/auth.controller'
import { CustomerSignUpImpl } from './application/auth/customer-sign-up.uc.impl'
import { CustomerSignInImpl } from './application/auth/customer-sign-in.uc.impl'
import { AuthenticationServiceImpl } from './application/auth/authentication-service'

@Module({
  imports: [
    HttpModule,
    ConfigurationModule,
    DatabaseModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5379,
      },
    }),
    BullModule.registerQueue({
      name: 'balance',
    }),
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot({ connectionString: 'redis://localhost:6379' }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    UserService,
    BalanceService,
    AudioConsumer,
    CustomerSignUpImpl,
    CustomerSignInImpl,
    UserService,
    Logger,
    AuthenticationServiceImpl,
  ],
})
export class AppModule {}
