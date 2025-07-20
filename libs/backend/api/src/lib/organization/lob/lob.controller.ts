import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { LOBService } from '@backend/features';
import { CreateLobDto, LobResponseDto, UpdateLobDto } from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('lob')
@Controller('lob')
export class LobController {
  constructor(private readonly service: LOBService) {}

  @Get()
  async findAll(): Promise<LobResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(LobResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<LobResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(LobResponseDto, result);
  }

  @Post()
  async create(@Body() dto: CreateLobDto): Promise<LobResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(LobResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLobDto
  ): Promise<LobResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(LobResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
