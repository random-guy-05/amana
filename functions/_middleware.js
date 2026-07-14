/**
 * HTTP Basic Auth for Cloudflare Pages.
 * Set BASIC_USER and BASIC_PASS as Pages secrets / env vars.
 * If BASIC_PASS is unset, auth is skipped (useful for local preview).
 */
const unauthorized = () =>
  new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Arnav Mana — Private", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });

function credentialsMatch(authHeader, user, pass) {
  const [scheme, encoded] = authHeader.split(" ");
  if (scheme !== "Basic" || !encoded) return false;

  try {
    const decoded = atob(encoded);
    const colon = decoded.indexOf(":");
    if (colon === -1) return false;
    const providedUser = decoded.slice(0, colon);
    const providedPass = decoded.slice(colon + 1);
    return providedUser === user && providedPass === pass;
  } catch {
    return false;
  }
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const user = env.BASIC_USER || "arnav";
  const pass = env.BASIC_PASS;

  if (!pass) {
    return next();
  }

  const auth = request.headers.get("Authorization");
  if (!auth || !credentialsMatch(auth, user, pass)) {
    return unauthorized();
  }

  return next();
}
