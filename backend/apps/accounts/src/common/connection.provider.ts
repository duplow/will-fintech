import { Injectable } from '@nestjs/common'

export interface RedisConnectionOptions {
  connectionString?: string
  port?: string | number
  host?: string
  username?: string
  password?: string
  db?: string | number
}

@Injectable()
export class ConnectionProvider {
  constructor(private options?: RedisConnectionOptions) {}

  getOptions(): string {
    if (this.options.connectionString) {
      return this.options.connectionString
    }

    const host = this.options.host ?? 'localhost'
    const port = this.options.port ?? 6379
    const username = this.options.username ?? ''
    const password = this.options.password ?? ''

    return `redis://${[username, password].join(':')}@${host}:${port}`
  }
}
