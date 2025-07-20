import { ApiProperty } from '@nestjs/swagger';
import { IBusinessArea } from '@shared/interfaces';

export class BusinessAreaResponseDto implements IBusinessArea {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
