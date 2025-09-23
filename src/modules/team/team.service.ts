import { Injectable } from '@nestjs/common';
import { CommonService } from '../../common/helpers/common.service';

@Injectable()
export class TeamService {
  constructor(private commonService: CommonService) {}

  async getTeamMembers(userId: number) {
    return this.commonService.successResponse([], 'Team members retrieved successfully');
  }
}