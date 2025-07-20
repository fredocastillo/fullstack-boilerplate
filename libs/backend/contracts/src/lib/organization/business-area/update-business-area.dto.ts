import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { IUpdateBusinessArea } from '@shared/interfaces';

export class UpdateBusinessAreaDto implements IUpdateBusinessArea {
  @ApiProperty({ example: 'Aerospace Engineering', required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}
