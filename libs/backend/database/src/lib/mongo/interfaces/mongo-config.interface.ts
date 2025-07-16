// mongo-config.interface.ts
import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface MongoConfig {
  uri: string;
  options?: MongooseModuleOptions;
  registerMongoose?: boolean; // controls auto-registration
  name?: string;
}
