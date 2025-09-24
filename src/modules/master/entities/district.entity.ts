import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { State } from './state.entity';

@Entity('districts')
export class District extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column()
  state_id: number;

  @Column({ nullable: true })
  code: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_id' })
  state: State;
}
