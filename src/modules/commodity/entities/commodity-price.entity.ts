import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Commodity } from './commodity.entity';

@Entity('commodity_prices')
export class CommodityPrice extends BaseEntity {
  @Column()
  commodity_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  min_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  max_price: number;

  @Column('decimal', { precision: 10, scale: 2 })
  modal_price: number;

  @Column()
  market: string;

  @Column()
  price_date: Date;

  @Column({ nullable: true })
  unit: string;

  @ManyToOne(() => Commodity)
  @JoinColumn({ name: 'commodity_id' })
  commodity: Commodity;
}