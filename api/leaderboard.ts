import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getLeaderboard } from '../lib/gameService.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 10;
    const leaderboard = await getLeaderboard(limit);

    return res.status(200).json(leaderboard);
  } catch (error: any) {
    console.error('[API /api/leaderboard Error]', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'An unexpected error occurred while fetching the leaderboard.',
    });
  }
}
