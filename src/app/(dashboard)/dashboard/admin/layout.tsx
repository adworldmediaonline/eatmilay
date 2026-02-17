import { Suspense } from 'react';
import { AppSidebarAdmin } from '@/components/app-sidebar-admin';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { requireAdmin } from '@/lib/auth/middleware';

async function AuthCheck({ children }: { children: React.ReactNode }) {
  // This will redirect if not authenticated or not admin/super admin
  await requireAdmin();
  return <>{children}</>;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebarAdmin variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <main className="flex-1 px-3">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                </div>
              }>
                <AuthCheck>{children}</AuthCheck>
              </Suspense>
            </main>
          </div>
        </div>
      </SidebarInset>
      <Toaster richColors />
    </SidebarProvider>
  );
}
