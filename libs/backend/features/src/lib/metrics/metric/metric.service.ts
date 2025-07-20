import { Injectable } from '@nestjs/common';
import { Metric } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class MetricService {
  private repo: Repository<Metric>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Metric);
  }

  findAll(): Promise<Metric[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Metric | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<Metric>): Promise<Metric> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<Metric>): Promise<Metric | null> {
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
