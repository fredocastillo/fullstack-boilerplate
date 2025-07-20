import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from './postgres.config';
import { PostgresConfigService } from './postgres.service';
import { postgresValidationSchema } from './postgres.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [postgresConfig],
      isGlobal: true,
      validationSchema: postgresValidationSchema,
    }),
  ],
  providers: [PostgresConfigService],
  exports: [PostgresConfigService],
})
export class PostgresConfigModule {}
