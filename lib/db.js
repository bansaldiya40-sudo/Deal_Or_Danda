import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';

// Attempt to load .env.local first, then .env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

let cachedClient = null;

export function getDb() {
  if (cachedClient) {
    return cachedClient;
  }

  const databaseUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (process.env.VERCEL && !databaseUrl) {
    console.warn(
      '[Deal or Danda DB Warning] TURSO_DATABASE_URL is not defined in this Vercel deployment. ' +
      'Using a local fallback file will NOT persist across serverless instances. ' +
      'Please configure TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in your Vercel Project Settings.'
    );
  }

  const url = databaseUrl && databaseUrl.trim() !== ''
    ? databaseUrl.trim()
    : 'file:deal_or_danda.db';

  cachedClient = createClient({
    url,
    authToken: authToken?.trim() || undefined,
  });

  return cachedClient;
}

export const db = getDb();
