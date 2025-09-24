import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FarmerService } from './farmer.service';

@ApiTags('Farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Get('products')
  @ApiOperation({ summary: 'Get farmer products' })
  async getFarms(@Query('farmer_id') farmerId: number = 1) {
    return this.farmerService.getFarms(farmerId);
  }

  @Post('add-product')
  @ApiOperation({ summary: 'Add new product' })
  async addProduct(@Body() productData: any, @Query('farmer_id') farmerId: number = 1) {
    return this.farmerService.addProduct(farmerId, productData);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get farmer dashboard' })
  async getDashboard(@Query('farmer_id') farmerId: number = 1) {
    return this.farmerService.getDashboard(farmerId);
  }
}