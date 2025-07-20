import { Injectable } from '@nestjs/common';
import { BusinessArea } from '@backend/models';
import { DataSource, Repository } from 'typeorm';
import { InjectPostgres } from '@backend/database';

@Injectable()
export class BusinessAreaService {
  private repo: Repository<BusinessArea>;

  constructor(@InjectPostgres() private readonly dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(BusinessArea);
  }

  findAll(): Promise<BusinessArea[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<BusinessArea | null> {
    const result = await this.repo.findOne({ where: { id } });
    return result;
  }

  create(data: Partial<BusinessArea>): Promise<BusinessArea> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(
    id: number,
    data: Partial<BusinessArea>
  ): Promise<BusinessArea | null> {
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
