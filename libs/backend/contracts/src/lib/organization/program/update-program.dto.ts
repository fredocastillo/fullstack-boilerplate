import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';
import { IUpdateProgram } from '@shared/interfaces';

export class UpdateProgramDto implements IUpdateProgram {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  lobId?: number;
}
