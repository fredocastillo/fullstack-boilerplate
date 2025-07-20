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
import { MetricService } from '@backend/features';
import {
  CreateMetricDto,
  MetricResponseDto,
  UpdateMetricDto,
} from '@backend/contracts';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

@ApiTags('metric')
@Controller('metric')
export class MetricController {
  constructor(private readonly service: MetricService) {}

  @Get()
  async findAll(): Promise<MetricResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(MetricResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MetricResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(MetricResponseDto, result);
  }

  @Post()
  async create(@Body() dto: CreateMetricDto): Promise<MetricResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(MetricResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMetricDto
  ): Promise<MetricResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(MetricResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
