import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';
import { ICreateMetric } from '@shared/interfaces';

export class CreateMetricDto implements ICreateMetric {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: ['leading', 'lagging', 'calculated'] })
  @IsEnum(['leading', 'lagging', 'calculated'])
  type: 'leading' | 'lagging' | 'calculated';
}
