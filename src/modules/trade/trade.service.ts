import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class TradeService {
  constructor(private commonService: CommonService) {}

  async getTradeProducts(userId: number) {
    return this.commonService.successResponse([], 'Trade products retrieved successfully');
  }

  async createTradeProduct(userId: number, productData: any) {
    return this.commonService.successResponse(null, 'Trade product created successfully');
  }
}