import { Module } from '@nestjs/common';
import { ApiMetricsModule } from '@backend/api';

@Module({
  imports: [ApiMetricsModule],
})
export class MetricsModule {}
