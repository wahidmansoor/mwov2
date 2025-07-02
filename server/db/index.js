import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required for Supabase connection');
}

// Create PostgreSQL connection
const connectionString = process.env.DATABASE_URL;
console.log('🔗 Connecting to Supabase PostgreSQL database...');

// Configure connection
const client = postgres(connectionString, {
  ssl: 'require',
  max: 20,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create drizzle instance
export const db = drizzle(client);

// Test database connection
export async function testConnection() {
  try {
    await client`SELECT 1`;
    console.log('✅ Supabase database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase database connection failed:', error.message);
    return false;
  }
}

// Run migrations
export async function runMigrations() {
  try {
    const migrationsFolder = path.join(__dirname, '../drizzle');
    if (fs.existsSync(migrationsFolder)) {
      console.log('🔄 Running database migrations...');
      await migrate(db, { migrationsFolder });
      console.log('✅ Database migrations completed');
    } else {
      console.log('ℹ️ No migrations folder found, skipping migrations');
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Graceful shutdown
export async function closeConnection() {
  try {
    await client.end();
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
}

export default db;
