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
import { BusinessAreaService } from '@backend/features';
import {
  BusinessAreaResponseDto,
  CreateBusinessAreaDto,
  UpdateBusinessAreaDto,
} from '@backend/contracts';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('business-area')
@Controller('business-area')
export class BusinessAreaController {
  constructor(private readonly service: BusinessAreaService) {}

  @Get()
  async findAll(): Promise<BusinessAreaResponseDto[]> {
    const result = await this.service.findAll();
    return plainToInstance(BusinessAreaResponseDto, result);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<BusinessAreaResponseDto> {
    const result = await this.service.findOne(id);
    if (!result) throw new NotFoundException();
    return plainToInstance(BusinessAreaResponseDto, result);
  }

  @Post()
  async create(
    @Body() dto: CreateBusinessAreaDto
  ): Promise<BusinessAreaResponseDto> {
    const created = await this.service.create(dto);
    return plainToInstance(BusinessAreaResponseDto, created);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBusinessAreaDto
  ): Promise<BusinessAreaResponseDto> {
    const updated = await this.service.update(id, dto);
    if (!updated) throw new NotFoundException();
    return plainToInstance(BusinessAreaResponseDto, updated);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const deleted = await this.service.delete(id);
    if (!deleted) throw new NotFoundException();
  }
}
