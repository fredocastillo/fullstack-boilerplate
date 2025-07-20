/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Program } from './program.entity';
import { ReportingMonth } from './reporting-month.entity';
import { Metric } from './metric.entity';
import { StatusEnum } from '@shared/types';

@Entity()
export class ProgramMetric {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Program, (program) => program.metrics)
  program: Program;

  @ManyToOne(() => ReportingMonth)
  month: ReportingMonth;

  @ManyToOne(() => Metric)
  metric: Metric;

  @Column({ type: 'jsonb', nullable: true })
  rawData: Record<string, any>;

  @Column({ type: 'numeric', nullable: true })
  calculatedValue: number;

  @Column({ type: 'enum', enum: StatusEnum })
  status: StatusEnum;
}
