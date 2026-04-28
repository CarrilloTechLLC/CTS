function outputHTML({ provider = 'github', token, error, errorCode }) {
  const status = error ? 'error' : 'success';
  const payload = error ? { provider, error, errorCode } : { provider, token };
  const message = `authorization:${provider}:${status}:${JSON.stringify(payload)}`;

  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CTS Admin Authorization</title>
</head>
<body style="background:#0B0C10;color:#EAF2FF;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;">
  <main style="text-align:center;max-width:28rem;padding:2rem;">
    <h1 style="font-size:1.25rem;margin:0 0 .5rem;">Authorization ${status === 'success' ? 'Complete' : 'Failed'}</h1>
    <p style="opacity:.8;margin:0;">${status === 'success' ? 'Returning to the CTS admin portal…' : 'Return to the CTS admin portal and try again.'}</p>
  </main>
  <script>
    (function () {
      var message = ${JSON.stringify(message)};
      var provider = ${JSON.stringify(provider)};

      function sendMessage(event) {
        if (!window.opener) return;
        window.opener.postMessage(message, event && event.origin ? event.origin : '*');
      }

      window.addEventListener('message', sendMessage, false);

      if (window.opener) {
        window.opener.postMessage('authorizing:' + provider, '*');
        setTimeout(function () {
          window.opener.postMessage(message, '*');
          window.close();
        }, 700);
      }
    })();
  </script>
</body>
</html>`, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
      'Set-Cookie': 'csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure',
      'Cache-Control': 'no-store'
    }
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookie = request.headers.get('Cookie') || '';
  const match = cookie.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/);
  const provider = match?.[1] || 'github';
  const csrfToken = match?.[2];

  if (!code || !state) {
    return outputHTML({ provider, error: 'GitHub did not return an authorization code.', errorCode: 'AUTH_CODE_REQUEST_FAILED' });
  }

  if (!csrfToken || state !== csrfToken) {
    return outputHTML({ provider, error: 'Security check failed during GitHub authorization.', errorCode: 'CSRF_DETECTED' });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return outputHTML({ provider, error: 'GitHub OAuth client ID or secret is not configured.', errorCode: 'MISCONFIGURED_CLIENT' });
  }

  let response;
  try {
    response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET
      })
    });
  } catch (error) {
    return outputHTML({ provider, error: 'Failed to contact GitHub for an access token.', errorCode: 'TOKEN_REQUEST_FAILED' });
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    return outputHTML({ provider, error: 'GitHub returned an unreadable token response.', errorCode: 'MALFORMED_RESPONSE' });
  }

  if (!data.access_token) {
    return outputHTML({
      provider,
      error: data.error_description || data.error || 'GitHub did not return an access token.',
      errorCode: 'TOKEN_REQUEST_FAILED'
    });
  }

  return outputHTML({ provider, token: data.access_token });
}
