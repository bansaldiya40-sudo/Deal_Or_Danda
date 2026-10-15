import type { VercelRequest, VercelResponse } from '@vercel/node';
import { saveGame, getRecentGames, validateGameInput } from '../../lib/gameService.js';
import { forwardToBridge } from '../../lib/bridgeProxy.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Check if request should be proxied to local bridge tunnel
  const queryStr = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
  const proxy = await forwardToBridge(req, `/api/games${queryStr}`);
  if (proxy.handled) {
    return res.status(proxy.status || 200).json(proxy.data);
  }

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { errors, sanitized } = validateGameInput(body);

      if (errors.length > 0 || !sanitized) {
        return res.status(400).json({
          error: 'Validation Failed',
          details: errors,
        });
      }

      const result = await saveGame(sanitized);
      return res.status(201).json({
        success: true,
        gameId: result.id,
        message: 'Game scorecard saved successfully',
      });
    }

    if (req.method === 'GET') {
      const limit = req.query.limit ? parseInt(String(req.query.limit), 10) : 20;
      const offset = req.query.offset ? parseInt(String(req.query.offset), 10) : 0;
      const verdict = req.query.verdict ? String(req.query.verdict) : undefined;

      const data = await getRecentGames({ limit, offset, verdict });
      return res.status(200).json(data);
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  } catch (error: any) {
    console.error('[API /api/games Error]', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'An unexpected error occurred while processing game data.',
    });
  }
}
