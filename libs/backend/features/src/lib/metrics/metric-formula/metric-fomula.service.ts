import { Injectable } from '@nestjs/common';
import { MetricFormula } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class MetricFormulaService {
  private repo: Repository<MetricFormula>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(MetricFormula);
  }

  findAll(): Promise<MetricFormula[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<MetricFormula | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<MetricFormula>): Promise<MetricFormula> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: number,
    data: Partial<MetricFormula>
  ): Promise<MetricFormula | null> {
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
