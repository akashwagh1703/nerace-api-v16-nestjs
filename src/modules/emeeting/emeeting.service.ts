import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class EmeetingService {
  constructor(private commonService: CommonService) {}

  async getMeetings(userId: number) {
    return this.commonService.successResponse([], 'Meetings retrieved successfully');
  }

  async scheduleMeeting(userId: number, meetingData: any) {
    return this.commonService.successResponse(null, 'Meeting scheduled successfully');
  }
}