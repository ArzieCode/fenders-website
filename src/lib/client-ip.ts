import { isIP } from 'node:net';

/** Only Netlify's injected client header is trusted in production. */
export function trustedClientIp(headers: Headers, environment: string | undefined, host: string, netlify = false): string | null {
  if (netlify) {
    const address = headers.get('x-nf-client-connection-ip')?.trim();
    return address && isIP(address) ? address : null;
  }
  if (environment === 'development' && /^(localhost|127\.0\.0\.1)(:\d+)?$/.test(host)) return '127.0.0.1';
  return null;
}
