import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EmeetingService } from './emeeting.service';

@ApiTags('E-Meeting')
@Controller('emeeting')
export class EmeetingController {
  constructor(private readonly emeetingService: EmeetingService) {}

  @Get('meetings')
  @ApiOperation({ summary: 'Get user meetings' })
  async getMeetings(@Query('user_id') userId: number = 1) {
    return this.emeetingService.getMeetings(userId);
  }

  @Post('schedule')
  @ApiOperation({ summary: 'Schedule meeting' })
  async scheduleMeeting(@Body() meetingData: any, @Query('user_id') userId: number = 1) {
    return this.emeetingService.scheduleMeeting(userId, meetingData);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming meetings' })
  async getUpcomingMeetings(@Query('user_id') userId: number = 1) {
    return this.emeetingService.getUpcomingMeetings(userId);
  }

  @Post('join/:meetingId')
  @ApiOperation({ summary: 'Join meeting' })
  async joinMeeting(@Query('user_id') userId: number = 1, @Query('meeting_id') meetingId: string) {
    return this.emeetingService.joinMeeting(userId, meetingId);
  }
}
