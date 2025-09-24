import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ 
    description: 'Mobile number',
    example: '7028456361',
    required: false
  })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({ 
    description: 'Username (mobile number)',
    example: '7028456361',
    required: false
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ 
    description: 'OTP code',
    example: '888888',
    required: true
  })
  @IsString()
  otp: string;
}