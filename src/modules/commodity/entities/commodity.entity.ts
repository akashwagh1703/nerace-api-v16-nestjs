import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('commodities')
export class Commodity extends BaseEntity {
  @Column()
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