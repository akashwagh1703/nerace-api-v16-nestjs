import { Injectable } from '@nestjs/common';
import { createDatabaseConnection } from '../../common/config/database.config';

@Injectable()
export class FarmerService {
  constructor() {}

  async getFarms(farmerId: number) {
    let client;
    try {
      client = await createDatabaseConnection();
      const result = await client.query(`
        SELECT tp.*, c.name as crop_name
        FROM trade_product tp
        LEFT JOIN crop c ON tp.prod_id = c.id
        WHERE tp.user_id = $1 AND tp.is_deleted = false
        ORDER BY tp.created_on DESC
      `, [farmerId]);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: result.rows,
        message: 'Farmer products retrieved successfully'
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
      if (client) await client.end();
    }
  }

  async addProduct(farmerId: number, productData: any) {
    let client;
    try {
      client = await createDatabaseConnection();
      const result = await client.query(`
        INSERT INTO trade_product (user_id, prod_details, sell_qty, sell_qty_unit, price, price_unit, city, state, created_on, is_active, is_deleted)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), true, false)
        RETURNING id
      `, [farmerId, productData.product_name, productData.quantity, productData.unit, productData.price, productData.price_unit, productData.city, productData.state]);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: { id: result.rows[0].id },
        message: 'Product added successfully'
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
      if (client) await client.end();
    }
  }

  async getDashboard(farmerId: number) {
    let client;
    try {
      client = await createDatabaseConnection();
      
      const productsResult = await client.query('SELECT COUNT(*) as total_products FROM trade_product WHERE user_id = $1 AND is_deleted = false', [farmerId]);
      const bidsResult = await client.query('SELECT COUNT(*) as total_bids FROM trade_product_bidding tpb JOIN trade_product tp ON tpb.trade_product_id = tp.id WHERE tp.user_id = $1 AND tpb.is_deleted = false', [farmerId]);
      
      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          total_products: parseInt(productsResult.rows[0].total_products),
          total_bids: parseInt(bidsResult.rows[0].total_bids)
        },
        message: 'Dashboard data retrieved successfully'
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
      if (client) await client.end();
    }
  }
}
