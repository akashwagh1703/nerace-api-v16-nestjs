import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmeetingService } from './emeeting.service';
import { AuthGuard } from '../../common/auth/auth.guard';

@ApiTags('E-Meeting')
@Controller('emeeting')
export class EmeetingController {
  constructor(private readonly emeetingService: EmeetingService) {}

  @Get('meetings')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user meetings' })
  async getMeetings(@Request() req) {
    return this.emeetingService.getMeetings(req.user.user_id);
  }

  @Post('schedule')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Schedule meeting' })
  async scheduleMeeting(@Request() req, @Body() meetingData: any) {
    return this.emeetingService.scheduleMeeting(req.user.user_id, meetingData);
  }
}