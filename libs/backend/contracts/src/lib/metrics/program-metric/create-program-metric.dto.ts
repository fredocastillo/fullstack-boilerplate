/* eslint-disable @typescript-eslint/no-explicit-any */
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramMetricDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  programId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  metricId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  reportingMonthId: number;

  @ApiProperty({ type: Object, required: false })
  @IsOptional()
  rawData?: Record<string, any>;
}
