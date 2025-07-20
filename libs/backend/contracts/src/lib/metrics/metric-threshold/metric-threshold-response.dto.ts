import { ApiProperty } from '@nestjs/swagger';
import { IMetricThreshold } from '@shared/interfaces';

export class MetricThresholdResponseDto implements IMetricThreshold {
  @ApiProperty()
  id: number;

  @ApiProperty()
  metricId: number;

  @ApiProperty()
  greenMin: number;

  @ApiProperty()
  yellowMin: number;

  @ApiProperty()
  comparisonField: string;

  @ApiProperty({ enum: ['percentage', 'ratio', 'count'] })
  unit: 'percentage' | 'ratio' | 'count';

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty({ required: false })
  createdByUserId?: string;
}
