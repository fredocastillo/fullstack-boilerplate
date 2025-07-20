import { Injectable } from '@nestjs/common';
import { ReportingMonth } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class ReportingMonthService {
  private repo: Repository<ReportingMonth>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(ReportingMonth);
  }

  findAll(): Promise<ReportingMonth[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<ReportingMonth | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<ReportingMonth>): Promise<ReportingMonth> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: number,
    data: Partial<ReportingMonth>
  ): Promise<ReportingMonth | null> {
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
