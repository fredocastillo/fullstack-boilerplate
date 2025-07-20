import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: ['leading', 'lagging', 'calculated'] })
  type: 'leading' | 'lagging' | 'calculated';
}
