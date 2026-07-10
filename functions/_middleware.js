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
    <meta name="theme-color" content="#090c11">
    <title>Private portfolio | Arnav Mana</title>
    <style>
      :root { color-scheme: dark; --ink: #f1efe8; --muted: #9aa6b3; --line: #2b3744; --canvas: #090c11; --mint: #88e0c2; --coral: #ff9d78; }
      * { box-sizing: border-box; }
      body { min-width: 320px; min-height: 100vh; margin: 0; display: grid; place-items: center; overflow: hidden; background: var(--canvas); color: var(--ink); font-family: Arial, sans-serif; }
      body::before, body::after { position: fixed; content: ""; pointer-events: none; }
      body::before { inset: 9vh 7vw; border: 1px solid rgba(136, 224, 194, .12); transform: rotate(-4deg); }
      body::after { width: 46vw; height: 1px; top: 24vh; left: -8vw; background: var(--coral); opacity: .65; transform: rotate(-20deg); box-shadow: 0 180px 0 rgba(136, 224, 194, .5), 0 360px 0 rgba(158, 186, 255, .35); }
      .login-shell { position: relative; width: min(100% - 40px, 520px); padding: 44px; border: 1px solid rgba(154, 166, 179, .28); background: rgba(15, 20, 27, .94); box-shadow: 22px 22px 0 rgba(5, 8, 11, .52); }
      .login-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 76px; color: var(--muted); font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
      .login-mark { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid var(--mint); border-radius: 50%; color: var(--mint); font-size: 10px; font-weight: 700; }
      .login-status { display: inline-flex; align-items: center; gap: 7px; }
      .login-status::before { width: 6px; height: 6px; content: ""; border-radius: 50%; background: var(--mint); box-shadow: 0 0 0 4px rgba(136, 224, 194, .12); }
      .login-eyebrow { margin: 0 0 17px; color: var(--mint); font-size: 10px; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; }
      h1 { margin: 0 0 17px; font-family: Georgia, serif; font-size: clamp(42px, 9vw, 70px); font-weight: 400; letter-spacing: -.055em; line-height: .98; }
      h1 em { color: var(--mint); font-style: normal; }
      .login-copy { max-width: 350px; margin: 0 0 32px; color: var(--muted); font-size: 14px; line-height: 1.6; }
      label { display: block; margin-bottom: 9px; color: #cbd4da; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
      .password-row { display: flex; gap: 9px; }
      input { min-width: 0; flex: 1; height: 49px; padding: 0 14px; border: 1px solid var(--line); border-radius: 3px; outline: none; background: #0a0e14; color: var(--ink); font-size: 16px; transition: border-color .18s ease, box-shadow .18s ease; }
      input:focus { border-color: var(--mint); box-shadow: 0 0 0 3px rgba(136, 224, 194, .12); }
      button { height: 49px; padding: 0 17px; border: 1px solid var(--mint); border-radius: 3px; background: var(--mint); color: #07130f; cursor: pointer; font-size: 12px; font-weight: 700; white-space: nowrap; }
      button:hover { background: #b2f0d9; }
      .login-message { margin: 0 0 14px; color: var(--coral); font-size: 13px; }
      .login-foot { margin: 29px 0 0; padding-top: 17px; border-top: 1px solid var(--line); color: #667381; font-size: 11px; }
      @media (max-width: 520px) { .login-shell { padding: 28px; } .login-top { margin-bottom: 62px; } .password-row { display: grid; grid-template-columns: 1fr; } button { width: 100%; } }
      @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
    </style>
  </head>
  <body>
    <main class="login-shell">
      <div class="login-top"><span class="login-mark" aria-hidden="true">AM</span><span class="login-status">Private portfolio</span></div>
      <p class="login-eyebrow">Arnav Mana / Clinical AI Researcher</p>
      <h1>Enter the <em>signal.</em></h1>
      <p class="login-copy">This research portfolio is private. Use the access password to continue.</p>
      ${messageMarkup}
      <form action="${AUTH_PATH}" method="post">
        <label for="site-password">Password</label>
        <div class="password-row">
          <input id="site-password" name="password" type="password" autocomplete="current-password" required autofocus>
          <button type="submit">Unlock portfolio</button>
        </div>
      </form>
      <p class="login-foot">Clinical AI / Computational biology / Cardiac critical care</p>
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
