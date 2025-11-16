/* eslint-disable @typescript-eslint/no-var-requires */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

async function ensureSchema() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 5432;
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || 'postgres';
  const database = process.env.DB_NAME || 'entratix';

  const pool = new Pool({
    host,
    port,
    user,
    password,
    database,
    ssl: false,
  });

  const client = await pool.connect();
  try {
    // Create schema 'public' if it doesn't exist and set search_path
    await client.query('CREATE SCHEMA IF NOT EXISTS public;');
    await client.query(
      `ALTER DATABASE "${database}" SET search_path TO public;`
    );
    console.log('[db] Ensured schema "public" exists and search_path is set.');
  } catch (err) {
    console.error('[db] Failed to ensure schema:', err);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

ensureSchema();
