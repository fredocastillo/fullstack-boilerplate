import { Inject } from '@nestjs/common';
import { MONGO_CONNECTION } from '../mongo.contant';

export const InjectMongo = (name = 'default') => Inject(MONGO_CONNECTION(name));
