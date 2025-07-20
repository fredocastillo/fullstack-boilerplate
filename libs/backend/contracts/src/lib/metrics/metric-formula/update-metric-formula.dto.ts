import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';
import { IUpdateMetricFormula } from '@shared/interfaces';

export class UpdateMetricFormulaDto implements IUpdateMetricFormula {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  metricId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  expression?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  outputField?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  createdByUserId?: string;
}
