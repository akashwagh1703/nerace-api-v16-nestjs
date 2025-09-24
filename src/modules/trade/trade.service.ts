import { Injectable } from '@nestjs/common';

@Injectable()
export class TradeService {
  constructor() {}

  async getTradeProducts(filters: any = {}) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [],
      message: 'Trade products retrieved successfully'
    };
  }

  async createTradeProduct(userId: number, productData: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: null,
      message: 'Trade product created successfully'
    };
  }
}