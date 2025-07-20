import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ICreateMetricFormula } from '@shared/interfaces';

export class CreateMetricFormulaDto implements ICreateMetricFormula {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  metricId: number;

  @ApiProperty()
  @IsString()
  expression: string;

  @ApiProperty()
  @IsString()
  outputField: string;

  @ApiProperty({ required: false })
  @IsOptional()
  createdByUserId?: string;
}
