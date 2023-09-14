import { DataSourceOptions } from 'typeorm'

export type ConfigOptions = {
  database: DataSourceOptions
}

export interface ConfigService {
  getConfig(): Promise<ConfigOptions>
}
