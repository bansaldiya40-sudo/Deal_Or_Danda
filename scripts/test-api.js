// scripts/test-api.js
// Direct automated test script for Deal or Danda API and database functions
import { saveGame, getRecentGames, getGameById, getLeaderboard, validateGameInput } from '../lib/gameService.js';
import { getDb } from '../lib/db.js';

async function runTests() {
  console.log('--- STARTING DEAL OR DANDA API & DB VERIFICATION ---\n');
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

  try {
    // 1. Validation Test - Invalid Input
    console.log('[Test 1] Input Validation with Invalid Data');
    const invalidInput = {
      startupName: '', // empty
      industry: '',
      investmentAsk: -5000, // negative
      equityOffered: 150, // > 100
      finalVerdict: 'invalid_verdict',
      score: 120, // > 100
    };
    const invalidRes = validateGameInput(invalidInput);
    assert(invalidRes.errors.length >= 5, `Expected multiple validation errors, got ${invalidRes.errors.length}`);
    const errFields = invalidRes.errors.map(e => e.field);
    assert(errFields.includes('startupName'), 'Validation flagged missing startupName');
    assert(errFields.includes('investmentAsk'), 'Validation flagged negative investmentAsk');
    assert(errFields.includes('equityOffered'), 'Validation flagged invalid equityOffered');
    assert(errFields.includes('finalVerdict'), 'Validation flagged invalid finalVerdict');
    assert(errFields.includes('score'), 'Validation flagged out-of-range score');

    // 2. Validation Test - Valid Input
    console.log('\n[Test 2] Input Validation with Valid Data');
    const validRaw = {
      playerName: 'Rohan Sharma',
      startupName: 'DesiKhaana Quick',
      tagline: '10-minute authentic street food delivery',
      industry: 'Food & Beverage',
      targetCustomer: 'Hungry tech professionals & college students',
      monthlyRevenue: 1500000,
      monthlyExpenses: 1200000,
      investmentAsk: 5000000,
      equityOffered: 5,
      finalVerdict: 'deal',
      acceptedDealInvestor: 'Demand Gupta',
      acceptedDealAmount: 5000000,
      acceptedDealEquity: 7.5,
      acceptedDealValuation: 66666667,
      valuation: 100000000,
      score: 88,
      dandaCount: 0,
      rounds: [
        {
          roundNumber: 1,
          questionId: 'q-rev-1',
          askerId: 'aman',
          chosenAnswerId: 'ans-rev-1a',
          chosenAnswer: '15 Lakhs monthly GMV with 22% net margin',
          investorReaction: 'impressed',
          pointsAwarded: 20,
          dandaTriggered: false,
          feedback: 'Solid numbers and high repeat orders.',
        },
        {
          roundNumber: 2,
          questionId: 'q-val-1',
          askerId: 'ashneer',
          chosenAnswerId: 'ans-val-1b',
          chosenAnswer: 'Realistic multiple based on bottom-up ARR',
          investorReaction: 'listening',
          pointsAwarded: 18,
          dandaTriggered: false,
          feedback: 'Fair valuation expectation.',
        },
      ],
    };
    const validRes = validateGameInput(validRaw);
    assert(validRes.errors.length === 0, 'Valid input returned 0 errors');
    assert(validRes.sanitized?.startupName === 'DesiKhaana Quick', 'Sanitized startup name matches');
    assert(validRes.sanitized?.playerName === 'Rohan Sharma', 'Sanitized player name matches');

    // 3. Database Save Test (POST /api/games equivalent)
    console.log('\n[Test 3] Save Game Execution (POST /api/games)');
    const saveResult = await saveGame(validRes.sanitized);
    assert(!!saveResult.id, `Game successfully saved with ID: ${saveResult.id}`);

    // Also save a second game that had Dandas for leaderboard verification
    const dandaGameRaw = {
      playerName: 'Vikram Overconfident',
      startupName: 'AI Chaiwala Drone',
      tagline: 'Flying tea kettle with quantum blockchain',
      industry: 'Robotics',
      investmentAsk: 20000000,
      equityOffered: 1,
      finalVerdict: 'danda',
      valuation: 2000000000,
      score: 15,
      dandaCount: 4,
      rounds: [
        {
          roundNumber: 1,
          questionId: 'q-prod-1',
          askerId: 'ashneer',
          chosenAnswerId: 'ans-doglapan',
          chosenAnswer: 'Total bluff with zero revenue',
          investorReaction: 'angry',
          pointsAwarded: 0,
          dandaTriggered: true,
          contradictionTriggered: true,
          slapTriggered: true,
          feedback: 'Doglapan detected! Extreme bluff.',
        },
      ],
    };
    const dandaValid = validateGameInput(dandaGameRaw);
    const dandaSaveResult = await saveGame(dandaValid.sanitized);
    assert(!!dandaSaveResult.id, `Danda blunder game saved with ID: ${dandaSaveResult.id}`);

    // 4. Retrieve Recent Games (GET /api/games)
    console.log('\n[Test 4] Retrieve Recent Games (GET /api/games)');
    const recentGames = await getRecentGames({ limit: 10 });
    assert(recentGames.games.length >= 2, `Retrieved ${recentGames.games.length} games (expected at least 2)`);
    assert(recentGames.pagination.total >= 2, `Pagination total is accurate: ${recentGames.pagination.total}`);
    const foundFirst = recentGames.games.find(g => g.id === saveResult.id);
    assert(!!foundFirst, 'First saved game is in recent games list');
    assert(foundFirst.startup_name === 'DesiKhaana Quick', 'Saved startup name matches in query result');

    // Filter by verdict
    const dealOnly = await getRecentGames({ verdict: 'deal' });
    assert(dealOnly.games.every(g => g.final_verdict === 'deal'), 'Verdict filter returns only deal games');

    // 5. Retrieve Specific Game by ID (GET /api/games/:id)
    console.log('\n[Test 5] Retrieve Game Details by ID (GET /api/games/:id)');
    const singleGame = await getGameById(saveResult.id);
    assert(!!singleGame, 'Game retrieved successfully');
    assert(singleGame?.game.startup_name === 'DesiKhaana Quick', 'Game details match');
    assert(singleGame?.rounds.length === 2, `Retrieved 2 game rounds (got ${singleGame?.rounds.length})`);
    assert(singleGame?.rounds[0].round_number === 1, 'First round number is 1');
    assert(singleGame?.rounds[0].asker_id === 'aman', 'Round asker ID matches');

    // Test nonexistent game
    const missingGame = await getGameById('non-existent-uuid-999');
    assert(missingGame === null, 'Non-existent game ID returns null');

    // 6. Leaderboard Test (GET /api/leaderboard)
    console.log('\n[Test 6] Retrieve Leaderboard (GET /api/leaderboard)');
    const leaderboard = await getLeaderboard(5);
    assert(Array.isArray(leaderboard.topDeals), 'Leaderboard has topDeals array');
    assert(Array.isArray(leaderboard.topScores), 'Leaderboard has topScores array');
    assert(Array.isArray(leaderboard.hallOfShame), 'Leaderboard has hallOfShame array');

    const topDeal = leaderboard.topDeals.find(d => d.id === saveResult.id);
    assert(!!topDeal, 'DesiKhaana Quick is present in topDeals');

    const topShame = leaderboard.hallOfShame.find(d => d.id === dandaSaveResult.id);
    assert(!!topShame, 'AI Chaiwala Drone is present in hallOfShame with dandas');
    assert(Number(topShame?.danda_count) === 4, 'Danda count in hallOfShame is 4');

  } catch (err) {
    console.error('Unexpected test exception:', err);
    failed++;
  }

  console.log('\n----------------------------------------');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('----------------------------------------\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
