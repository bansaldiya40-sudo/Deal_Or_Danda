-- Migration: 0001_initial_schema.sql
-- Description: Initial schema for Deal or Danda games, rounds, and leaderboard

CREATE TABLE IF NOT EXISTS _migrations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  applied_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  player_name TEXT NOT NULL,
  startup_name TEXT NOT NULL,
  tagline TEXT,
  industry TEXT NOT NULL,
  target_customer TEXT,
  monthly_revenue REAL NOT NULL DEFAULT 0,
  monthly_expenses REAL NOT NULL DEFAULT 0,
  investment_ask REAL NOT NULL,
  equity_offered REAL NOT NULL,
  final_verdict TEXT NOT NULL, -- 'deal', 'no_deal', 'danda'
  accepted_deal_investor TEXT,
  accepted_deal_amount REAL,
  accepted_deal_equity REAL,
  accepted_deal_valuation REAL,
  valuation REAL NOT NULL,
  score INTEGER NOT NULL,
  danda_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS game_rounds (
  id TEXT PRIMARY KEY,
  game_id TEXT NOT NULL,
  round_number INTEGER NOT NULL,
  question_id TEXT NOT NULL,
  asker_id TEXT NOT NULL,
  chosen_answer_id TEXT NOT NULL,
  chosen_answer TEXT,
  investor_reaction TEXT,
  points_awarded INTEGER NOT NULL DEFAULT 0,
  danda_triggered INTEGER NOT NULL DEFAULT 0,
  contradiction_triggered INTEGER NOT NULL DEFAULT 0,
  slap_triggered INTEGER NOT NULL DEFAULT 0,
  feedback TEXT,
  created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_games_score ON games(score DESC);
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_games_final_verdict ON games(final_verdict);
CREATE INDEX IF NOT EXISTS idx_game_rounds_game_id ON game_rounds(game_id);
