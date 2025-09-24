import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crop')
export class Crop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  season: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  duration: string;
}