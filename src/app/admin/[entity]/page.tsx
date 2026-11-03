import { redirect } from 'next/navigation';
import { verifiedPrincipal } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { adminEntityFromPath } from '@/lib/admin-paths';
export const dynamic = 'force-dynamic';
export default async function AdminEntityPage({ params }: { params: Promise<{ entity: string }> }) {
  const user = await verifiedPrincipal();
  if (!user) redirect('/admin/login');
  const segment = (await params).entity;
  const entity = adminEntityFromPath(segment);
  if (!entity && segment !== 'dashboard') redirect('/admin/dashboard');
  return <AdminDashboard user={user} entity={entity} />;
}
