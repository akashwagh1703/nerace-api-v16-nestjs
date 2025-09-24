import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('trade_product')
export class TradeProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  seller_id: number;

  @Column()
  product_name: string;

  @Column()
  crop_id: number;

  @Column()
  crop_variety_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column()
  quantity_unit: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price_per_unit: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  description: string;

  @Column('json', { nullable: true })
  images: string[];

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  harvest_date: Date;

  @Column({ nullable: true })
  expiry_date: Date;

  @Column({ default: false })
  is_negotiable: boolean;

  @Column({ nullable: true })
  quality_grade: string;

  @Column({ nullable: true })
  packaging_type: string;

  @Column({ nullable: true })
  transportation_mode: string;

  @Column({ nullable: true })
  payment_terms: string;


}
