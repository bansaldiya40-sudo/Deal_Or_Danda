export interface GameRoundInput {
  roundNumber: number;
  questionId: string;
  askerId: string;
  chosenAnswerId: string;
  chosenAnswer?: string;
  investorReaction?: string;
  pointsAwarded?: number;
  dandaTriggered?: boolean;
  contradictionTriggered?: boolean;
  slapTriggered?: boolean;
  feedback?: string;
}

export interface SaveGameInput {
  playerName?: string;
  startupName: string;
  tagline?: string;
  industry: string;
  targetCustomer?: string;
  monthlyRevenue?: number;
  monthlyExpenses?: number;
  investmentAsk: number;
  equityOffered: number;
  finalVerdict: 'deal' | 'no_deal' | 'danda';
  acceptedDealInvestor?: string;
  acceptedDealAmount?: number;
  acceptedDealEquity?: number;
  acceptedDealValuation?: number;
  valuation: number;
  score: number;
  dandaCount?: number;
  rounds?: GameRoundInput[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateGameInput(input: any): { errors: ValidationError[]; sanitized?: SaveGameInput };

export function saveGame(input: SaveGameInput): Promise<{ id: string }>;

export function getRecentGames(options?: {
  limit?: number;
  offset?: number;
  verdict?: string;
}): Promise<{
  games: any[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}>;

export function getGameById(id: string): Promise<{
  game: any;
  rounds: any[];
} | null>;

export function getLeaderboard(limit?: number): Promise<{
  topDeals: any[];
  topScores: any[];
  hallOfShame: any[];
}>;
