// scripts/test-bridge.js
// Automated verification suite for the local SQLite bridge server
import fs from 'node:fs';
import path from 'node:path';
import { db } from '../lib/db.js';

async function runBridgeTests() {
  console.log('--- STARTING LOCAL BRIDGE TEST SUITE ---\n');
  const base = 'http://127.0.0.1:4001';
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // Read secret token from .bridge-secret
  const secretPath = path.resolve(process.cwd(), '.bridge-secret');
  if (!fs.existsSync(secretPath)) {
    console.error('❌ FAIL: .bridge-secret file not found');
    process.exit(1);
  }
  const token = fs.readFileSync(secretPath, 'utf-8').trim();
  console.log(`Loaded bridge token for test (prefix): ${token.slice(0, 15)}...`);

  try {
    // 1. Health check (unauthenticated)
    console.log('\n[Test 1] Unauthenticated Health Check (GET /health)');
    const healthRes = await fetch(`${base}/health`);
    assert(healthRes.status === 200, `Health check returned 200 (got ${healthRes.status})`);
    const healthData = await healthRes.json();
    assert(healthData.status === 'healthy', 'Health status is "healthy"');
    assert(healthData.database === 'deal_or_danda.db', 'Database target is deal_or_danda.db');

    // 2. Auth check: Missing token
    console.log('\n[Test 2] Authentication: Missing Token');
    const noAuthRes = await fetch(`${base}/api/games`);
    assert(noAuthRes.status === 401, `Missing token returned 401 Unauthorized (got ${noAuthRes.status})`);
    const noAuthData = await noAuthRes.json();
    assert(noAuthData.error === 'Unauthorized', 'Error message is "Unauthorized"');

    // 3. Auth check: Invalid token
    console.log('\n[Test 3] Authentication: Invalid Token');
    const badAuthRes = await fetch(`${base}/api/games`, {
      headers: { 'x-bridge-token': 'wrong_token_12345' },
    });
    assert(badAuthRes.status === 401, `Invalid token returned 401 Unauthorized (got ${badAuthRes.status})`);

    // 4. Save Game via Bridge (POST /api/games)
    console.log('\n[Test 4] Save Game via Bridge (POST /api/games with valid token)');
    const testGame = {
      playerName: 'Bridge Test Founder',
      startupName: 'BridgeBot AI',
      tagline: 'Autonomous AI for Pitch Records',
      industry: 'Enterprise Software',
      investmentAsk: 3000000,
      equityOffered: 5,
      finalVerdict: 'deal',
      acceptedDealInvestor: 'Demand Gupta',
      acceptedDealAmount: 3000000,
      acceptedDealEquity: 5,
      acceptedDealValuation: 60000000,
      valuation: 60000000,
      score: 95,
      dandaCount: 0,
      rounds: [
        {
          roundNumber: 1,
          questionId: 'q-bridge-1',
          askerId: 'aman',
          chosenAnswerId: 'ans-bridge-1',
          chosenAnswer: 'High retention and net revenue expansion',
          investorReaction: 'impressed',
          pointsAwarded: 20,
        },
      ],
    };

    const postRes = await fetch(`${base}/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-bridge-token': token,
      },
      body: JSON.stringify(testGame),
    });

    assert(postRes.status === 201, `Save game returned 201 Created (got ${postRes.status})`);
    const postData = await postRes.json();
    assert(!!postData.gameId, `Received generated gameId: ${postData.gameId}`);

    // 5. Verify direct disk write in C:\Deal_or_Danda\deal_or_danda.db
    console.log('\n[Test 5] Direct Verification in SQLite Database File');
    const directRow = await db.execute({
      sql: 'SELECT id, player_name, startup_name, final_verdict, score FROM games WHERE id = ?;',
      args: [postData.gameId],
    });
    assert(directRow.rows.length === 1, 'Game row exists directly in deal_or_danda.db');
    assert(directRow.rows[0].startup_name === 'BridgeBot AI', 'Startup name matches in deal_or_danda.db');
    assert(directRow.rows[0].score === 95, 'Score matches in deal_or_danda.db');

    // 6. Retrieve Recent Games (GET /api/games)
    console.log('\n[Test 6] Retrieve Recent Games (GET /api/games)');
    const getRes = await fetch(`${base}/api/games?limit=5`, {
      headers: { 'x-bridge-token': token },
    });
    assert(getRes.status === 200, `GET /api/games returned 200 (got ${getRes.status})`);
    const getData = await getRes.json();
    const foundGame = getData.games.find(g => g.id === postData.gameId);
    assert(!!foundGame, 'Saved game is present in recent games list');

    // 7. Retrieve Game by ID (GET /api/games/:id)
    console.log('\n[Test 7] Retrieve Single Game by ID (GET /api/games/:id)');
    const singleRes = await fetch(`${base}/api/games/${postData.gameId}`, {
      headers: { 'x-bridge-token': token },
    });
    assert(singleRes.status === 200, `GET /api/games/:id returned 200 (got ${singleRes.status})`);
    const singleData = await singleRes.json();
    assert(singleData.game.startup_name === 'BridgeBot AI', 'Single game details match');
    assert(singleData.rounds.length === 1, 'Single game returned 1 round');

    // 8. Retrieve Leaderboard (GET /api/leaderboard)
    console.log('\n[Test 8] Retrieve Leaderboard (GET /api/leaderboard)');
    const lbRes = await fetch(`${base}/api/leaderboard`, {
      headers: { 'x-bridge-token': token },
    });
    assert(lbRes.status === 200, `GET /api/leaderboard returned 200 (got ${lbRes.status})`);
    const lbData = await lbRes.json();
    const inTopDeals = lbData.topDeals.find(d => d.id === postData.gameId);
    assert(!!inTopDeals, 'BridgeBot AI is present in topDeals leaderboard');

  } catch (err) {
    console.error('Unexpected bridge test error:', err);
    failed++;
  }

  console.log('\n----------------------------------------');
  console.log(`BRIDGE TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('----------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runBridgeTests();
