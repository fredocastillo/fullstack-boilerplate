import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, IsNotEmpty } from 'class-validator';
import { ICreateProgram } from '@shared/interfaces';

export class CreateProgramDto implements ICreateProgram {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  lobId: number;
}
