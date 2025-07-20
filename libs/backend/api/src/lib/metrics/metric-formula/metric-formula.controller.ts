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
import { MetricFormulaService } from '@backend/features';
import {
  CreateMetricFormulaDto,
  MetricFormulaResponseDto,
  UpdateMetricFormulaDto,
} from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('metric-formula')
@Controller('metric-formula')
export class MetricFormulaController {
  constructor(private readonly service: MetricFormulaService) {}

  @Get()
  async findAll(): Promise<MetricFormulaResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(MetricFormulaResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<MetricFormulaResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(MetricFormulaResponseDto, result);
  }

  @Post()
  async create(
    @Body() dto: CreateMetricFormulaDto
  ): Promise<MetricFormulaResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(MetricFormulaResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMetricFormulaDto
  ): Promise<MetricFormulaResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(MetricFormulaResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
