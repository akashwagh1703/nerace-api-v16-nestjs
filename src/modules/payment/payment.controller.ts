import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initiate payment' })
  async initiatePayment(@Request() req, @Body() paymentData: any) {
    return this.paymentService.initiatePayment(req.user.user_id, paymentData);
  }

  @Post('verify')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify payment' })
  async verifyPayment(@Request() req, @Body() verificationData: any) {
    return this.paymentService.verifyPayment(req.user.user_id, verificationData);
  }
}