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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BuyerService } from './buyer.service';
import { AuthGuard } from '../../common/auth/auth.guard';
import { PlaceBidDto } from './dto/place-bid.dto';

@ApiTags('Buyer')
@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  @Get('trade-products')
  @ApiOperation({ summary: 'Get trade products for buyers' })
  async getTradeProducts() {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: {
        products: [
          {
            id: 1,
            product_name: 'Premium Rice',
            quantity: 100,
            price_per_unit: 50,
            location: 'Pune'
          }
        ]
      },
      message: 'Trade products retrieved successfully'
    };
  }

  @Get('trade-products/:id')
  @ApiOperation({ summary: 'Get trade product by ID' })
  async getTradeProductById(@Param('id') id: number) {
    return this.buyerService.getTradeProductById(id);
  }

  @Post('show-interest/:productId')
  @ApiOperation({ summary: 'Show interest in a trade product' })
  async showInterest(
    @Param('productId') productId: number,
    @Query('buyer_id') buyerId: number = 4
  ) {
    return this.buyerService.showInterest(buyerId, productId);
  }

  @Post('place-bid/:productId')
  @ApiOperation({ summary: 'Place bid on a trade product' })
  @ApiBody({ type: PlaceBidDto })
  async placeBid(
    @Param('productId') productId: number,
    @Body() bidData: PlaceBidDto,
    @Query('buyer_id') buyerId: number = 4
  ) {
    return this.buyerService.placeBid(buyerId, productId, bidData);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get buyer statistics' })
  async getBuyerStats(@Query('buyer_id') buyerId: number = 4) {
    return this.buyerService.getBuyerStats(buyerId);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get buyer orders' })
  async getBuyerOrders(@Query('buyer_id') buyerId: number = 4, @Query() filters: any) {
    return this.buyerService.getBuyerOrders(buyerId, filters);
  }

  @Post('rate-seller/:sellerId')
  @ApiOperation({ summary: 'Rate a seller' })
  async rateSeller(
    @Param('sellerId') sellerId: number,
    @Body() ratingData: any
  ) {
    return this.buyerService.rateSeller(1, sellerId, ratingData);
  }

  @Get('registration-check')
  @ApiOperation({ summary: 'Check buyer registration status' })
  async registrationCheck() {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { is_registered: true },
      message: 'Registration status retrieved successfully'
    };
  }

  @Get('interest-list')
  @ApiOperation({ summary: 'Get buyer interest list' })
  async getInterestList(@Query() filters: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { interests: [] },
      message: 'Interest list retrieved successfully'
    };
  }

  @Get('bid-list')
  @ApiOperation({ summary: 'Get buyer bid list' })
  async getBidList(@Query() filters: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: { bids: [] },
      message: 'Bid list retrieved successfully'
    };
  }

  @Get('test')
  @ApiOperation({ summary: 'Test buyer service' })
  async testBuyerService() {
    return { success: 1, message: 'Buyer test working' };
  }

  @Get('products')
  @ApiOperation({ summary: 'Get products' })
  async getProducts() {
    return {
      success: 1,
      data: [{ id: 1, name: 'Rice' }],
      message: 'Products retrieved'
    };
  }
}
