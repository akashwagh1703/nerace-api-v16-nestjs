import { 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Column 
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_deleted: boolean;

  @CreateDateColumn()
  created_on: Date;

  @UpdateDateColumn()
  updated_on: Date;

  @Column({ nullable: true })
  created_by_id: number;

  @Column({ nullable: true })
  updated_by_id: number;

  @Column({ nullable: true })
  deleted_by_id: number;

  @Column({ nullable: true })
  deleted_on: Date;
}
