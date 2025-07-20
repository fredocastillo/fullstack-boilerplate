import { ApiProperty } from '@nestjs/swagger';
import { ICreateReportingMonth } from '@shared/interfaces';
import { IsDateString } from 'class-validator';

export class CreateReportingMonthDto implements ICreateReportingMonth {
  @ApiProperty({ example: '2025-07-01' })
  @IsDateString()
  monthStart: string; // Expecting format like "2025-07-01"
}
