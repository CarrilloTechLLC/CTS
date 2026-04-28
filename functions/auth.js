const supportedProviders = ['github'];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

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

function domainAllowed(domain, allowList) {
  if (!allowList) return true;
  return allowList.split(',').some((entry) => {
    const clean = entry.trim();
    if (!clean) return false;
    const pattern = `^${escapeRegExp(clean).replace('\\*', '.+')}$`;
    return new RegExp(pattern).test(domain || '');
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const provider = url.searchParams.get('provider') || 'github';
  const domain = url.searchParams.get('site_id') || url.hostname;

  if (!supportedProviders.includes(provider)) {
    return outputHTML({ provider, error: 'Unsupported Git backend.', errorCode: 'UNSUPPORTED_BACKEND' });
  }

  if (!domainAllowed(domain, env.ALLOWED_DOMAINS)) {
    return outputHTML({ provider, error: 'This domain is not allowed to use the CMS authenticator.', errorCode: 'UNSUPPORTED_DOMAIN' });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return outputHTML({ provider, error: 'GitHub OAuth client ID or secret is not configured.', errorCode: 'MISCONFIGURED_CLIENT' });
  }

  const csrfToken = crypto.randomUUID().replaceAll('-', '');
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    scope: 'repo,user',
    state: csrfToken
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      'Set-Cookie': `csrf-token=${provider}_${csrfToken}; HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
      'Cache-Control': 'no-store'
    }
  });
}
