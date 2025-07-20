import { Injectable } from '@nestjs/common';
import { MetricThreshold } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class MetricThresholdService {
  private repo: Repository<MetricThreshold>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(MetricThreshold);
  }

  findAll(): Promise<MetricThreshold[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<MetricThreshold | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<MetricThreshold>): Promise<MetricThreshold> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: number,
    data: Partial<MetricThreshold>
  ): Promise<MetricThreshold | null> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) return null;
    const updated = this.repo.merge(existing, data);
    return this.repo.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected === 1;
  }
}
