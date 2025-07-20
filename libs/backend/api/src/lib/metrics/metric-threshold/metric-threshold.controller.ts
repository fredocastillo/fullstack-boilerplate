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
import { MetricThresholdService } from '@backend/features';
import {
  CreateMetricThresholdDto,
  MetricThresholdResponseDto,
  UpdateMetricThresholdDto,
} from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('metric-threshold')
@Controller('metric-threshold')
export class MetricThresholdController {
  constructor(private readonly service: MetricThresholdService) {}

  @Get()
  async findAll(): Promise<MetricThresholdResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(MetricThresholdResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MetricThresholdResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(MetricThresholdResponseDto, result);
  }

  @Post()
  async create(
    @Body() dto: CreateMetricThresholdDto
  ): Promise<MetricThresholdResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(MetricThresholdResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMetricThresholdDto
  ): Promise<MetricThresholdResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(MetricThresholdResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
