import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MinLength, IsNotEmpty } from 'class-validator';
import { ICreateLOB } from '@shared/interfaces';

export class CreateLobDto implements ICreateLOB {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  businessAreaId: number;
}
