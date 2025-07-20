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
import { ProgramMetricService } from '@backend/features';
import {
  CreateProgramMetricDto,
  ProgramMetricResponseDto,
  UpdateProgramMetricDto,
} from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('prgoram-metric')
@Controller('program-metric')
export class ProgramMetricController {
  constructor(private readonly service: ProgramMetricService) {}

  @Get()
  async findAll(): Promise<ProgramMetricResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(ProgramMetricResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ProgramMetricResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(ProgramMetricResponseDto, result);
  }

  @Post()
  async create(
    @Body() dto: CreateProgramMetricDto
  ): Promise<ProgramMetricResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(ProgramMetricResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgramMetricDto
  ): Promise<ProgramMetricResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(ProgramMetricResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
