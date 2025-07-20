import { ApiProperty } from '@nestjs/swagger';
import { IProgram } from '@shared/interfaces';

export class ProgramResponseDto implements IProgram {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lobId: number;
}
