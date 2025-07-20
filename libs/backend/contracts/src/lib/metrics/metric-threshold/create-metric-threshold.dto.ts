import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsEnum,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { ICreateMetricThreshold } from '@shared/interfaces';

export class CreateMetricThresholdDto implements ICreateMetricThreshold {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  metricId: number;

  @ApiProperty()
  @IsNumber()
  greenMin: number;

  @ApiProperty()
  @IsNumber()
  yellowMin: number;

  @ApiProperty()
  @IsString()
  comparisonField: string;

  @ApiProperty({ enum: ['percentage', 'ratio', 'count'] })
  @IsEnum(['percentage', 'ratio', 'count'])
  unit: 'percentage' | 'ratio' | 'count';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  createdByUserId?: string;
}
