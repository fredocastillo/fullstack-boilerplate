import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { PostgresConfig } from './interfaces/postgres-config.interface';
import { POSTGRES_CONNECTION } from './postgres.contant';

export function createPostgresProviders(config: PostgresConfig): Provider[] {
  const connectionName = config.name ?? 'default';
  const {
    type,
    host,
    port,
    username,
    password,
    database,
    synchronize,
    logging,
    entities,
    migrations,
    subscribers,
    migrationsTableName,
    ssl,
    schema,
    extra,
  } = config.typeOrmModuleOptions;

  return [
    {
      provide: POSTGRES_CONNECTION(connectionName),
      useFactory: async () => {
        const dataSource = new DataSource({
          type,
          host,
          port,
          username,
          password,
          database,
          synchronize,
          logging,
          entities,
          migrations,
          subscribers,
          migrationsTableName,
          ssl,
          schema,
          extra,
        });

        return dataSource.initialize();
      },
    },
  ];
}
