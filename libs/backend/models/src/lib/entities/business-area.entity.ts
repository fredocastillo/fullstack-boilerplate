import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LOB } from './lob.entity';

@Entity()
export class BusinessArea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => LOB, (lob) => lob.businessArea)
  lobs: LOB[];
}
