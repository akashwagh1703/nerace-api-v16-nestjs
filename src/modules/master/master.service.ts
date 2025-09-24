import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class MasterService {
  constructor() {}

  async getStates() {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      const result = await client.query('SELECT * FROM state LIMIT 10');
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
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
    } finally {
      await client.end();
    }
  }

  async getDistricts(stateId?: number) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      let query = 'SELECT * FROM district';
      const params = [];
      
      if (stateId) {
        query += ' WHERE state_id = $1';
        params.push(stateId);
      }
      
      query += ' ORDER BY name';
      const result = await client.query(query, params);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
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
    } finally {
      await client.end();
    }
  }

  async getCrops(filters: any = {}) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      const result = await client.query('SELECT * FROM crop LIMIT 10');
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
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
    } finally {
      await client.end();
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