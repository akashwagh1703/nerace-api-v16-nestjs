import { Client } from 'pg';

export const getDatabaseConfig = () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'nerace',
});

export const createDatabaseConnection = async (): Promise<Client> => {
  const client = new Client(getDatabaseConfig());
  await client.connect();
  return client;
};

export const executeQuery = async (query: string, params: any[] = []): Promise<any[]> => {
  const client = await createDatabaseConnection();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    await client.end();
  }
};