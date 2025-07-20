import { ApiProperty } from '@nestjs/swagger';
import { IMetricFormula } from '@shared/interfaces';

export class MetricFormulaResponseDto implements IMetricFormula {
  @ApiProperty()
  id: number;

  @ApiProperty()
  metricId: number;

  @ApiProperty()
  expression: string;

  @ApiProperty()
  outputField: string;

  @ApiProperty({ required: false })
  createdByUserId?: string;
}
