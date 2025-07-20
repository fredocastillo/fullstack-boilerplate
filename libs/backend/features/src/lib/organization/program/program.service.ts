import { Injectable } from '@nestjs/common';
import { Program } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class ProgramService {
  private repo: Repository<Program>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Program);
  }

  findAll(): Promise<Program[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Program | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<Program>): Promise<Program> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: number, data: Partial<Program>): Promise<Program | null> {
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
