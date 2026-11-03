import { redirect } from 'next/navigation';
import { verifiedPrincipal } from '@/lib/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
export const dynamic = 'force-dynamic';
export default async function AdminPage() {
  const user = await verifiedPrincipal();
  if (!user) redirect('/admin/login');
  return <AdminDashboard user={user} />;
}
