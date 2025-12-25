'use client';

import { Suspense, ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SiteHeaderPublic from '@/components/layout/site-header-public';
import SiteHeaderStandard from '@/components/layout/site-header-standard';
import Footer from '@/components/layout/footer';

function ConditionalHeader() {
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);

  return isHomePage ? <SiteHeaderPublic /> : <SiteHeaderStandard />;
}

export default function FrontendLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<SiteHeaderStandard />}>
        <ConditionalHeader />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
