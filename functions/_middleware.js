const encoder = new TextEncoder();
const decoder = new TextDecoder();

function unauthorized() {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="arnavmana.me", charset="UTF-8"',
    },
  });
}

function decodePassword(authorization) {
  if (!authorization?.startsWith("Basic ")) return null;

  try {
    const bytes = Uint8Array.from(atob(authorization.slice(6)), (character) => character.charCodeAt(0));
    const credentials = decoder.decode(bytes);
    const separator = credentials.indexOf(":");

    return separator === -1 ? null : credentials.slice(separator + 1);
  } catch {
    return null;
  }
}

function matchesPassword(candidate, expected) {
  const candidateBytes = encoder.encode(candidate ?? "");
  const expectedBytes = encoder.encode(expected);
  const length = Math.max(candidateBytes.length, expectedBytes.length);
  let difference = candidateBytes.length ^ expectedBytes.length;

  for (let index = 0; index < length; index += 1) {
    difference |= (candidateBytes[index] ?? 0) ^ (expectedBytes[index] ?? 0);
  }

  return difference === 0;
}

export async function onRequest({ request, env, next }) {
  const password = env.SITE_PASSWORD;

  // Never fail open if the production secret has not been configured.
  if (typeof password !== "string" || password.length === 0) return unauthorized();

  if (!matchesPassword(decodePassword(request.headers.get("Authorization")), password)) {
    return unauthorized();
  }

  const response = await next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
