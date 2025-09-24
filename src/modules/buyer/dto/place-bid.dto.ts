import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PlaceBidDto {
  @ApiProperty({ 
    description: 'Bid amount for the product',
    example: 45.50 
  })
  @IsNumber()
  bid_amount: number;

  @ApiProperty({ 
    description: 'Additional comments for the bid',
    example: 'Interested in bulk purchase',
    required: false 
  })
  @IsOptional()
  @IsString()
  comments?: string;

  @ApiProperty({ 
    description: 'Quantity for the bid',
    example: 100,
    required: false 
  })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}