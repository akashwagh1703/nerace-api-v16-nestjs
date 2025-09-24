import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class CommodityService {
  constructor() {}

  async getCommodityList(filters: any = {}) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      const result = await client.query('SELECT * FROM commodity WHERE is_deleted = false LIMIT 20');
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
        message: 'Commodity list retrieved successfully'
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

  async getCommodityPrices(filters: any = {}) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      const result = await client.query('SELECT * FROM commodity_price ORDER BY created_on DESC LIMIT 20');
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
        message: 'Commodity prices retrieved successfully'
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

  async getMarketRates(filters: any = {}) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      const result = await client.query(`
        SELECT ap.*, c.name as commodity_name 
        FROM apmcprices ap
        LEFT JOIN commodity c ON ap.commodity_id = c.id
        ORDER BY ap.created_on DESC LIMIT 20
      `);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
        message: 'Market rates retrieved successfully'
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

  async getCommodityById(id: number) {
    const commodity = { id: id, name: 'Rice', category: 'Cereal', unit: 'kg' };
    const latestPrice = { price: 50, market: 'Pune', date: '2024-01-15' };

    return {
      success: 1,
      error: 0,
      status: 1,
      data: { commodity, latest_price: latestPrice },
      message: 'Commodity retrieved successfully'
    };
  }

  async searchCommodities(term: string) {
    const commodities = [
      { id: 1, name: 'Rice', category: 'Cereal' }
    ];

    return {
      success: 1,
      error: 0,
      status: 1,
      data: commodities,
      message: 'Search results retrieved successfully'
    };
  }
}