import type { Client } from '@libsql/client';

export function getDb(): Client;
export const db: Client;
