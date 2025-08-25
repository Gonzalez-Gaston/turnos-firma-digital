import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
  private static pool: Pool;

  static initialize(): void {
    if (!this.pool) {
      console.log('Initializing database connection with:', {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER
      });

      this.pool = new Pool({
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
        ssl: false
      });

      this.pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
      });
    }
  }

  static async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  static async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  static async close(): Promise<void> {
    if (this.pool) {
      await this.pool.end();
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      if (!this.pool) {
        console.error('Database pool not initialized');
        return false;
      }
      const result = await this.query('SELECT NOW()');
      console.log('✅ Database connection test successful:', result.rows[0]);
      return !!result;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

 

  static async checkTableExists(): Promise<boolean> {
    try {
      const result = await this.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = 'turnos'
        );
      `);
      const exists = result.rows[0].exists;
      console.log('📋 Table "turnos" exists:', exists);
      return exists;
    } catch (error) {
      console.error('❌ Error checking table existence:', error);
      return false;
    }
  }

  static async getTurnosCount(): Promise<number> {
    try {
      const result = await this.query('SELECT COUNT(*) as count FROM turnos');
      const count = parseInt(result.rows[0].count);
      console.log('📊 Total turnos in database:', count);
      return count;
    } catch (error) {
      console.error('❌ Error getting turnos count:', error);
      return 0;
    }
  }
}