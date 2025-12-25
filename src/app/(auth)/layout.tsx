import { ReactNode } from 'react';
import SiteHeaderStandard from '@/components/layout/site-header-standard';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeaderStandard />
      <main>{children}</main>
    </div>
  );
}

