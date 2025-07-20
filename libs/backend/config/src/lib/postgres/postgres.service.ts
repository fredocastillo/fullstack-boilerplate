import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostgresConfigService {
  constructor(private readonly config: ConfigService) {}

  get host() {
    return this.config.get<string>('postgres.host');
  }

  get port() {
    return this.config.get<number>('postgres.port');
  }

  get username() {
    return this.config.get<string>('postgres.username');
  }

  get password() {
    return this.config.get<string>('postgres.password');
  }

  get database() {
    return this.config.get<string>('postgres.database');
  }

  get synchronize() {
    return this.config.get<boolean>('postgres.synchronize');
  }

  get logging() {
    return this.config.get<boolean>('postgres.logging');
  }
}
