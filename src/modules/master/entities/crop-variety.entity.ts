import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Crop } from './crop.entity';

@Entity('crop_varieties')
export class CropVariety extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  crop_id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  yield_per_acre: string;

  @ManyToOne(() => Crop)
  @JoinColumn({ name: 'crop_id' })
  crop: Crop;
}
