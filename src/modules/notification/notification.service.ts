import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  constructor() {}

  async getNotifications(userId: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [],
      message: 'Notifications retrieved successfully'
    };
  }

  async markAsRead(userId: number, notificationId: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: null,
      message: 'Notification marked as read'
    };
  }
}
