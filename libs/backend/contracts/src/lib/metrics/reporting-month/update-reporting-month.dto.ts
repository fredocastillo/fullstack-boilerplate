import { ApiPropertyOptional } from '@nestjs/swagger';
import { IUpdateReportingMonth } from '@shared/interfaces';
import { IsOptional, IsDateString } from 'class-validator';

export class UpdateReportingMonthDto implements IUpdateReportingMonth {
  @ApiPropertyOptional({ example: '2025-07-01' })
  @IsOptional()
  @IsDateString()
  monthStart?: string;
}
