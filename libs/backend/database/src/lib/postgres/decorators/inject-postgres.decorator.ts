import { Inject } from '@nestjs/common';
import { POSTGRES_CONNECTION } from '../postgres.contant';

export const InjectPostgres = (name = 'default') =>
  Inject(POSTGRES_CONNECTION(name));
