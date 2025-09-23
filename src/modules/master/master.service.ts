import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './entities/state.entity';
import { District } from './entities/district.entity';
import { Crop } from './entities/crop.entity';
import { CropVariety } from './entities/crop-variety.entity';
import { SoilType } from './entities/soil-type.entity';
import { IrrigationType } from './entities/irrigation-type.entity';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Crop)
    private cropRepository: Repository<Crop>,
    @InjectRepository(CropVariety)
    private cropVarietyRepository: Repository<CropVariety>,
    @InjectRepository(SoilType)
    private soilTypeRepository: Repository<SoilType>,
    @InjectRepository(IrrigationType)
    private irrigationTypeRepository: Repository<IrrigationType>,
    private commonService: CommonService,
  ) {}

  async getStates() {
    const states = await this.stateRepository.find({
      where: { is_active: true, is_deleted: false },
      order: { name: 'ASC' }
    });

    return this.commonService.successResponse(states, 'States retrieved successfully');
  }

  async getDistricts(stateId?: number) {
    const queryBuilder = this.districtRepository
      .createQueryBuilder('d')
      .where('d.is_active = :isActive', { isActive: true })
      .andWhere('d.is_deleted = :isDeleted', { isDeleted: false });

    if (stateId) {
      queryBuilder.andWhere('d.state_id = :stateId', { stateId });
    }

    queryBuilder.orderBy('d.name', 'ASC');

    const districts = await queryBuilder.getMany();

    return this.commonService.successResponse(districts, 'Districts retrieved successfully');
  }

  async getCrops(filters: any = {}) {
    const queryBuilder = this.cropRepository
      .createQueryBuilder('c')
      .where('c.is_active = :isActive', { isActive: true })
      .andWhere('c.is_deleted = :isDeleted', { isDeleted: false });

    if (filters.category) {
      queryBuilder.andWhere('c.category = :category', { category: filters.category });
    }

    if (filters.season) {
      queryBuilder.andWhere('c.season = :season', { season: filters.season });
    }

    queryBuilder.orderBy('c.name', 'ASC');

    const crops = await queryBuilder.getMany();

    return this.commonService.successResponse(crops, 'Crops retrieved successfully');
  }

  async getCropVarieties(cropId?: number) {
    const queryBuilder = this.cropVarietyRepository
      .createQueryBuilder('cv')
      .leftJoinAndSelect('cv.crop', 'crop')
      .where('cv.is_active = :isActive', { isActive: true })
      .andWhere('cv.is_deleted = :isDeleted', { isDeleted: false });

    if (cropId) {
      queryBuilder.andWhere('cv.crop_id = :cropId', { cropId });
    }

    queryBuilder.orderBy('cv.name', 'ASC');

    const varieties = await queryBuilder.getMany();

    return this.commonService.successResponse(varieties, 'Crop varieties retrieved successfully');
  }

  async getSoilTypes() {
    const soilTypes = await this.soilTypeRepository.find({
      where: { is_active: true, is_deleted: false },
      order: { name: 'ASC' }
    });

    return this.commonService.successResponse(soilTypes, 'Soil types retrieved successfully');
  }

  async getIrrigationTypes() {
    const irrigationTypes = await this.irrigationTypeRepository.find({
      where: { is_active: true, is_deleted: false },
      order: { name: 'ASC' }
    });

    return this.commonService.successResponse(irrigationTypes, 'Irrigation types retrieved successfully');
  }

  async getAllMasterData() {
    const [states, crops, soilTypes, irrigationTypes] = await Promise.all([
      this.stateRepository.find({
        where: { is_active: true, is_deleted: false },
        order: { name: 'ASC' }
      }),
      this.cropRepository.find({
        where: { is_active: true, is_deleted: false },
        order: { name: 'ASC' }
      }),
      this.soilTypeRepository.find({
        where: { is_active: true, is_deleted: false },
        order: { name: 'ASC' }
      }),
      this.irrigationTypeRepository.find({
        where: { is_active: true, is_deleted: false },
        order: { name: 'ASC' }
      })
    ]);

    const masterData = {
      states,
      crops,
      soil_types: soilTypes,
      irrigation_types: irrigationTypes
    };

    return this.commonService.successResponse(masterData, 'Master data retrieved successfully');
  }
}