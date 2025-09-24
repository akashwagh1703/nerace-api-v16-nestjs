import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../common/database/database.service';

@Injectable()
export class MasterService {
  constructor(private databaseService: DatabaseService) {}

  async getStates() {
    try {
      const result = await this.databaseService.executeQuery('SELECT * FROM state LIMIT 10');
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result,
        message: 'States retrieved successfully'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async getDistricts(stateId?: number) {
    try {
      let query = 'SELECT * FROM district';
      const params = [];
      
      if (stateId) {
        query += ' WHERE state_id = $1';
        params.push(stateId);
      }
      
      query += ' ORDER BY name';
      const result = await this.databaseService.executeQuery(query, params);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result,
        message: 'Districts retrieved successfully'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async getCrops(filters: any = {}) {
    try {
      const result = await this.databaseService.executeQuery('SELECT * FROM crop LIMIT 10');
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result,
        message: 'Crops retrieved successfully'
      };
    } catch (error) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: `Error: ${error.message}`
      };
    }
  }

  async getCropVarieties(cropId?: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [
        { id: 1, name: 'Basmati', crop_id: 1 },
        { id: 2, name: 'Sona Masuri', crop_id: 1 }
      ],
      message: 'Crop varieties retrieved successfully'
    };
  }

  async getSoilTypes() {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [
        { id: 1, name: 'Black Soil' },
        { id: 2, name: 'Red Soil' }
      ],
      message: 'Soil types retrieved successfully'
    };
  }

  async getIrrigationTypes() {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [
        { id: 1, name: 'Drip Irrigation' },
        { id: 2, name: 'Sprinkler Irrigation' }
      ],
      message: 'Irrigation types retrieved successfully'
    };
  }

  async getAllMasterData() {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: {
        states: [{ id: 1, name: 'Maharashtra' }],
        districts: [{ id: 1, name: 'Pune' }],
        crops: [{ id: 1, name: 'Rice' }]
      },
      message: 'Master data retrieved successfully'
    };
  }
}