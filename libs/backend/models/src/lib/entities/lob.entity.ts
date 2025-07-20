import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BusinessArea } from './business-area.entity';
import { Program } from './program.entity';

@Entity()
export class LOB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => BusinessArea, (ba) => ba.lobs)
  businessArea: BusinessArea;

  @OneToMany(() => Program, (program) => program.lob)
  programs: Program[];
}
