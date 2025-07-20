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
import { ReportingMonthService } from '@backend/features';
import {
  CreateReportingMonthDto,
  ReportingMonthResponseDto,
  UpdateReportingMonthDto,
} from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reporting-month')
@Controller('reporting-month')
export class ReportingMonthController {
  constructor(private readonly service: ReportingMonthService) {}

  @Get()
  async findAll(): Promise<ReportingMonthResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(ReportingMonthResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ReportingMonthResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(ReportingMonthResponseDto, result);
  }

  @Post()
  async create(
    @Body() dto: CreateReportingMonthDto
  ): Promise<ReportingMonthResponseDto> {
    const created = await this.service.create({
      monthStart: new Date(dto.monthStart),
    });
    return plainToInstance(ReportingMonthResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReportingMonthDto
  ): Promise<ReportingMonthResponseDto> {
    const updated = await this.service.update(id, {
      ...(dto.monthStart ? { monthStart: new Date(dto.monthStart) } : {}),
    });
    if (!updated) throw new NotFoundException();
    return plainToInstance(ReportingMonthResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
