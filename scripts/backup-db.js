// scripts/backup-db.js
// Consistent online SQLite backup using SQLite's native VACUUM INTO and WAL checkpointing
import { createClient } from '@libsql/client';
import fs from 'node:fs';
import path from 'node:path';

async function performBackup() {
  const rootDir = process.cwd();
  const dbPath = path.resolve(rootDir, 'deal_or_danda.db');
  const backupDir = path.resolve(rootDir, 'backups');

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const backupFilename = `deal_or_danda_backup_${timestamp}.db`;
  const backupFilePath = path.resolve(backupDir, backupFilename);
  const normalizedBackupPath = backupFilePath.replace(/\\/g, '/');
  const normalizedDbPath = dbPath.replace(/\\/g, '/');

  console.log('=== STARTING SQLITE DATABASE BACKUP ===');
  console.log(`Original DB: ${dbPath}`);
  console.log(`Target Backup: ${backupFilePath}`);

  // 1. Open original database
  const origClient = createClient({ url: 'file:' + normalizedDbPath });

  // Count records in original database
  const origGames = await origClient.execute('SELECT COUNT(*) as count FROM games;');
  const origRounds = await origClient.execute('SELECT COUNT(*) as count FROM game_rounds;');
  const origMigrations = await origClient.execute('SELECT COUNT(*) as count FROM _migrations;');

  const originalCounts = {
    games: Number(origGames.rows[0].count),
    game_rounds: Number(origRounds.rows[0].count),
    _migrations: Number(origMigrations.rows[0].count),
  };

  console.log('\n[Original Database Record Counts]');
  console.log(`- games: ${originalCounts.games}`);
  console.log(`- game_rounds: ${originalCounts.game_rounds}`);
  console.log(`- _migrations: ${originalCounts._migrations}`);

  // 2. Perform WAL Checkpoint (TRUNCATE) to flush all active WAL transactions to the database
  console.log('\n[1/3] Executing PRAGMA wal_checkpoint(TRUNCATE)...');
  const checkpointResult = await origClient.execute('PRAGMA wal_checkpoint(TRUNCATE);');
  console.log('WAL Checkpoint complete:', checkpointResult.rows[0]);

  // 3. Perform SQLite atomic VACUUM INTO backup
  console.log('\n[2/3] Performing native SQLite VACUUM INTO backup...');
  if (fs.existsSync(backupFilePath)) {
    fs.unlinkSync(backupFilePath);
  }
  await origClient.execute(`VACUUM INTO '${normalizedBackupPath}';`);
  console.log('VACUUM INTO completed successfully.');

  origClient.close();

  // 4. Verify the backup database
  console.log('\n[3/3] Verifying backup database integrity...');
  const backupClient = createClient({ url: 'file:' + normalizedBackupPath });

  const integrityResult = await backupClient.execute('PRAGMA integrity_check;');
  const integrityStatus = integrityResult.rows[0] ? Object.values(integrityResult.rows[0])[0] : 'unknown';

  const backupGames = await backupClient.execute('SELECT COUNT(*) as count FROM games;');
  const backupRounds = await backupClient.execute('SELECT COUNT(*) as count FROM game_rounds;');
  const backupMigrations = await backupClient.execute('SELECT COUNT(*) as count FROM _migrations;');

  const backupCounts = {
    games: Number(backupGames.rows[0].count),
    game_rounds: Number(backupRounds.rows[0].count),
    _migrations: Number(backupMigrations.rows[0].count),
  };

  backupClient.close();

  const backupStats = fs.statSync(backupFilePath);

  console.log('\n=== BACKUP VERIFICATION REPORT ===');
  console.log(`Backup File: ${backupFilePath}`);
  console.log(`Backup File Size: ${backupStats.size} bytes`);
  console.log(`PRAGMA integrity_check: ${integrityStatus}`);
  console.log('\nRecord Counts Comparison:');
  console.log(`- games:       Original = ${originalCounts.games} | Backup = ${backupCounts.games} -> ${originalCounts.games === backupCounts.games ? 'MATCH' : 'MISMATCH'}`);
  console.log(`- game_rounds: Original = ${originalCounts.game_rounds} | Backup = ${backupCounts.game_rounds} -> ${originalCounts.game_rounds === backupCounts.game_rounds ? 'MATCH' : 'MISMATCH'}`);
  console.log(`- _migrations: Original = ${originalCounts._migrations} | Backup = ${backupCounts._migrations} -> ${originalCounts._migrations === backupCounts._migrations ? 'MATCH' : 'MISMATCH'}`);

  const isMatch = originalCounts.games === backupCounts.games &&
                  originalCounts.game_rounds === backupCounts.game_rounds &&
                  originalCounts._migrations === backupCounts._migrations;

  if (integrityStatus === 'ok' && isMatch) {
    console.log('\nSUCCESS: Database backup is consistent, verified, and complete.');
  } else {
    console.error('\nERROR: Backup verification failed.');
    process.exit(1);
  }
}

performBackup().catch(err => {
  console.error('Fatal backup error:', err);
  process.exit(1);
});
