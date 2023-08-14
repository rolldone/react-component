interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  sameSite?: 'Strict' | 'Lax' | 'None';
  httpOnly?: boolean;
  secure?: boolean;
}

function setCookieValue(name: string, value: any, options: CookieOptions, overrideOptions?: CookieOptions): string {
  const mergedOptions = { ...options, ...overrideOptions };
  const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
  const cookie = `${name}=${encodeURIComponent(serializedValue)}; ${serializeCookieOptions(mergedOptions)}`;
  return cookie;
}

function parseCookieValue(request: Request, name: string) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return null;
  }
  const cookies = cookieHeader.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName.trim() === name) {
      const decodedValue = decodeURIComponent(cookieValue.trim());
      // Check if the value is a valid JSON string
      if (decodedValue.startsWith('{') && decodedValue.endsWith('}')) {
        try {
          const parsedValue = JSON.parse(decodedValue);
          return parsedValue;
        } catch (error) {
          console.error(`Failed to parse cookie value for ${name}:`, error);
          return null;
        }
      }
      // Check if the value is a valid JSON array string
      if (decodedValue.startsWith('[') && decodedValue.endsWith(']')) {
        try {
          const parsedValue = JSON.parse(decodedValue);
          return parsedValue;
        } catch (error) {
          console.error(`Failed to parse cookie value for ${name}:`, error);
          return null;
        }
      }
      // If not a JSON string, return the value as is
      return decodedValue;
    }
  }

  return null;
}


function serializeCookieOptions(options: CookieOptions): string {
  const {
    maxAge = undefined,
    expires = new Date(Date.now() + 60 * 60 * 1000),
    path = '/',
    domain = undefined,
    sameSite = 'Lax',
    httpOnly = true,
    secure = false
  } = options;

  const cookieOptions = [];

  if (path) {
    cookieOptions.push(`Path=${path}`);
  }

  if (expires) {
    cookieOptions.push(`Expires=${expires.toUTCString()}`);
  }

  if (maxAge) {
    cookieOptions.push(`Max-Age=${maxAge}`);
  }

  if (domain) {
    cookieOptions.push(`Domain=${domain}`);
  }

  if (sameSite) {
    cookieOptions.push(`SameSite=${sameSite}`);
  }

  if (httpOnly !== undefined) {
    cookieOptions.push(`HttpOnly=${httpOnly}`);
  }

  if (secure) {
    cookieOptions.push('Secure');
  }

  return cookieOptions.join('; ');
}

const CookieUtils = {
  parseCookieValue,
  setCookieValue
};

export default CookieUtils;
