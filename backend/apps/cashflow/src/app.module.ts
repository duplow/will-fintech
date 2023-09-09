import { Module } from '@nestjs/common'
import { BalanceController } from './app.controller'
import { BalanceService } from './app.service'

@Module({
  imports: [],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class AppModule {}
