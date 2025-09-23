import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommodityService } from './commodity.service';

@ApiTags('Commodity')
@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get commodity list' })
  async getCommodityList(@Query() filters: any) {
    return this.commodityService.getCommodityList(filters);
  }

  @Get('prices')
  @ApiOperation({ summary: 'Get commodity prices' })
  async getCommodityPrices(@Query() filters: any) {
    return this.commodityService.getCommodityPrices(filters);
  }

  @Get('market-rates')
  @ApiOperation({ summary: 'Get market rates' })
  async getMarketRates(@Query() filters: any) {
    return this.commodityService.getMarketRates(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get commodity by ID' })
  async getCommodityById(@Param('id') id: number) {
    return this.commodityService.getCommodityById(id);
  }

  @Get('search/:term')
  @ApiOperation({ summary: 'Search commodities' })
  async searchCommodities(@Param('term') term: string) {
    return this.commodityService.searchCommodities(term);
  }
}