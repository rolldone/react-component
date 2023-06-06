interface CookieOptions {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    sameSite?: 'Strict' | 'Lax' | 'None';
    httpOnly?: boolean;
    secure?: boolean;
  }
  
  function setCookieValue(name: string, value: any, options: CookieOptions): string {
    const serializedValue = JSON.stringify(value);
    const cookie = `${name}=${encodeURIComponent(serializedValue)}; ${serializeCookieOptions(options)}`;
    return cookie;
  }
  
  function parseCookieValue(request: Request, name: string): any | null {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return null;
    }
  
    const cookies = cookieHeader.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        const decodedValue = decodeURIComponent(cookieValue.trim());
        try {
          const parsedValue = JSON.parse(decodedValue);
          return parsedValue;
        } catch (error) {
          console.error(`Failed to parse cookie value for ${name}:`, error);
          return null;
        }
      }
    }
  
    return null;
  }
  
  function serializeCookieOptions(options: CookieOptions): string {
    const cookieOptions = [];
  
    if (options.path) {
      cookieOptions.push(`Path=${options.path}`);
    }
  
    if (options.expires) {
      cookieOptions.push(`Expires=${options.expires.toUTCString()}`);
    }
  
    if (options.maxAge) {
      cookieOptions.push(`Max-Age=${options.maxAge}`);
    }
  
    if (options.domain) {
      cookieOptions.push(`Domain=${options.domain}`);
    }
  
    if (options.sameSite) {
      cookieOptions.push(`SameSite=${options.sameSite}`);
    }
  
    if (options.httpOnly) {
      cookieOptions.push('HttpOnly');
    }
  
    if (options.secure) {
      cookieOptions.push('Secure');
    }
  
    return cookieOptions.join('; ');
  }
  
  const CookieUtils = {
    parseCookieValue,
    setCookieValue
  };
  
  export default CookieUtils;
  