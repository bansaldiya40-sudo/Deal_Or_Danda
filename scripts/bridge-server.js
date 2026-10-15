// scripts/bridge-server.js
// Secure, authenticated local SQLite bridge server for Deal or Danda
// Binds exclusively to 127.0.0.1:4001 and connects directly to C:\Deal_or_Danda\deal_or_danda.db
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

import {
  saveGame,
  getRecentGames,
  getGameById,
  getLeaderboard,
  validateGameInput,
} from '../lib/gameService.js';
import { db } from '../lib/db.js';

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

// Ensure persistent secret token exists
const secretFilePath = path.join(rootDir, '.bridge-secret');
let bridgeSecret = process.env.BRIDGE_SECRET_TOKEN;

if (!bridgeSecret) {
  if (fs.existsSync(secretFilePath)) {
    bridgeSecret = fs.readFileSync(secretFilePath, 'utf-8').trim();
  } else {
    bridgeSecret = 'danda_sec_' + crypto.randomBytes(24).toString('hex');
    fs.writeFileSync(secretFilePath, bridgeSecret, 'utf-8');
  }
}

const PORT = parseInt(process.env.BRIDGE_PORT || '4001', 10);
const HOST = '127.0.0.1';

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-bridge-token',
  });
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Protect against oversized payloads (> 2MB)
      if (body.length > 2 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-bridge-token',
    });
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://${HOST}:${PORT}`);
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  // Unauthenticated Health Check (for tunnel & liveness monitors)
  if (pathname === '/health' && req.method === 'GET') {
    try {
      const check = await db.execute('SELECT 1 as alive;');
      sendJson(res, 200, {
        status: 'healthy',
        bridge: 'Deal or Danda Local SQLite Bridge',
        database: 'deal_or_danda.db',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      sendJson(res, 500, { status: 'unhealthy', error: err.message });
    }
    return;
  }

  // Security Check: Authenticate via x-bridge-token header
  const clientToken = req.headers['x-bridge-token'];
  if (!clientToken || clientToken !== bridgeSecret) {
    sendJson(res, 401, {
      error: 'Unauthorized',
      message: 'Missing or invalid x-bridge-token header.',
    });
    return;
  }

  try {
    // 1. /api/leaderboard (GET)
    if (pathname === '/api/leaderboard') {
      if (req.method !== 'GET') {
        sendJson(res, 405, { error: `Method ${req.method} Not Allowed` });
        return;
      }
      const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 10;
      const data = await getLeaderboard(limit);
      sendJson(res, 200, data);
      return;
    }

    // 2. /api/games (GET, POST)
    if (pathname === '/api/games' || pathname === '/api/games/') {
      if (req.method === 'GET') {
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit'), 10) : 20;
        const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset'), 10) : 0;
        const verdict = searchParams.get('verdict') || undefined;
        const data = await getRecentGames({ limit, offset, verdict });
        sendJson(res, 200, data);
        return;
      }

      if (req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { errors, sanitized } = validateGameInput(body);

        if (errors.length > 0 || !sanitized) {
          sendJson(res, 400, { error: 'Validation Failed', details: errors });
          return;
        }

        const result = await saveGame(sanitized);
        sendJson(res, 201, {
          success: true,
          gameId: result.id,
          message: 'Game scorecard saved to local SQLite database',
        });
        return;
      }

      sendJson(res, 405, { error: `Method ${req.method} Not Allowed` });
      return;
    }

    // 3. /api/games/:id (GET)
    const singleMatch = pathname.match(/^\/api\/games\/([^/]+)$/);
    if (singleMatch) {
      if (req.method !== 'GET') {
        sendJson(res, 405, { error: `Method ${req.method} Not Allowed` });
        return;
      }
      const id = singleMatch[1];
      const data = await getGameById(id);
      if (!data) {
        sendJson(res, 404, { error: `Game with ID '${id}' not found` });
        return;
      }
      sendJson(res, 200, data);
      return;
    }

    sendJson(res, 404, { error: 'Not Found' });
  } catch (error) {
    console.error('[Bridge Error]', error);
    sendJson(res, 500, {
      error: 'Internal Server Error',
      message: error?.message || 'Database error occurred on local bridge',
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`====================================================`);
  console.log(` DEAL OR DANDA — LOCAL SQLITE BRIDGE SERVER`);
  console.log(`====================================================`);
  console.log(`Status: Active and listening`);
  console.log(`Address: http://${HOST}:${PORT}`);
  console.log(`Target Database: C:\\Deal_or_Danda\\deal_or_danda.db`);
  console.log(`Auth Header Required: x-bridge-token`);
  console.log(`Secret Token File: ${secretFilePath}`);
  console.log(`====================================================`);
});
