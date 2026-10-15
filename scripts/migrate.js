// scripts/migrate.js
// Automated database migration runner for Deal or Danda using @libsql/client
import { createClient } from '@libsql/client';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables
const envLocalPath = path.join(rootDir, '.env.local');
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

async function runMigrations() {
  const databaseUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  const url = databaseUrl && databaseUrl.trim() !== ''
    ? databaseUrl.trim()
    : 'file:deal_or_danda.db';

  console.log(`[Migration] Connecting to database: ${url.startsWith('file:') ? url : 'Turso Cloud (' + url + ')'}`);

  const client = createClient({
    url,
    authToken: authToken?.trim() || undefined,
  });

  try {
    // 1. Ensure migrations tracking table exists
    await client.execute(`
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        applied_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
      );
    `);

    // 2. Fetch already-applied migrations
    const appliedResult = await client.execute('SELECT name FROM _migrations ORDER BY id ASC;');
    const appliedNames = new Set(appliedResult.rows.map(row => String(row.name)));

    // 3. Read migration files from migrations/ directory
    const migrationsDir = path.join(rootDir, 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log('[Migration] No migrations directory found. Nothing to apply.');
      return;
    }

    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      console.log('[Migration] No SQL migration files found in migrations/ directory.');
      return;
    }

    let appliedCount = 0;

    for (const file of files) {
      if (appliedNames.has(file)) {
        console.log(`[Migration] Skipping ${file} (already applied)`);
        continue;
      }

      console.log(`[Migration] Applying ${file}...`);
      const filePath = path.join(migrationsDir, file);
      const sqlContent = fs.readFileSync(filePath, 'utf-8');

      // Execute migration statements
      await client.executeMultiple(sqlContent);

      // Record applied migration
      await client.execute({
        sql: 'INSERT INTO _migrations (name) VALUES (?);',
        args: [file],
      });

      console.log(`[Migration] Successfully applied ${file}`);
      appliedCount++;
    }

    if (appliedCount === 0) {
      console.log('[Migration] All migrations are already up to date!');
    } else {
      console.log(`[Migration] Applied ${appliedCount} new migration(s) successfully.`);
    }
  } catch (error) {
    console.error('[Migration Error]', error);
    process.exit(1);
  } finally {
    client.close();
  }
}

runMigrations();
