import { Provider } from '@nestjs/common';
import { Connection, connect, ConnectOptions } from 'mongoose';
import { MongoConfig } from './interfaces/mongo-config.interface';
import { MONGO_CONNECTION } from './mongo.contant';

export const createMongoProviders = (
  config: MongoConfig,
  name: string
): Provider[] => [
  {
    provide: MONGO_CONNECTION(name),
    useFactory: async (): Promise<Connection> => {
      const connection = await connect(
        config.uri,
        config.options as ConnectOptions
      );
      return connection.connection;
    },
  },
];
