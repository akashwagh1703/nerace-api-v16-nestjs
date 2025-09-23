import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class PaymentService {
  constructor(private commonService: CommonService) {}

  async initiatePayment(userId: number, paymentData: any) {
    return this.commonService.successResponse(null, 'Payment initiated successfully');
  }

  async verifyPayment(userId: number, verificationData: any) {
    return this.commonService.successResponse(null, 'Payment verified successfully');
  }
}