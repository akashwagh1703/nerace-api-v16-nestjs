import { Injectable } from '@nestjs/common';

@Injectable()
export class VendorService {
  constructor() {}

  async getVendorProducts(vendorId: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [],
      message: 'Vendor products retrieved successfully'
    };
  }
}