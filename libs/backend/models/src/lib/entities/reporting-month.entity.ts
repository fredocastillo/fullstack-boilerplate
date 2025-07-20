import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportingMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  monthStart: Date;
}
