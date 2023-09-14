import { DataSourceOptions } from 'typeorm'

type Configs = {
  port: number
  database: DataSourceOptions
}

export default (): Configs => ({
  port: parseInt(process.env.PORT, 10) ?? 3000,
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    migrations: ['src/migrations/**/*.{ts,js}'],
    entities: ['src/**/*.entity.{ts,js}'],
  },
})
