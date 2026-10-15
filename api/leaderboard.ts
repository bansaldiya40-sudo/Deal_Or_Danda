import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getLeaderboard } from '../lib/gameService.js';
import { forwardToBridge } from '../lib/bridgeProxy.js';

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

  // Check if request should be proxied to local bridge tunnel
  const queryStr = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const proxy = await forwardToBridge(req, `/api/leaderboard${queryStr}`);
  if (proxy.handled) {
    return res.status(proxy.status || 200).json(proxy.data);
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
