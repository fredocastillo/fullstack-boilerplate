import { Injectable } from '@nestjs/common';
import { LOB } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class LOBService {
  private repo: Repository<LOB>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(LOB);
  }

  findAll(): Promise<LOB[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<LOB | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<LOB>): Promise<LOB> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<LOB>): Promise<LOB | null> {
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
