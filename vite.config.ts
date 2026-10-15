import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { saveGame, getRecentGames, getGameById, getLeaderboard, validateGameInput } from './lib/gameService.js'

function localApiPlugin(): Plugin {
  return {
    name: 'deal-or-danda-local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) {
          return next();
        }

        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = urlObj.pathname;
        const query = Object.fromEntries(urlObj.searchParams.entries());

        res.setHeader('Content-Type', 'application/json');

        try {
          // 1. /api/leaderboard
          if (pathname === '/api/leaderboard') {
            if (req.method !== 'GET') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: `Method ${req.method} Not Allowed` }));
              return;
            }
            const limit = query.limit ? parseInt(query.limit, 10) : 10;
            const data = await getLeaderboard(limit);
            res.statusCode = 200;
            res.end(JSON.stringify(data));
            return;
          }

          // 2. /api/games or /api/games/:id
          if (pathname === '/api/games' || pathname === '/api/games/') {
            if (req.method === 'GET') {
              const limit = query.limit ? parseInt(query.limit, 10) : 20;
              const offset = query.offset ? parseInt(query.offset, 10) : 0;
              const verdict = query.verdict;
              const data = await getRecentGames({ limit, offset, verdict });
              res.statusCode = 200;
              res.end(JSON.stringify(data));
              return;
            }

            if (req.method === 'POST') {
              let bodyRaw = '';
              req.on('data', chunk => { bodyRaw += chunk; });
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(bodyRaw || '{}');
                  const { errors, sanitized } = validateGameInput(parsed);
                  if (errors.length > 0 || !sanitized) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Validation Failed', details: errors }));
                    return;
                  }
                  const result = await saveGame(sanitized);
                  res.statusCode = 201;
                  res.end(JSON.stringify({
                    success: true,
                    gameId: result.id,
                    message: 'Game scorecard saved successfully',
                  }));
                } catch (parseErr: any) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: 'Invalid JSON body', details: parseErr?.message }));
                }
              });
              return;
            }

            res.statusCode = 405;
            res.end(JSON.stringify({ error: `Method ${req.method} Not Allowed` }));
            return;
          }

          // 3. /api/games/:id
          const gamesIdMatch = pathname.match(/^\/api\/games\/([^/]+)$/);
          if (gamesIdMatch) {
            if (req.method !== 'GET') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: `Method ${req.method} Not Allowed` }));
              return;
            }
            const id = gamesIdMatch[1];
            const gameData = await getGameById(id);
            if (!gameData) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: `Game with ID '${id}' was not found.` }));
              return;
            }
            res.statusCode = 200;
            res.end(JSON.stringify(gameData));
            return;
          }

          next();
        } catch (err: any) {
          console.error('[Local API Error]', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Internal Server Error', message: err?.message }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localApiPlugin()],
})

