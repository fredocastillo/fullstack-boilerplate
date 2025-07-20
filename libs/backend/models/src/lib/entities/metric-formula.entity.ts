import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Metric } from './metric.entity';

@Entity()
export class MetricFormula {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Metric, { onDelete: 'CASCADE' })
  metric: Metric;

  @Column('text')
  expression: string; // e.g. "(originalCount - totalChanged) / originalCount"

  @Column('text')
  outputField: string; // e.g. "value" or "stabilityRatio"

  @Column({ nullable: true })
  createdByUserId: string;
}
