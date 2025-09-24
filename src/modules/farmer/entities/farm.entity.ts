import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('farms')
export class Farm extends BaseEntity {
  @Column()
  farmer_id: number;

  @Column()
  farm_name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_area: number;

  @Column('decimal', { precision: 10, scale: 2 })
  crop_area: number;

  @Column()
  crop_id: number;

  @Column({ nullable: true })
  crop_variety_id: number;

  @Column({ nullable: true })
  soil_type_id: number;

  @Column({ nullable: true })
  irrigation_type_id: number;

  @Column({ nullable: true })
  farm_type: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  lng: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'farmer_id' })
  farmer: User;
}
