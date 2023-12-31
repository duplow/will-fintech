import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigurationModule {}
