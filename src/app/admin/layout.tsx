import type { ReactNode } from 'react';
export const dynamic = 'force-dynamic';
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div style={{ minHeight: '100vh', background: '#0b1424', color: '#e8efff', fontFamily: 'Arial, sans-serif', padding: '24px' }}>{children}</div>;
}
