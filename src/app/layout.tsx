import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FANDERS — Friends And New Developers',
  description: 'FANDERS membantu membangun website, aplikasi web, UI/UX, dashboard, dan integrasi sistem dari Surabaya, Indonesia.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
