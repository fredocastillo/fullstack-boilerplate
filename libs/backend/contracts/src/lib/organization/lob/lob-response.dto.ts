import { ApiProperty } from '@nestjs/swagger';
import { ILOB } from '@shared/interfaces';

export class LobResponseDto implements ILOB {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  businessAreaId: number;
}
