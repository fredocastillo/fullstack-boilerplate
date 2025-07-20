import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationModule } from './organization/organization.module';
import { MetricsModule } from './metrics/metrics.module';
import { PostgresConfigModule, PostgresConfigService } from '@backend/config';
import { PostgresModule } from '@backend/database';
import * as entities from '@backend/models'; // <-- Assuming this path points to your new index.ts

@Module({
  imports: [
    OrganizationModule,
    MetricsModule,
    PostgresConfigModule,
    PostgresModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: async (configService: PostgresConfigService) => ({
        name: 'default',
        typeOrmModuleOptions: {
          type: 'postgres',
          host: configService.host,
          port: configService.port,
          username: configService.username,
          password: configService.password,
          database: configService.database,
          synchronize: configService.synchronize,
          logging: configService.logging,
          entities: Object.values(entities),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
