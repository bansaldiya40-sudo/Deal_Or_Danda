import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getGameById } from '../../lib/gameService.js';
import { forwardToBridge } from '../../lib/bridgeProxy.js';

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

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Game ID parameter is required' });
  }

  // Check if request should be proxied to local bridge tunnel
  const proxy = await forwardToBridge(req, `/api/games/${id}`);
  if (proxy.handled) {
    return res.status(proxy.status || 200).json(proxy.data);
  }

    const gameData = await getGameById(id);

    if (!gameData) {
      return res.status(404).json({ error: `Game with ID '${id}' was not found.` });
    }

    return res.status(200).json(gameData);
  } catch (error: any) {
    console.error('[API /api/games/:id Error]', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error?.message || 'An unexpected error occurred while fetching game details.',
    });
  }
}
