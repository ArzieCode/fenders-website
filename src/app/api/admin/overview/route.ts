import { NextResponse } from 'next/server';
import { verifiedPrincipal } from '@/lib/auth';
import { createServerSupabase } from '@/lib/supabase/server';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export async function GET() {
  try {
    const user = await verifiedPrincipal();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { 'Cache-Control': 'no-store' } });
    const client = await createServerSupabase();
    const tables = ['clients', 'projects', 'services', 'portfolio_projects', 'project_inquiries'] as const;
    const [results, active, completed, newInquiries] = await Promise.all([
      Promise.all(tables.map(table => client.from(table).select('id', { count: 'exact', head: true }))),
      client.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      client.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
      client.from('project_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
    ]);
    if (results.some(result => result.error) || active.error || completed.error || newInquiries.error) throw new Error('Counts unavailable');
    const counts = {
      ...Object.fromEntries(tables.map((table, i) => [table, results[i].count ?? 0])),
      active_projects: active.count ?? 0,
      completed_projects: completed.count ?? 0,
      new_inquiries: newInquiries.count ?? 0,
    };
    return NextResponse.json({ counts, user }, { headers: { 'Cache-Control': 'private, no-store' } });
  } catch { return NextResponse.json({ error: 'Ringkasan tidak tersedia' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
