// lib/bridgeProxy.js
// Handles secure proxying of requests from Vercel to the local bridge tunnel

export async function forwardToBridge(req, targetPath) {
  const tunnelUrl = process.env.BRIDGE_TUNNEL_URL?.trim();
  const secretToken = process.env.BRIDGE_SECRET_TOKEN?.trim();

  // If no tunnel is configured
  if (!tunnelUrl) {
    if (process.env.VERCEL) {
      // In production Vercel without tunnel, do NOT attempt local file open (which causes 500 error 14).
      return {
        handled: true,
        status: 503,
        data: {
          error: 'Bridge Not Configured',
          message: 'BRIDGE_TUNNEL_URL environment variable is not configured on Vercel.',
        },
      };
    }
    // In local dev without tunnel configured, allow caller to use local gameService directly
    return { handled: false };
  }

  const cleanBase = tunnelUrl.replace(/\/+$/, '');
  const url = `${cleanBase}${targetPath}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  try {
    const headers = {
      'x-bridge-token': secretToken || '',
      'Content-Type': 'application/json',
    };

    const fetchOptions = {
      method: req.method,
      headers,
      signal: controller.signal,
    };

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
      fetchOptions.body = body;
    }

    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);

    const json = await response.json().catch(() => ({}));
    return {
      handled: true,
      status: response.status,
      data: json,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('[Bridge Forward Error]', err.name, err.message);
    return {
      handled: true,
      status: 503,
      data: {
        error: 'Bridge Offline',
        message: 'The local database bridge on your PC is currently offline. Games cannot be saved until the bridge is active.',
      },
    };
  }
}
