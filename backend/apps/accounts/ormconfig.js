module.exports = {
  type: 'postgres',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE_NAME,
  entities: [__dirname + '/src/entities/**/*{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/src/migrations',
    entitiesDir: __dirname + '/src/entities',
  },
  synchronize: false,
}
