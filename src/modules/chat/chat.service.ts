import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class ChatService {
  constructor(private commonService: CommonService) {}

  async getConversations(userId: number) {
    return this.commonService.successResponse([], 'Conversations retrieved successfully');
  }

  async sendMessage(userId: number, messageData: any) {
    return this.commonService.successResponse(null, 'Message sent successfully');
  }
}