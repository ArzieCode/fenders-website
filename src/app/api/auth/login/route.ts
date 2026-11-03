import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { verifiedPrincipal } from '@/lib/auth';
import { isSameOrigin } from '@/lib/origin';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
const noStore = { 'Cache-Control': 'no-store' };
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: noStore });
  try {
    if (Number(request.headers.get('content-length') ?? 0) > 4096) return NextResponse.json({ error: 'Invalid request' }, { status: 413, headers: noStore });
    const { email, password } = await request.json();
    if (typeof email !== 'string' || typeof password !== 'string' || email.length > 254 || password.length > 1024 || !email || !password)
      return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 400, headers: noStore });
    const client = await createServerSupabase();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return NextResponse.json({ error: 'Kredensial tidak valid' }, { status: 401, headers: noStore });
    const principal = await verifiedPrincipal();
    if (!principal) {
      await client.auth.signOut();
      return NextResponse.json({ error: 'Akses tidak diberikan' }, { status: 403, headers: noStore });
    }
    return NextResponse.json({ role: principal.role }, { headers: noStore });
  } catch { return NextResponse.json({ error: 'Login tidak tersedia' }, { status: 503, headers: noStore }); }
}
