import { Injectable } from '@nestjs/common';
import { executeQuery } from '../config/database.config';

@Injectable()
export class DatabaseService {
  async executeQuery(query: string, params: any[] = []): Promise<any[]> {
    return executeQuery(query, params);
  }
}