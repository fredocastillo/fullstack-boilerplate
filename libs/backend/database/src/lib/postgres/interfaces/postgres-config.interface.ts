import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export interface PostgresConfig {
  name?: string; // Optional name for multi-db support
  typeOrmModuleOptions: PostgresConnectionOptions;
}
