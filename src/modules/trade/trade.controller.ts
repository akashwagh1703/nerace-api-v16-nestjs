import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TradeService } from './trade.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('Trade')
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Get('products')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get trade products' })
  async getTradeProducts(@Request() req) {
    return this.tradeService.getTradeProducts(req.user.user_id);
  }

  @Post('create-product')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create trade product' })
  async createTradeProduct(@Request() req, @Body() productData: any) {
    return this.tradeService.createTradeProduct(req.user.user_id, productData);
  }
}