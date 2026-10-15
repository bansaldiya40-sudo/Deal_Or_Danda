import { getDb } from './db.js';
import crypto from 'node:crypto';

/**
 * Validates raw game input from client requests.
 * @param {any} input
 * @returns {{ errors: Array<{ field: string, message: string }>, sanitized?: any }}
 */
export function validateGameInput(input) {
  const errors = [];

  if (!input || typeof input !== 'object') {
    return { errors: [{ field: 'body', message: 'Request body must be a valid JSON object' }] };
  }

  // Startup name
  const startupName = typeof input.startupName === 'string' ? input.startupName.trim() : '';
  if (!startupName) {
    errors.push({ field: 'startupName', message: 'Startup name is required (string 1-100 characters)' });
  } else if (startupName.length > 100) {
    errors.push({ field: 'startupName', message: 'Startup name must not exceed 100 characters' });
  }

  // Industry
  const industry = typeof input.industry === 'string' ? input.industry.trim() : '';
  if (!industry) {
    errors.push({ field: 'industry', message: 'Industry is required (string 1-50 characters)' });
  }

  // Player name
  const playerName = typeof input.playerName === 'string' && input.playerName.trim()
    ? input.playerName.trim().slice(0, 80)
    : 'Founder';

  // Investment ask & Equity
  const investmentAsk = Number(input.investmentAsk);
  if (isNaN(investmentAsk) || investmentAsk <= 0) {
    errors.push({ field: 'investmentAsk', message: 'Investment ask must be a positive number' });
  }

  const equityOffered = Number(input.equityOffered);
  if (isNaN(equityOffered) || equityOffered < 0 || equityOffered > 100) {
    errors.push({ field: 'equityOffered', message: 'Equity offered must be between 0 and 100' });
  }

  // Final verdict
  const validVerdicts = ['deal', 'no_deal', 'danda'];
  if (!validVerdicts.includes(input.finalVerdict)) {
    errors.push({ field: 'finalVerdict', message: `Final verdict must be one of: ${validVerdicts.join(', ')}` });
  }

  // Valuation
  const valuation = Number(input.valuation);
  if (isNaN(valuation) || valuation < 0) {
    errors.push({ field: 'valuation', message: 'Valuation must be a non-negative number' });
  }

  // Score
  const score = Number(input.score);
  if (isNaN(score) || score < 0 || score > 100) {
    errors.push({ field: 'score', message: 'Score must be a number between 0 and 100' });
  }

  const dandaCount = Math.max(0, parseInt(input.dandaCount, 10) || 0);
  const monthlyRevenue = Math.max(0, Number(input.monthlyRevenue) || 0);
  const monthlyExpenses = Math.max(0, Number(input.monthlyExpenses) || 0);

  if (errors.length > 0) {
    return { errors };
  }

  return {
    errors: [],
    sanitized: {
      playerName,
      startupName,
      tagline: typeof input.tagline === 'string' ? input.tagline.trim().slice(0, 200) : '',
      industry,
      targetCustomer: typeof input.targetCustomer === 'string' ? input.targetCustomer.trim().slice(0, 100) : '',
      monthlyRevenue,
      monthlyExpenses,
      investmentAsk,
      equityOffered,
      finalVerdict: input.finalVerdict,
      acceptedDealInvestor: typeof input.acceptedDealInvestor === 'string' ? input.acceptedDealInvestor.trim() : undefined,
      acceptedDealAmount: input.acceptedDealAmount ? Number(input.acceptedDealAmount) : undefined,
      acceptedDealEquity: input.acceptedDealEquity ? Number(input.acceptedDealEquity) : undefined,
      acceptedDealValuation: input.acceptedDealValuation ? Number(input.acceptedDealValuation) : undefined,
      valuation,
      score: Math.round(score),
      dandaCount,
      rounds: Array.isArray(input.rounds) ? input.rounds : [],
    },
  };
}

/**
 * Saves a validated game result and its rounds to SQLite/Turso.
 * @param {any} input
 * @returns {Promise<{ id: string }>}
 */
export async function saveGame(input) {
  const db = getDb();
  const gameId = crypto.randomUUID();

  // Insert master game record
  await db.execute({
    sql: `
      INSERT INTO games (
        id, player_name, startup_name, tagline, industry, target_customer,
        monthly_revenue, monthly_expenses, investment_ask, equity_offered,
        final_verdict, accepted_deal_investor, accepted_deal_amount,
        accepted_deal_equity, accepted_deal_valuation, valuation, score,
        danda_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    args: [
      gameId,
      input.playerName || 'Founder',
      input.startupName,
      input.tagline || null,
      input.industry,
      input.targetCustomer || null,
      input.monthlyRevenue || 0,
      input.monthlyExpenses || 0,
      input.investmentAsk,
      input.equityOffered,
      input.finalVerdict,
      input.acceptedDealInvestor || null,
      input.acceptedDealAmount ?? null,
      input.acceptedDealEquity ?? null,
      input.acceptedDealValuation ?? null,
      input.valuation,
      input.score,
      input.dandaCount || 0,
    ],
  });

  // Insert round details if provided
  if (input.rounds && input.rounds.length > 0) {
    for (const round of input.rounds) {
      const roundId = crypto.randomUUID();
      await db.execute({
        sql: `
          INSERT INTO game_rounds (
            id, game_id, round_number, question_id, asker_id,
            chosen_answer_id, chosen_answer, investor_reaction,
            points_awarded, danda_triggered, contradiction_triggered,
            slap_triggered, feedback
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        args: [
          roundId,
          gameId,
          round.roundNumber,
          round.questionId,
          round.askerId,
          round.chosenAnswerId,
          round.chosenAnswer || null,
          round.investorReaction || null,
          round.pointsAwarded || 0,
          round.dandaTriggered ? 1 : 0,
          round.contradictionTriggered ? 1 : 0,
          round.slapTriggered ? 1 : 0,
          round.feedback || null,
        ],
      });
    }
  }

  return { id: gameId };
}

/**
 * Retrieves recent games with optional verdict filtering and pagination.
 */
export async function getRecentGames(options = {}) {
  const db = getDb();
  const limit = Math.min(Math.max(1, options.limit || 20), 100);
  const offset = Math.max(0, options.offset || 0);

  let sql = 'SELECT * FROM games';
  const args = [];

  if (options.verdict && ['deal', 'no_deal', 'danda'].includes(options.verdict)) {
    sql += ' WHERE final_verdict = ?';
    args.push(options.verdict);
  }

  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?;';
  args.push(limit, offset);

  const result = await db.execute({ sql, args });

  // Get total count
  const countSql = options.verdict && ['deal', 'no_deal', 'danda'].includes(options.verdict)
    ? 'SELECT COUNT(*) as total FROM games WHERE final_verdict = ?;'
    : 'SELECT COUNT(*) as total FROM games;';
  const countArgs = options.verdict && ['deal', 'no_deal', 'danda'].includes(options.verdict)
    ? [options.verdict]
    : [];

  const countResult = await db.execute({ sql: countSql, args: countArgs });
  const total = Number(countResult.rows[0]?.total || 0);

  return {
    games: result.rows,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + result.rows.length < total,
    },
  };
}

/**
 * Retrieves a single game and all its detailed round results.
 */
export async function getGameById(id) {
  const db = getDb();

  const gameResult = await db.execute({
    sql: 'SELECT * FROM games WHERE id = ? LIMIT 1;',
    args: [id],
  });

  if (gameResult.rows.length === 0) {
    return null;
  }

  const roundsResult = await db.execute({
    sql: 'SELECT * FROM game_rounds WHERE game_id = ? ORDER BY round_number ASC;',
    args: [id],
  });

  return {
    game: gameResult.rows[0],
    rounds: roundsResult.rows,
  };
}

/**
 * Returns leaderboard rankings: top deals, highest pitch scores, and hall of danda.
 */
export async function getLeaderboard(limit = 10) {
  const db = getDb();
  const safeLimit = Math.min(Math.max(1, limit), 50);

  // Top Deals (highest secured valuation)
  const topDealsResult = await db.execute({
    sql: `
      SELECT id, player_name, startup_name, industry, final_verdict,
             accepted_deal_investor, accepted_deal_amount, accepted_deal_equity,
             valuation, score, danda_count, created_at
      FROM games
      WHERE final_verdict = 'deal'
      ORDER BY valuation DESC, score DESC
      LIMIT ?;
    `,
    args: [safeLimit],
  });

  // Top Pitch Performance (highest overall score)
  const topScoresResult = await db.execute({
    sql: `
      SELECT id, player_name, startup_name, industry, final_verdict,
             accepted_deal_investor, valuation, score, danda_count, created_at
      FROM games
      ORDER BY score DESC, valuation DESC
      LIMIT ?;
    `,
    args: [safeLimit],
  });

  // Hall of Danda / Shame (most dandas received)
  const hallOfShameResult = await db.execute({
    sql: `
      SELECT id, player_name, startup_name, industry, final_verdict,
             valuation, score, danda_count, created_at
      FROM games
      WHERE danda_count > 0 OR final_verdict = 'danda'
      ORDER BY danda_count DESC, score ASC
      LIMIT ?;
    `,
    args: [safeLimit],
  });

  return {
    topDeals: topDealsResult.rows,
    topScores: topScoresResult.rows,
    hallOfShame: hallOfShameResult.rows,
  };
}
