import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeProduct } from './entities/trade-product.entity';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(TradeProduct)
    private tradeProductRepository: Repository<TradeProduct>,
    private commonService: CommonService,
  ) {}

  async getTradeProducts(filters: any = {}) {
    const queryBuilder = this.tradeProductRepository
      .createQueryBuilder('tp')
      .leftJoinAndSelect('tp.seller', 'seller')
      .where('tp.is_deleted = :isDeleted', { isDeleted: false })
      .andWhere('tp.status = :status', { status: 'active' });

    // Apply filters
    if (filters.crop_id) {
      queryBuilder.andWhere('tp.crop_id = :cropId', { cropId: filters.crop_id });
    }

    if (filters.location) {
      queryBuilder.andWhere('tp.location ILIKE :location', { 
        location: `%${filters.location}%` 
      });
    }

    if (filters.min_price) {
      queryBuilder.andWhere('tp.price_per_unit >= :minPrice', { 
        minPrice: filters.min_price 
      });
    }

    if (filters.max_price) {
      queryBuilder.andWhere('tp.price_per_unit <= :maxPrice', { 
        maxPrice: filters.max_price 
      });
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    queryBuilder.skip(offset).take(limit);
    queryBuilder.orderBy('tp.created_on', 'DESC');

    const [products, total] = await queryBuilder.getManyAndCount();

    return this.commonService.successResponse({
      products,
      pagination: {
        current_page: page,
        total_pages: Math.ceil(total / limit),
        total_records: total,
        per_page: limit
      }
    }, 'Trade products retrieved successfully');
  }

  async getTradeProductById(id: number) {
    const product = await this.tradeProductRepository
      .createQueryBuilder('tp')
      .leftJoinAndSelect('tp.seller', 'seller')
      .where('tp.id = :id', { id })
      .andWhere('tp.is_deleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (!product) {
      throw new NotFoundException('Trade product not found');
    }

    return this.commonService.successResponse(product, 'Trade product retrieved successfully');
  }

  async showInterest(buyerId: number, productId: number) {
    const product = await this.tradeProductRepository.findOne({
      where: { id: productId, is_deleted: false }
    });

    if (!product) {
      throw new NotFoundException('Trade product not found');
    }

    // Logic to record interest
    // This would typically involve creating an interest record

    return this.commonService.successResponse(
      null, 
      'Interest shown successfully'
    );
  }

  async placeBid(buyerId: number, productId: number, bidData: any) {
    const product = await this.tradeProductRepository.findOne({
      where: { id: productId, is_deleted: false }
    });

    if (!product) {
      throw new NotFoundException('Trade product not found');
    }

    // Logic to place bid
    // This would typically involve creating a bid record

    return this.commonService.successResponse(
      null, 
      'Bid placed successfully'
    );
  }

  async getBuyerStats(buyerId: number) {
    // Get buyer statistics
    const stats = {
      total_purchases: 0,
      total_bids: 0,
      active_interests: 0,
      completed_transactions: 0
    };

    return this.commonService.successResponse(stats, 'Buyer statistics retrieved successfully');
  }

  async getBuyerOrders(buyerId: number, filters: any = {}) {
    // Get buyer orders with pagination
    const orders = [];
    
    return this.commonService.successResponse({
      orders,
      pagination: {
        current_page: 1,
        total_pages: 1,
        total_records: 0,
        per_page: 10
      }
    }, 'Buyer orders retrieved successfully');
  }

  async rateSeller(buyerId: number, sellerId: number, ratingData: any) {
    // Logic to rate seller
    return this.commonService.successResponse(
      null, 
      'Rating submitted successfully'
    );
  }
}