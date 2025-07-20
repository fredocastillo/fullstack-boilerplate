import { Injectable } from '@nestjs/common';
import { ProgramMetric } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class ProgramMetricService {
  private repo: Repository<ProgramMetric>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(ProgramMetric);
  }

  findAll(): Promise<ProgramMetric[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProgramMetric | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<ProgramMetric>): Promise<ProgramMetric> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: number,
    data: Partial<ProgramMetric>
  ): Promise<ProgramMetric | null> {
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
