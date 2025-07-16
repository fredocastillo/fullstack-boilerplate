import {
  DynamicModule,
  Global,
  InjectionToken,
  Module,
  ModuleMetadata,
  OptionalFactoryDependency,
  Provider,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PostgresConfig } from './interfaces/postgres-config.interface';
import { createPostgresProviders } from './postgres.provider';
import { POSTGRES_CONNECTION } from './postgres.contant';

@Global()
@Module({})
export class PostgresModule {
  static forRoot(config: PostgresConfig): DynamicModule {
    const providers = createPostgresProviders(config);
    return {
      module: PostgresModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync<T = unknown>(
    options: PostgresModuleAsyncOptions<T>
  ): DynamicModule {
    const connectionName = options.name ?? 'default';

    const asyncProvider: Provider = {
      provide: POSTGRES_CONNECTION(connectionName),
      useFactory: async (...args: T[]) => {
        const config = await options.useFactory(...args);
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
      inject: options.inject || [],
    };

    return {
      module: PostgresModule,
      imports: options.imports || [],
      providers: [asyncProvider],
      exports: [asyncProvider],
    };
  }
}

// interface moved below for visibility
export interface PostgresModuleAsyncOptions<T = unknown>
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;

  inject?: Array<InjectionToken | OptionalFactoryDependency>;

  useFactory: (...args: T[]) => Promise<PostgresConfig> | PostgresConfig;
}
