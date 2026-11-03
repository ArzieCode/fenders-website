import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isValidSupabaseUrl } from './lib/supabase/config';

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key || !isValidSupabaseUrl(url)) {
    if (request.nextUrl.pathname === '/admin/login') return NextResponse.next({ headers: { 'Cache-Control': 'private, no-store' } });
    if (request.nextUrl.pathname === '/admin' || request.nextUrl.pathname.startsWith('/admin/')) return NextResponse.redirect(new URL('/admin/login', request.url));
    return new NextResponse('Service unavailable', { status: 503, headers: { 'Cache-Control': 'private, no-store' } });
  }
  let response = NextResponse.next({ request });
  const client = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(items, headers) {
        items.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        items.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers ?? {}).forEach(([name, value]) => response.headers.set(name, value));
      },
    },
  });
  await client.auth.getUser();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*', '/api/auth/:path*'] };
