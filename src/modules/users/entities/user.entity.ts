import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  user_id: number;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_no: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postal_code: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  is_active: boolean;

  @Column({ nullable: true })
  is_deleted: boolean;

  @Column({ nullable: true })
  created_on: Date;

  @Column({ nullable: true })
  updated_on: Date;

  @Column({ nullable: true })
  created_by_id: number;

  @Column({ nullable: true })
  updated_by_id: number;

  @Column({ nullable: true })
  device_id: string;

  @Column({ nullable: true })
  referral_code: string;

  @Column({ nullable: true })
  opt_number: number;

  @Column({ nullable: true })
  is_login: boolean;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ nullable: true })
  user_type: number;

  @Column({ nullable: true })
  type: string;
}