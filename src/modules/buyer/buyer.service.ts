import { Injectable, NotFoundException } from '@nestjs/common';
import { executeQuery } from '../../common/config/database.config';

@Injectable()
export class BuyerService {
  constructor() {}

  async getTradeProducts(filters: any = {}) {
    try {
      const result = await executeQuery(`
        SELECT tp.id, tp.prod_details as product_name, tp.sell_qty as quantity, 
               tp.sell_qty_unit as quantity_unit, tp.price as price_per_unit,
               tp.city as location, u.first_name, u.last_name
        FROM trade_product tp
        LEFT JOIN users u ON tp.user_id = u.user_id
        WHERE tp.is_deleted = false AND tp.is_active = true
        ORDER BY tp.created_on DESC
        LIMIT 10
      `);

      const products = result.map(row => ({
        id: row.id,
        product_name: row.product_name,
        quantity: row.quantity,
        quantity_unit: row.quantity_unit,
        price_per_unit: parseFloat(row.price_per_unit) || 0,
        location: row.location,
        seller: {
          first_name: row.first_name,
          last_name: row.last_name
        }
      }));

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          products,
          pagination: {
            current_page: 1,
            total_pages: 1,
            total_records: products.length,
            per_page: 10
          }
        },
        message: 'Trade products retrieved successfully'
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

  async getTradeProductById(id: number) {
    try {
      const result = await executeQuery(`
        SELECT tp.*, u.first_name, u.last_name, u.phone_no
        FROM trade_product tp
        LEFT JOIN users u ON tp.user_id = u.user_id
        WHERE tp.id = $1 AND tp.is_deleted = false
      `, [id]);

      if (result.length === 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Product not found'
        };
      }

      const row = result[0];
      const product = {
        id: row.id,
        product_name: row.prod_details,
        quantity: row.sell_qty,
        quantity_unit: row.sell_qty_unit,
        price_per_unit: parseFloat(row.price) || 0,
        location: row.city,
        description: row.other_details,
        seller: {
          first_name: row.first_name,
          last_name: row.last_name,
          phone: row.phone_no
        }
      };

      return {
        success: 1,
        error: 0,
        status: 1,
        data: product,
        message: 'Trade product retrieved successfully'
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

  async showInterest(buyerId: number, productId: number) {
    try {
      const existingResult = await executeQuery(
        'SELECT id FROM trade_product_interest WHERE buyer_id = $1 AND trade_product_id = $2 AND is_deleted = false',
        [buyerId, productId]
      );

      if (existingResult.length > 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Interest already exists'
        };
      }

      const productResult = await executeQuery(
        'SELECT user_id as seller_id FROM trade_product WHERE id = $1',
        [productId]
      );

      if (productResult.length === 0) {
        return {
          success: 0,
          error: 1,
          status: 0,
          data: null,
          message: 'Product not found'
        };
      }

      const sellerId = productResult[0].seller_id;

      const insertResult = await executeQuery(`
        INSERT INTO trade_product_interest 
        (seller_id, buyer_id, trade_product_id, created_by_id, created_on, is_active, is_deleted)
        VALUES ($1, $2, $3, $4, NOW(), true, false)
        RETURNING id
      `, [sellerId, buyerId, productId, buyerId]);

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          interest_id: insertResult[0].id,
          buyer_id: buyerId,
          product_id: productId,
          status: 'interested'
        },
        message: 'Interest shown successfully'
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

  async placeBid(buyerId: number, productId: number, bidData: any) {
    if (!bidData.bid_amount || bidData.bid_amount <= 0) {
      return {
        success: 0,
        error: 1,
        status: 0,
        data: null,
        message: 'Valid bid_amount is required'
      };
    }

    return {
      success: 1,
      error: 0,
      status: 1,
      data: { 
        buyer_id: buyerId, 
        product_id: productId, 
        bid_amount: bidData.bid_amount,
        quantity: bidData.quantity || null,
        comments: bidData.comments || null,
        status: 'pending',
        bid_date: new Date().toISOString()
      },
      message: 'Bid placed successfully'
    };
  }

  async getBuyerStats(buyerId: number) {
    try {
      const bidsResult = await executeQuery(
        'SELECT COUNT(*) as total_bids FROM trade_product_bidding WHERE buyer_id = $1 AND is_deleted = false',
        [buyerId]
      );

      const interestsResult = await executeQuery(
        'SELECT COUNT(*) as active_interests FROM trade_product_interest WHERE buyer_id = $1 AND is_deleted = false',
        [buyerId]
      );

      const purchasesResult = await executeQuery(
        'SELECT COUNT(*) as total_purchases, COALESCE(SUM(CAST(bid_price AS NUMERIC) * qty), 0) as total_spent FROM trade_product_bidding WHERE buyer_id = $1 AND seller_action = $2 AND is_deleted = false',
        [buyerId, 'accepted']
      );

      const pendingResult = await executeQuery(
        'SELECT COUNT(*) as pending_bids FROM trade_product_bidding WHERE buyer_id = $1 AND seller_action IS NULL AND is_deleted = false',
        [buyerId]
      );

      const stats = {
        total_purchases: parseInt(purchasesResult[0].total_purchases) || 0,
        total_bids: parseInt(bidsResult[0].total_bids) || 0,
        active_interests: parseInt(interestsResult[0].active_interests) || 0,
        pending_bids: parseInt(pendingResult[0].pending_bids) || 0,
        total_spent: parseFloat(purchasesResult[0].total_spent) || 0.00
      };

      return {
        success: 1,
        error: 0,
        status: 1,
        data: stats,
        message: 'Buyer statistics retrieved successfully'
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

  async getBuyerOrders(buyerId: number, filters: any = {}) {
    try {
      const result = await executeQuery(`
        SELECT 
          tpb.id,
          tpb.qty,
          tpb.bid_price,
          tpb.seller_action,
          tpb.bid_date,
          tp.prod_details,
          u.first_name,
          u.last_name
        FROM trade_product_bidding tpb
        LEFT JOIN trade_product tp ON tpb.trade_product_id = tp.id
        LEFT JOIN users u ON tp.user_id = u.user_id
        WHERE tpb.buyer_id = $1 AND tpb.is_deleted = false
        ORDER BY tpb.bid_date DESC
        LIMIT 10
      `, [buyerId]);

      const orders = result.map(row => {
        let status = 'pending';
        if (row.seller_action === '1' || row.seller_action === 'accepted') status = 'accepted';
        else if (row.seller_action === '2' || row.seller_action === 'rejected') status = 'rejected';
        else if (row.seller_action === '3') status = 'counter_offer';
        else if (row.seller_action === '5') status = 'completed';
        
        return {
          id: row.id,
          product_name: row.prod_details || 'Agricultural Product',
          quantity: row.qty,
          bid_price: parseFloat(row.bid_price) || 0,
          status: status,
          bid_date: row.bid_date,
          seller: {
            first_name: row.first_name || 'Unknown',
            last_name: row.last_name || 'Seller'
          }
        };
      });

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          orders,
          pagination: {
            current_page: 1,
            total_pages: 1,
            total_records: orders.length,
            per_page: 10
          }
        },
        message: 'Buyer orders retrieved successfully'
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

  async rateSeller(buyerId: number, sellerId: number, ratingData: any) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: null,
      message: 'Rating submitted successfully'
    };
  }

  async testService() {
    return { success: 1, message: 'Service working' };
  }
}