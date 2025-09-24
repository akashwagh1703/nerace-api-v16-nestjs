import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  async getConversations(@Query('user_id') userId: number = 1) {
    return this.chatService.getConversations(userId);
  }

  @Get('messages/:conversationId')
  @ApiOperation({ summary: 'Get messages in conversation' })
  async getMessages(
    @Param('conversationId') conversationId: string,
    @Query('user_id') userId: number = 1
  ) {
    return this.chatService.getMessages(conversationId, userId);
  }

  @Post('send-message')
  @ApiOperation({ summary: 'Send message' })
  async sendMessage(@Body() messageData: any, @Query('user_id') userId: number = 1) {
    return this.chatService.sendMessage(userId, messageData);
  }

  @Post('start-conversation')
  @ApiOperation({ summary: 'Start new conversation' })
  async startConversation(@Body() conversationData: any, @Query('user_id') userId: number = 1) {
    return this.chatService.startConversation(userId, conversationData);
  }

  @Get('online-users')
  @ApiOperation({ summary: 'Get online users' })
  async getOnlineUsers() {
    return this.chatService.getOnlineUsers();
  }
}
