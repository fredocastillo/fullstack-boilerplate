/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateProgramMetric } from '@shared/interfaces';

export class UpdateProgramMetricDto implements IUpdateProgramMetric {
  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  rawData?: Record<string, any>;
}
