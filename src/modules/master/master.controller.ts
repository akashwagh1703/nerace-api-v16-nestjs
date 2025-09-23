import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MasterService } from './master.service';

@ApiTags('Master Data')
@Controller('master')
export class MasterController {
  constructor(private readonly masterService: MasterService) {}

  @Get('states')
  @ApiOperation({ summary: 'Get all states' })
  async getStates() {
    return this.masterService.getStates();
  }

  @Get('districts')
  @ApiOperation({ summary: 'Get districts by state' })
  async getDistricts(@Query('state_id') stateId?: number) {
    return this.masterService.getDistricts(stateId);
  }

  @Get('crops')
  @ApiOperation({ summary: 'Get all crops' })
  async getCrops(@Query() filters: any) {
    return this.masterService.getCrops(filters);
  }

  @Get('crop-varieties')
  @ApiOperation({ summary: 'Get crop varieties' })
  async getCropVarieties(@Query('crop_id') cropId?: number) {
    return this.masterService.getCropVarieties(cropId);
  }

  @Get('soil-types')
  @ApiOperation({ summary: 'Get all soil types' })
  async getSoilTypes() {
    return this.masterService.getSoilTypes();
  }

  @Get('irrigation-types')
  @ApiOperation({ summary: 'Get all irrigation types' })
  async getIrrigationTypes() {
    return this.masterService.getIrrigationTypes();
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all master data' })
  async getAllMasterData() {
    return this.masterService.getAllMasterData();
  }
}