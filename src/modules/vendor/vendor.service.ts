import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class VendorService {
  constructor(private commonService: CommonService) {}

  async getVendorProducts(userId: number) {
    return this.commonService.successResponse([], 'Vendor products retrieved successfully');
  }
}