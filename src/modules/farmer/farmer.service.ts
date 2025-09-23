import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class FarmerService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    private commonService: CommonService,
  ) {}

  async getFarms(farmerId: number) {
    const farms = await this.farmRepository.find({
      where: { farmer_id: farmerId, is_deleted: false }
    });

    return this.commonService.successResponse(farms, 'Farms retrieved successfully');
  }

  async addFarm(farmerId: number, farmData: any) {
    const farm = this.farmRepository.create({
      ...farmData,
      farmer_id: farmerId,
      created_by_id: farmerId
    });

    const savedFarm = await this.farmRepository.save(farm);
    return this.commonService.successResponse(savedFarm, 'Farm added successfully');
  }
}