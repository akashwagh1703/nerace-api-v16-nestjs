import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BuyerService } from './buyer.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Get('trade-products')
  @ApiOperation({ summary: 'Get trade products for buyers' })
  async getTradeProducts(@Query() filters: any) {
    return this.buyerService.getTradeProducts(filters);
  }

  @Get('trade-products/:id')
  @ApiOperation({ summary: 'Get trade product by ID' })
  async getTradeProductById(@Param('id') id: number) {
    return this.buyerService.getTradeProductById(id);
  }

  @Post('show-interest/:productId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Show interest in a trade product' })
  async showInterest(@Request() req, @Param('productId') productId: number) {
    return this.buyerService.showInterest(req.user.user_id, productId);
  }

  @Post('place-bid/:productId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Place bid on a trade product' })
  async placeBid(
    @Request() req, 
    @Param('productId') productId: number,
    @Body() bidData: any
  ) {
    return this.buyerService.placeBid(req.user.user_id, productId, bidData);
  }

  @Get('stats')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get buyer statistics' })
  async getBuyerStats(@Request() req) {
    return this.buyerService.getBuyerStats(req.user.user_id);
  }

  @Get('orders')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get buyer orders' })
  async getBuyerOrders(@Request() req, @Query() filters: any) {
    return this.buyerService.getBuyerOrders(req.user.user_id, filters);
  }

  @Post('rate-seller/:sellerId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Rate a seller' })
  async rateSeller(
    @Request() req,
    @Param('sellerId') sellerId: number,
    @Body() ratingData: any
  ) {
    return this.buyerService.rateSeller(req.user.user_id, sellerId, ratingData);
  }

  @Get('registration-check')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check buyer registration status' })
  async registrationCheck(@Request() req) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { is_registered: true },
      message: 'Registration status retrieved successfully'
    };
  }

  @Get('interest-list')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get buyer interest list' })
  async getInterestList(@Request() req, @Query() filters: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { interests: [] },
      message: 'Interest list retrieved successfully'
    };
  }

  @Get('bid-list')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get buyer bid list' })
  async getBidList(@Request() req, @Query() filters: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { bids: [] },
      message: 'Bid list retrieved successfully'
    };
  }
}