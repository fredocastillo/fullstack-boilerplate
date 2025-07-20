import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, MinLength } from 'class-validator';
import { IUpdateLOB } from '@shared/interfaces';

export class UpdateLobDto implements IUpdateLOB {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  businessAreaId?: number;
}
