import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Metric } from './metric.entity';

@Entity()
export class MetricThreshold {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Metric, { onDelete: 'CASCADE' })
  metric: Metric;

  @Column('numeric')
  greenMin: number;

  @Column('numeric')
  yellowMin: number;

  @Column()
  comparisonField: string; // e.g. "value", "stabilityRatio", "percentPassed"

  @Column({ type: 'enum', enum: ['percentage', 'ratio', 'count'] })
  unit: 'percentage' | 'ratio' | 'count';

  @Column({ default: false })
  isDefault: boolean;

  @Column({ nullable: true })
  createdByUserId: string;
}
