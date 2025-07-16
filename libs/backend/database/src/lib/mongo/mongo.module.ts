// mongo.module.ts
import {
  DynamicModule,
  Module,
  Provider,
  ModuleMetadata,
  InjectionToken,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection, connect } from 'mongoose';
import { MongoConfig } from './interfaces/mongo-config.interface';
import { MONGO_CONNECTION } from './mongo.contant';

export interface MongoModuleAsyncOptions<
  T extends readonly unknown[] = unknown[]
> extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  useFactory: (...args: T) => Promise<MongoConfig> | MongoConfig;
}

@Module({})
export class MongoModule {
  static forRoot(config: MongoConfig): DynamicModule {
    const name = config.name ?? 'default';

    const providers: Provider[] = [
      {
        provide: MONGO_CONNECTION(name),
        useFactory: async () => {
          const conn = await connect(config.uri, config.options);
          return conn.connection;
        },
      },
    ];

    const imports = config.registerMongoose
      ? [MongooseModule.forRoot(config.uri, config.options || {})]
      : [];

    return {
      module: MongoModule,
      imports,
      providers,
      exports: [
        MONGO_CONNECTION(name),
        ...imports.flatMap((mod) => mod.exports || []),
      ],
    };
  }

  static forRootAsync<T extends readonly unknown[] = unknown[]>(
    options: MongoModuleAsyncOptions<T>
  ): DynamicModule {
    const name = options.name ?? 'default';

    const asyncConnectionProvider: Provider<Promise<Connection>> = {
      provide: MONGO_CONNECTION(name),
      useFactory: async (...args: T) => {
        const config = await options.useFactory(...args);
        const conn = await connect(config.uri, config.options);
        return conn.connection;
      },
      inject: options.inject ?? [],
    };

    const asyncMongooseModule = MongooseModule.forRootAsync({
      imports: options.imports ?? [],
      inject: options.inject ?? [],
      useFactory: async (...args: T) => {
        const config = await options.useFactory(...args);
        // If registerMongoose is false or undefined, return dummy config to disable MongooseModule connection
        return config.registerMongoose
          ? { uri: config.uri, ...config.options }
          : { uri: '', autoIndex: false, autoCreate: false };
      },
    });

    const imports = [asyncMongooseModule, ...(options.imports ?? [])];

    return {
      module: MongoModule,
      imports,
      providers: [asyncConnectionProvider],
      exports: [MONGO_CONNECTION(name), MongooseModule],
    };
  }
}
