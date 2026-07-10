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
      :root { color-scheme: dark; --ink: #f1efe8; --muted: #9aa6b3; --line: #2b3744; --canvas: #090c11; --mint: #88e0c2; --mint-bright: #b2f0d9; --coral: #ff9d78; }
      * { box-sizing: border-box; }
      body { min-width: 320px; min-height: 100vh; margin: 0; padding: 24px; display: grid; place-items: center; overflow-x: hidden; background: var(--canvas); color: var(--ink); font-family: "DM Sans", "Segoe UI", Arial, sans-serif; }
      body::before, body::after { position: fixed; content: ""; pointer-events: none; }
      body::before { width: 1px; height: 62vh; top: 19vh; left: 12vw; background: rgba(136, 224, 194, .16); }
      body::after { width: 31vw; height: 1px; top: 18vh; right: 0; background: var(--coral); opacity: .55; }
      .login-shell { position: relative; width: min(100%, 500px); padding: 48px; border: 1px solid rgba(154, 166, 179, .28); border-radius: 8px; background: rgba(16, 22, 30, .97); box-shadow: 0 28px 80px rgba(0, 0, 0, .38); }
      .login-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 64px; color: var(--muted); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }
      .login-mark { display: grid; place-items: center; width: 38px; height: 38px; border: 1px solid var(--mint); border-radius: 50%; color: var(--mint); font-size: 10px; font-weight: 700; letter-spacing: .04em; }
      .login-status { display: inline-flex; align-items: center; gap: 8px; }
      .login-status::before { width: 6px; height: 6px; content: ""; border-radius: 50%; background: var(--mint); box-shadow: 0 0 0 4px rgba(136, 224, 194, .12); }
      .login-eyebrow { margin: 0 0 16px; color: var(--mint); font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      h1 { max-width: 410px; margin: 0 0 18px; font-family: Georgia, serif; font-size: 3.8rem; font-weight: 400; letter-spacing: 0; line-height: 1.02; }
      h1 em { color: var(--mint); font-style: normal; }
      .login-copy { max-width: 370px; margin: 0 0 32px; color: var(--muted); font-size: 14px; line-height: 1.6; }
      label { display: block; margin-bottom: 9px; color: #cbd4da; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
      .password-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; }
      input { min-width: 0; width: 100%; height: 52px; padding: 0 15px; border: 1px solid var(--line); border-radius: 5px; outline: none; background: #0a0e14; color: var(--ink); font-size: 16px; transition: border-color .18s ease, box-shadow .18s ease; }
      input::placeholder { color: #64717e; }
      input:focus { border-color: var(--mint); box-shadow: 0 0 0 3px rgba(136, 224, 194, .12); }
      button { height: 52px; padding: 0 19px; border: 1px solid var(--mint); border-radius: 5px; background: var(--mint); color: #07130f; cursor: pointer; font-family: "DM Sans", "Segoe UI", Arial, sans-serif; font-size: 12px; font-weight: 700; white-space: nowrap; transition: background .18s ease, border-color .18s ease, transform .18s ease; }
      button span { margin-left: 7px; }
      button:hover { border-color: var(--mint-bright); background: var(--mint-bright); transform: translateY(-1px); }
      .login-message { margin: 0 0 15px; padding: 10px 12px; border-left: 2px solid var(--coral); background: rgba(255, 157, 120, .08); color: #ffc0a8; font-size: 13px; line-height: 1.45; }
      .login-foot { margin: 30px 0 0; padding-top: 17px; border-top: 1px solid var(--line); color: #667381; font-size: 11px; }
      @media (max-width: 540px) { body { padding: 16px; } .login-shell { padding: 30px 24px; } .login-top { margin-bottom: 58px; } h1 { font-size: 3rem; } .password-row { grid-template-columns: 1fr; } button { width: 100%; } }
      @media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; transition: none !important; } }
    </style>
  </head>
  <body>
    <main class="login-shell">
      <div class="login-top"><span class="login-mark" aria-hidden="true">AM</span><span class="login-status">Private portfolio</span></div>
      <p class="login-eyebrow">Arnav Mana / Private research portfolio</p>
      <h1>Private research <em>archive.</em></h1>
      <p class="login-copy" id="login-copy">Enter the password to view current projects, methods, and community work.</p>
      ${messageMarkup}
      <form action="${AUTH_PATH}" method="post">
        <label for="site-password">Password</label>
        <div class="password-row">
          <input id="site-password" name="password" type="password" autocomplete="current-password" placeholder="Enter password" aria-describedby="login-copy" required autofocus>
          <button type="submit">Continue <span aria-hidden="true">&#8594;</span></button>
        </div>
      </form>
      <p class="login-foot">Clinical AI, cardiac critical care, and translational biology</p>
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
