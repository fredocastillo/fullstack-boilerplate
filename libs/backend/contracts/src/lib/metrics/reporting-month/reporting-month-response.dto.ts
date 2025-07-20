import { ApiProperty } from '@nestjs/swagger';
import { IReportingMonth } from '@shared/interfaces';

export class ReportingMonthResponseDto implements IReportingMonth {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: '2025-07-01' })
  monthStart: string;
}
