import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('commodity')
export class Commodity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true })
  variety: string;
}
