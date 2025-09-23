import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class NotificationService {
  constructor(private commonService: CommonService) {}

  async getNotifications(userId: number) {
    return this.commonService.successResponse([], 'Notifications retrieved successfully');
  }

  async markAsRead(userId: number, notificationId: number) {
    return this.commonService.successResponse(null, 'Notification marked as read');
  }
}