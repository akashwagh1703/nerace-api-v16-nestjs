import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('irrigation_types')
export class IrrigationType extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  water_requirement: string;

  @Column({ nullable: true })
  efficiency: string;
}