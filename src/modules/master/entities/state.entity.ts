import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  cities: number;

  @Column({ nullable: true })
  is_deleted: boolean;
}
