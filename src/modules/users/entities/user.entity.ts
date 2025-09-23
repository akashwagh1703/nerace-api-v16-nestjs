import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true, nullable: true })
  mobile: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 'farmer' })
  user_type: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ nullable: true })
  address_line_1: string;

  @Column({ nullable: true })
  address_line_2: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  lng: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  otp_expiry: Date;

  @Column({ nullable: true })
  device_id: string;

  @Column({ nullable: true })
  fcm_token: string;

  @Column({ default: 'en' })
  language: string;

  @Column({ nullable: true })
  referral_code: string;

  @Column({ nullable: true })
  referred_by: string;
}