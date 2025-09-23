import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commodity } from './entities/commodity.entity';
import { CommodityPrice } from './entities/commodity-price.entity';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class CommodityService {
  constructor(
    @InjectRepository(Commodity)
    private commodityRepository: Repository<Commodity>,
    @InjectRepository(CommodityPrice)
    private commodityPriceRepository: Repository<CommodityPrice>,
    private commonService: CommonService,
  ) {}

  async getCommodityList(filters: any = {}) {
    const queryBuilder = this.commodityRepository
      .createQueryBuilder('c')
      .where('c.is_deleted = :isDeleted', { isDeleted: false })
      .andWhere('c.is_active = :isActive', { isActive: true });

    if (filters.category) {
      queryBuilder.andWhere('c.category = :category', { category: filters.category });
    }

    if (filters.search) {
      queryBuilder.andWhere('c.name ILIKE :search', { search: `%${filters.search}%` });
    }

    const commodities = await queryBuilder.getMany();

    return this.commonService.successResponse(
      commodities,
      'Commodity list retrieved successfully'
    );
  }

  async getCommodityPrices(filters: any = {}) {
    const queryBuilder = this.commodityPriceRepository
      .createQueryBuilder('cp')
      .leftJoinAndSelect('cp.commodity', 'commodity')
      .where('cp.is_deleted = :isDeleted', { isDeleted: false });

    if (filters.commodity_id) {
      queryBuilder.andWhere('cp.commodity_id = :commodityId', { 
        commodityId: filters.commodity_id 
      });
    }

    if (filters.market) {
      queryBuilder.andWhere('cp.market = :market', { market: filters.market });
    }

    if (filters.date) {
      queryBuilder.andWhere('DATE(cp.price_date) = :date', { date: filters.date });
    }

    queryBuilder.orderBy('cp.price_date', 'DESC');

    const prices = await queryBuilder.getMany();

    return this.commonService.successResponse(
      prices,
      'Commodity prices retrieved successfully'
    );
  }

  async getMarketRates(filters: any = {}) {
    // Get latest market rates for all commodities
    const rates = await this.commodityPriceRepository
      .createQueryBuilder('cp')
      .leftJoinAndSelect('cp.commodity', 'commodity')
      .where('cp.is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('cp.price_date', 'DESC')
      .getMany();

    return this.commonService.successResponse(
      rates,
      'Market rates retrieved successfully'
    );
  }

  async getCommodityById(id: number) {
    const commodity = await this.commodityRepository.findOne({
      where: { id, is_deleted: false }
    });

    if (!commodity) {
      return this.commonService.errorResponse('Commodity not found');
    }

    // Get latest price for this commodity
    const latestPrice = await this.commodityPriceRepository.findOne({
      where: { commodity_id: id, is_deleted: false },
      order: { price_date: 'DESC' }
    });

    return this.commonService.successResponse(
      { commodity, latest_price: latestPrice },
      'Commodity retrieved successfully'
    );
  }

  async searchCommodities(term: string) {
    const commodities = await this.commodityRepository
      .createQueryBuilder('c')
      .where('c.name ILIKE :term', { term: `%${term}%` })
      .andWhere('c.is_deleted = :isDeleted', { isDeleted: false })
      .andWhere('c.is_active = :isActive', { isActive: true })
      .getMany();

    return this.commonService.successResponse(
      commodities,
      'Search results retrieved successfully'
    );
  }
}