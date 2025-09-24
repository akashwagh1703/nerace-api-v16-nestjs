import { Injectable } from '@nestjs/common';
import { executeQuery, getDatabaseConfig } from '../../common/config/database.config';

@Injectable()
export class TestService {
  constructor() {}

  async testDatabaseConnection() {
    try {
      const result = await executeQuery('SELECT NOW() as current_time');
      const options = getDatabaseConfig();
      return {
        status: 'Connected',
        database: options.database,
        host: options.host,
        current_time: result[0].current_time,
      };
    } catch (error) {
      return {
        status: 'Failed',
        error: error.message,
      };
    }
  }
}
