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
import { ProgramService } from '@backend/features';
import {
  CreateProgramDto,
  ProgramResponseDto,
  UpdateProgramDto,
} from '@backend/contracts';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('program')
@Controller('program')
export class ProgramController {
  constructor(private readonly service: ProgramService) {}
  @Get()
  async findAll(): Promise<ProgramResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(ProgramResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProgramResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(ProgramResponseDto, result);
  }

  @Post()
  async create(@Body() dto: CreateProgramDto): Promise<ProgramResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(ProgramResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgramDto
  ): Promise<ProgramResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(ProgramResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
