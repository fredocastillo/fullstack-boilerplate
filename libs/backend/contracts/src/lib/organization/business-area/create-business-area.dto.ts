import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ICreateBusinessArea } from '@shared/interfaces';

export class CreateBusinessAreaDto implements ICreateBusinessArea {
  @ApiProperty({ example: 'Defense Systems' })
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;
}
