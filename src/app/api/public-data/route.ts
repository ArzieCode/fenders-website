import { NextResponse } from 'next/server';
import { getPublicData } from '@/lib/public-data';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET() {
  try {
    return NextResponse.json(await getPublicData(), { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return NextResponse.json({ error: 'Konten belum tersedia' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
