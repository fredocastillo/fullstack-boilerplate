import {
  IsOptional,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateMetricThreshold } from '@shared/interfaces';

export class UpdateMetricThresholdDto implements IUpdateMetricThreshold {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  greenMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  yellowMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  comparisonField?: string;

  @ApiPropertyOptional({ enum: ['percentage', 'ratio', 'count'] })
  @IsOptional()
  @IsEnum(['percentage', 'ratio', 'count'])
  unit?: 'percentage' | 'ratio' | 'count';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  createdByUserId?: string;
}
