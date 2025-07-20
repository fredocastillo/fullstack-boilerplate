import { ApiProperty } from '@nestjs/swagger';
import { IMetric } from '@shared/interfaces';

export class MetricResponseDto implements IMetric {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ['leading', 'lagging', 'calculated'] })
  type: 'leading' | 'lagging' | 'calculated';
}
