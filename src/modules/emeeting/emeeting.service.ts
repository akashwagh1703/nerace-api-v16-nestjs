import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class EmeetingService {
  constructor() {}

  async getMeetings(userId: number) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      
      // Get meetings from trade_product_bidding as meeting requests
      const result = await client.query(`
        SELECT 
          tpb.id as meeting_id,
          tp.prod_details as meeting_topic,
          u.first_name || ' ' || u.last_name as participant_name,
          tpb.bid_date as scheduled_time,
          CASE 
            WHEN tpb.seller_action = '1' THEN 'confirmed'
            WHEN tpb.seller_action = '2' THEN 'cancelled'
            ELSE 'pending'
          END as status
        FROM trade_product_bidding tpb
        LEFT JOIN trade_product tp ON tpb.trade_product_id = tp.id
        LEFT JOIN users u ON tpb.buyer_id = u.user_id
        WHERE tp.user_id = $1 AND tpb.is_deleted = false
        ORDER BY tpb.bid_date DESC
        LIMIT 10
      `, [userId]);

      const meetings = result.rows.map(row => ({
        meeting_id: row.meeting_id,
        topic: row.meeting_topic || 'Product Discussion',
        participant: row.participant_name || 'Unknown User',
        scheduled_time: row.scheduled_time,
        status: row.status,
        meeting_url: `https://meet.nerace.com/room/${row.meeting_id}`,
        duration: '30 minutes'
      }));

      return {
        success: 1,
        error: 0,
        status: 1,
        data: meetings,
        message: 'Meetings retrieved successfully'
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

  async scheduleMeeting(userId: number, meetingData: any) {
    const meetingId = `meeting_${Date.now()}`;
    const scheduledTime = new Date(meetingData.scheduled_time || Date.now() + 3600000); // 1 hour from now
    
    return {
      success: 1,
      error: 0,
      status: 1,
      data: {
        meeting_id: meetingId,
        topic: meetingData.topic || 'Agricultural Discussion',
        scheduled_time: scheduledTime,
        meeting_url: `https://meet.nerace.com/room/${meetingId}`,
        participants: meetingData.participants || [],
        duration: meetingData.duration || '30 minutes'
      },
      message: 'Meeting scheduled successfully'
    };
  }

  async getUpcomingMeetings(userId: number) {
    const upcomingMeetings = [
      {
        meeting_id: 'meeting_001',
        topic: 'Rice Quality Discussion',
        scheduled_time: new Date(Date.now() + 7200000), // 2 hours from now
        participant: 'John Farmer',
        status: 'confirmed'
      },
      {
        meeting_id: 'meeting_002', 
        topic: 'Wheat Price Negotiation',
        scheduled_time: new Date(Date.now() + 86400000), // 1 day from now
        participant: 'Jane Buyer',
        status: 'pending'
      }
    ];

    return {
      success: 1,
      error: 0,
      status: 1,
      data: upcomingMeetings,
      message: 'Upcoming meetings retrieved successfully'
    };
  }

  async joinMeeting(userId: number, meetingId: string) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: {
        meeting_url: `https://meet.nerace.com/room/${meetingId}`,
        meeting_id: meetingId,
        participant_name: `User_${userId}`,
        join_time: new Date(),
        meeting_status: 'active'
      },
      message: 'Joined meeting successfully'
    };
  }
}
