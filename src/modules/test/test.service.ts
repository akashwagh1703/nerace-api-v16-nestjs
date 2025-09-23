import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TestService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async testDatabaseConnection() {
    try {
      const result = await this.dataSource.query('SELECT NOW() as current_time');
      const options = this.dataSource.options as any;
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