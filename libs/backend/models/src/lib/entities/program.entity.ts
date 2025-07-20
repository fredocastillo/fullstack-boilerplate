import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LOB } from './lob.entity';
import { ProgramMetric } from './program-metric.entity';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => LOB, (lob) => lob.programs)
  lob: LOB;

  @OneToMany(() => ProgramMetric, (pm) => pm.program)
  metrics: ProgramMetric[];
}
