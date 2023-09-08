import { Module } from '@nestjs/common'
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

@Module({
  imports: [
    HttpModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5379
      }
    }),
    BullModule.registerQueue({
      name: 'balance'
    }),
    /*
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 3306,
          username: configService.get('USERNAME'),
          password: 'root',
          database: 'test',
          synchronize: false,
          autoLoadEntities: true,
        },
      },
    }),
    */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'cash_flow',
      synchronize: false,
      autoLoadEntities: true
    }),
    TypeOrmModule.forFeature([User]),
    //RedisModule
    RedisModule.forRoot({ connectionString: 'redis://localhost:6379' })
  ],
  controllers: [AppController],
  providers: [AppService, UserService, BalanceService, AudioConsumer]
})
export class AppModule {}
