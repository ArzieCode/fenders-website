import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { isSameOrigin } from '@/lib/origin';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function POST(request: NextRequest) {
  if (!isSameOrigin(request.headers.get('origin'), request.nextUrl.origin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: { 'Cache-Control': 'no-store' } });
  try {
    const client = await createServerSupabase();
    const { error } = await client.auth.signOut();
    if (error) throw error;
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Logout gagal' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
