import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MobileLoginDto {
  @ApiProperty({ 
    description: 'Mobile number for login',
    example: '7028456361',
    required: false
  })
  @IsOptional()
  @IsString()
  mobile?: string;

  @ApiProperty({ 
    description: 'Username (mobile number) for login',
    example: '7028456361',
    required: false
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ 
    description: 'Device ID',
    example: 'device123',
    required: false
  })
  @IsOptional()
  @IsString()
  device_id?: string;
}