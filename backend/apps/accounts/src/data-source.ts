import { DataSource } from 'typeorm'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { DatabaseModule } from './database.module'

export default (async () => {
  const app = await NestFactory.create(DatabaseModule)
  const config = app.get<ConfigService>(ConfigService)
  const dataSourceOptions = config.get('database')
  return new DataSource(dataSourceOptions)
})()
