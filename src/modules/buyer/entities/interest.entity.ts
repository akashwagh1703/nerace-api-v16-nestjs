import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { TradeProduct } from './trade-product.entity';

@Entity('interests')
export class Interest extends BaseEntity {
  @Column()
  buyer_id: number;

  @Column()
  trade_product_id: number;

  @Column({ default: 'active' })
  status: string;

  @Column({ nullable: true })
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => TradeProduct)
  @JoinColumn({ name: 'trade_product_id' })
  tradeProduct: TradeProduct;
}