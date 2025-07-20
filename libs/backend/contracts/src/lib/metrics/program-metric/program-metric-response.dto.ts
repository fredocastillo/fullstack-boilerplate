/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '@shared/types';
import { IProgramMetric } from '@shared/interfaces';

export class ProgramMetricResponseDto implements IProgramMetric {
  @ApiProperty()
  id: number;

  @ApiProperty()
  programId: number;

  @ApiProperty()
  metricId: number;

  @ApiProperty()
  reportingMonthId: number;

  @ApiProperty({ type: Object })
  rawData?: Record<string, any>;

  @ApiProperty({ required: false })
  calculatedValue?: number;

  @ApiProperty({ enum: StatusEnum, required: false })
  status?: StatusEnum;
}
