import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity('ratings')
export class Rating extends BaseEntity {
  @Column()
  buyer_id: number;

  @Column()
  seller_id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  review: string;

  @Column({ nullable: true })
  trade_product_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;
}