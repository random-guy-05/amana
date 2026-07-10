const AUTH_PATH = "/__site-auth";
const LOGOUT_PATH = "/__site-logout";
const SESSION_COOKIE = "site_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const encoder = new TextEncoder();

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function base64Url(bytes) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function constantTimeEqual(left, right) {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return difference === 0;
}

async function sign(value, password) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64Url(new Uint8Array(signature));
}

async function isValidSession(cookie, password) {
  if (!cookie) return false;
  const [expiresAt, signature] = cookie.split(".");
  if (!expiresAt || !signature || !/^\d+$/.test(expiresAt) || Number(expiresAt) < Date.now()) return false;
  const expected = await sign(expiresAt, password);
  return constantTimeEqual(signature, expected);
}

function getCookie(request, name) {
  const cookies = request.headers.get("Cookie")?.split(";") ?? [];
  const entry = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : null;
}

function commonHeaders(contentType = "text/html; charset=UTF-8") {
  return {
    ...securityHeaders,
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    Vary: "Cookie",
  };
}

function loginPage(message = "", status = 401) {
  const messageMarkup = message ? `<p class="login-message" role="alert">${message}</p>` : "";
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#08080a">
    <meta name="color-scheme" content="dark">
    <title>Private portfolio | Arnav Mana</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
      :root {
        color-scheme: dark;
        --bg: #08080a; --panel: #0f0f13; --ink: #f4f2ec; --dim: #9a9aa2; --faint: #63636c;
        --line: rgba(255,255,255,.1); --line-2: rgba(255,255,255,.16);
        --gold: #e6c168; --gold-soft: #f2dba1; --gold-deep: #b98a3c; --gold-glow: rgba(230,193,104,.5);
        --sans: "Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
        --serif: "Instrument Serif", Georgia, serif;
        --mono: "JetBrains Mono", ui-monospace, Menlo, monospace;
      }
      * { box-sizing: border-box; }
      body { min-width: 320px; min-height: 100vh; margin: 0; padding: 24px; display: grid; place-items: center; overflow: hidden; background: var(--bg); color: var(--ink); font-family: var(--sans); -webkit-font-smoothing: antialiased; }
      body::before, body::after { position: fixed; content: ""; pointer-events: none; border-radius: 50%; filter: blur(90px); z-index: 0; }
      body::before { width: 55vw; height: 55vw; top: -18vw; right: -12vw; background: radial-gradient(circle, rgba(230,193,104,.14), transparent 65%); }
      body::after { width: 46vw; height: 46vw; bottom: -20vw; left: -14vw; background: radial-gradient(circle, rgba(120,140,200,.08), transparent 65%); }
      .grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px); background-size: 60px 60px; -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent 80%); mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000, transparent 80%); }
      .login-shell { position: relative; z-index: 1; width: min(100%, 480px); padding: 44px; border: 1px solid var(--line); border-radius: 16px; background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,0)), var(--panel); box-shadow: 0 40px 100px -30px rgba(0,0,0,.9), inset 0 1px 0 rgba(255,255,255,.05); }
      .login-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 56px; color: var(--dim); font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; }
      .login-mark { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(150deg, var(--gold-soft), var(--gold-deep)); color: #1a1305; font-family: var(--mono); font-size: 12px; font-weight: 600; box-shadow: 0 4px 18px rgba(230,193,104,.22); }
      .login-status { display: inline-flex; align-items: center; gap: 9px; }
      .login-status::before { width: 6px; height: 6px; content: ""; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 4px rgba(230,193,104,.12); }
      .login-eyebrow { margin: 0 0 18px; color: var(--gold); font-family: var(--mono); font-size: 10px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; }
      h1 { max-width: 410px; margin: 0 0 18px; font-family: var(--serif); font-size: 3.6rem; font-weight: 400; letter-spacing: -.01em; line-height: .98; }
      h1 em { color: var(--gold); font-style: italic; }
      .login-copy { max-width: 380px; margin: 0 0 32px; color: var(--dim); font-size: 14.5px; line-height: 1.65; }
      label { display: block; margin-bottom: 10px; color: var(--dim); font-family: var(--mono); font-size: 10.5px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; }
      .password-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; }
      input { min-width: 0; width: 100%; height: 54px; padding: 0 16px; border: 1px solid var(--line-2); border-radius: 100px; outline: none; background: #060608; color: var(--ink); font-family: var(--sans); font-size: 16px; transition: border-color .2s ease, box-shadow .2s ease; }
      input::placeholder { color: var(--faint); }
      input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(230,193,104,.14); }
      button { display: inline-flex; align-items: center; gap: 8px; height: 54px; padding: 0 22px; border: 0; border-radius: 100px; background: linear-gradient(180deg, var(--gold-soft), var(--gold)); color: #1a1305; cursor: pointer; font-family: var(--sans); font-size: 13.5px; font-weight: 600; white-space: nowrap; box-shadow: 0 8px 30px rgba(230,193,104,.18); transition: box-shadow .2s ease, transform .3s cubic-bezier(.16,1,.3,1); }
      button:hover { box-shadow: 0 12px 40px rgba(230,193,104,.3); transform: translateY(-2px); }
      .login-message { margin: 0 0 16px; padding: 11px 14px; border-left: 2px solid var(--gold); border-radius: 4px; background: rgba(230,193,104,.08); color: var(--gold-soft); font-size: 13px; line-height: 1.5; }
      .login-foot { margin: 32px 0 0; padding-top: 18px; border-top: 1px solid var(--line); color: var(--faint); font-family: var(--mono); font-size: 10.5px; letter-spacing: .05em; }
      @media (max-width: 540px) { body { padding: 16px; } .login-shell { padding: 30px 24px; } .login-top { margin-bottom: 48px; } h1 { font-size: 2.9rem; } .password-row { grid-template-columns: 1fr; } button { width: 100%; justify-content: center; } }
      @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
    </style>
  </head>
  <body>
    <div class="grid" aria-hidden="true"></div>
    <main class="login-shell">
      <div class="login-top"><span class="login-mark" aria-hidden="true">AM</span><span class="login-status">Private portfolio</span></div>
      <p class="login-eyebrow">Arnav Mana / Private research portfolio</p>
      <h1>Research <em>archive.</em></h1>
      <p class="login-copy" id="login-copy">Enter the password to view current projects, methods, and community work.</p>
      ${messageMarkup}
      <form action="${AUTH_PATH}" method="post">
        <label for="site-password">Password</label>
        <div class="password-row">
          <input id="site-password" name="password" type="password" autocomplete="current-password" placeholder="Enter password" aria-describedby="login-copy" required autofocus>
          <button type="submit">Continue <span aria-hidden="true">&#8594;</span></button>
        </div>
      </form>
      <p class="login-foot">Clinical AI · Cardiac critical care · Translational biology</p>
    </main>
  </body>
</html>`, { status, headers: commonHeaders() });
}

export async function onRequest({ request, env, next }) {
  const password = typeof env.SITE_PASSWORD === "string" ? env.SITE_PASSWORD : "";
  const url = new URL(request.url);

  if (request.method === "POST" && url.pathname === AUTH_PATH) {
    if (!password) return loginPage("Private access is not configured yet.", 503);
    const form = await request.formData();
    const candidate = String(form.get("password") ?? "");
    if (!constantTimeEqual(candidate, password)) return loginPage("That password did not match. Try again.");

    const expiresAt = String(Date.now() + (SESSION_TTL_SECONDS * 1000));
    const token = `${expiresAt}.${await sign(expiresAt, password)}`;
    return new Response(null, {
      status: 303,
      headers: {
        ...securityHeaders,
        Location: "/",
        "Set-Cookie": `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`,
      },
    });
  }

  if (request.method === "GET" && url.pathname === LOGOUT_PATH) {
    return new Response(null, {
      status: 303,
      headers: { ...securityHeaders, Location: "/", "Set-Cookie": `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax` },
    });
  }

  if (!password) return loginPage("Private access is not configured yet.", 503);
  if (!await isValidSession(getCookie(request, SESSION_COOKIE), password)) return loginPage();

  const response = await next();
  const headers = new Headers(response.headers);
  Object.entries(securityHeaders).forEach(([key, value]) => headers.set(key, value));
  headers.set("Cache-Control", "private, no-store");
  headers.set("Vary", "Cookie");

  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
