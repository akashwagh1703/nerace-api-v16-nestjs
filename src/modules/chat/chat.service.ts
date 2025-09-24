import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class ChatService {
  constructor() {}

  async getConversations(userId: number) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      
      // Get conversations from chat_conversations table
      const result = await client.query(`
        SELECT 
          cc.id as conversation_id,
          cc.topic,
          CASE 
            WHEN cc.user1_id = $1 THEN u2.first_name || ' ' || u2.last_name
            ELSE u1.first_name || ' ' || u1.last_name
          END as participant_name,
          CASE 
            WHEN cc.user1_id = $1 THEN cc.user2_id
            ELSE cc.user1_id
          END as participant_id,
          cc.created_on as last_message_time,
          CASE WHEN cc.is_active THEN 'Active' ELSE 'Inactive' END as status,
          (
            SELECT COUNT(*) 
            FROM chat_messages cm 
            WHERE cm.conversation_id = cc.id AND cm.sender_id != $1 AND cm.is_deleted = false
          ) as unread_count
        FROM chat_conversations cc
        LEFT JOIN users u1 ON cc.user1_id = u1.user_id
        LEFT JOIN users u2 ON cc.user2_id = u2.user_id
        WHERE (cc.user1_id = $1 OR cc.user2_id = $1) AND cc.is_active = true
        ORDER BY cc.created_on DESC
        LIMIT 10
      `, [userId]);

      const conversations = result.rows.map(row => ({
        conversation_id: row.conversation_id,
        topic: row.topic || 'General Discussion',
        participant_name: row.participant_name || 'Unknown User',
        participant_id: row.participant_id,
        last_message_time: row.last_message_time,
        status: row.status,
        unread_count: parseInt(row.unread_count) || 0
      }));

      return {
        success: 1,
        error: 0,
        status: 1,
        data: conversations,
        message: 'Conversations retrieved successfully'
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

  async getMessages(conversationId: string, userId: number) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      
      // Get messages from chat_messages table
      const result = await client.query(`
        SELECT 
          cm.id as message_id,
          cm.sender_id,
          u.first_name || ' ' || u.last_name as sender_name,
          cm.message,
          cm.created_on as timestamp,
          cm.message_type
        FROM chat_messages cm
        LEFT JOIN users u ON cm.sender_id = u.user_id
        WHERE cm.conversation_id = $1 AND cm.is_deleted = false
        ORDER BY cm.created_on ASC
        LIMIT 50
      `, [conversationId]);

      const messages = result.rows.map(row => ({
        message_id: row.message_id,
        sender_id: row.sender_id,
        sender_name: row.sender_id == userId ? 'You' : (row.sender_name || 'Unknown User'),
        message: row.message,
        timestamp: row.timestamp,
        message_type: row.message_type || 'text'
      }));

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          conversation_id: conversationId,
          messages: messages
        },
        message: 'Messages retrieved successfully'
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

  async sendMessage(userId: number, messageData: any) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      
      // Insert message into chat_messages table
      const result = await client.query(`
        INSERT INTO chat_messages (conversation_id, sender_id, message, message_type, created_on, is_deleted)
        VALUES ($1, $2, $3, $4, NOW(), false)
        RETURNING id, created_on
      `, [messageData.conversation_id, userId, messageData.message, messageData.message_type || 'text']);

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          message_id: result.rows[0].id,
          sender_id: userId,
          conversation_id: messageData.conversation_id,
          message: messageData.message,
          timestamp: result.rows[0].created_on,
          message_type: messageData.message_type || 'text',
          delivery_status: 'sent'
        },
        message: 'Message sent successfully'
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

  async startConversation(userId: number, conversationData: any) {
    const client = new Client({
      host: '10.48.36.100',
      port: 5432,
      user: 'postgres',
      password: 'Supp0rt@123',
      database: 'nerace',
    });

    try {
      await client.connect();
      
      // Check if conversation already exists
      const existingResult = await client.query(`
        SELECT id FROM chat_conversations 
        WHERE ((user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)) 
        AND is_active = true
      `, [userId, conversationData.participant_id]);

      if (existingResult.rows.length > 0) {
        return {
          success: 1,
          error: 0,
          status: 1,
          data: {
            conversation_id: existingResult.rows[0].id,
            message: 'Existing conversation found'
          },
          message: 'Conversation already exists'
        };
      }

      // Create new conversation
      const result = await client.query(`
        INSERT INTO chat_conversations (user1_id, user2_id, topic, created_on, is_active)
        VALUES ($1, $2, $3, NOW(), true)
        RETURNING id, created_on
      `, [userId, conversationData.participant_id, conversationData.topic || 'New Conversation']);

      return {
        success: 1,
        error: 0,
        status: 1,
        data: {
          conversation_id: result.rows[0].id,
          participants: [userId, conversationData.participant_id],
          topic: conversationData.topic || 'New Conversation',
          created_time: result.rows[0].created_on,
          status: 'active'
        },
        message: 'Conversation started successfully'
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

  async getOnlineUsers() {
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
        SELECT user_id, first_name, last_name, is_online
        FROM users 
        WHERE is_login = true AND is_deleted = false
        ORDER BY last_login DESC
        LIMIT 20
      `);

      const onlineUsers = result.rows.map(row => ({
        user_id: row.user_id,
        name: `${row.first_name || 'User'} ${row.last_name || ''}`.trim(),
        status: 'online',
        last_seen: new Date()
      }));

      return {
        success: 1,
        error: 0,
        status: 1,
        data: onlineUsers,
        message: 'Online users retrieved successfully'
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
}