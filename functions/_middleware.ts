interface PortfolioEnv {
  PORTFOLIO_PASSWORD?: string;
  PORTFOLIO_USERNAME?: string;
}

interface MiddlewareContext {
  env: PortfolioEnv;
  request: Request;
  next: () => Promise<Response>;
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Private portfolio", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
}

function equalBytes(left: Uint8Array, right: Uint8Array) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (left[index % left.length] ?? 0) ^ (right[index % right.length] ?? 0);
  }

  return difference === 0;
}

export const onRequest = async (context: MiddlewareContext) => {
  const expectedPassword = context.env.PORTFOLIO_PASSWORD;
  const expectedUsername = context.env.PORTFOLIO_USERNAME ?? "arnav";

  if (!expectedPassword) {
    return new Response("Portfolio authentication is not configured.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authorization = context.request.headers.get("Authorization");
  if (!authorization?.startsWith("Basic ")) return unauthorized();

  try {
    const encoded = atob(authorization.slice(6));
    const decoded = new TextDecoder().decode(
      Uint8Array.from(encoded, (character) => character.charCodeAt(0)),
    );
    const separator = decoded.indexOf(":");
    if (separator < 0) return unauthorized();

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    const [actual, expected] = await Promise.all([
      digest(`${username}:${password}`),
      digest(`${expectedUsername}:${expectedPassword}`),
    ]);

    if (!equalBytes(actual, expected)) return unauthorized();
  } catch {
    return unauthorized();
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store, max-age=0");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
};
