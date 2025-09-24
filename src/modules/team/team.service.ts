import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamService {
  constructor() {}

  async getTeamMembers(userId: number) {
    return {
      success: 1,
      error: 0,
      status: 1,
      data: [],
      message: 'Team members retrieved successfully'
    };
  }
}