import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { IUpdateMetric } from '@shared/interfaces';

export class UpdateMetricDto implements IUpdateMetric {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['leading', 'lagging', 'calculated'] })
  @IsOptional()
  @IsEnum(['leading', 'lagging', 'calculated'])
  type?: 'leading' | 'lagging' | 'calculated';
}
