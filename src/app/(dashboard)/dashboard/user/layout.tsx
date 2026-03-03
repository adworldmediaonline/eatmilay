import { connection } from 'next/server';
import { Suspense } from 'react';
import { AppSidebarUser } from '@/components/app-sidebar-user';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@/lib/auth';
import { hasRole, UserRole } from '@/lib/auth/roles';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function UserLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  if (hasRole(session.user.role, UserRole.ADMIN)) {
    redirect('/dashboard/admin');
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebarUser variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <main className="flex-1 px-3">{children}</main>
          </div>
        </div>
      </SidebarInset>
      <Toaster richColors />
    </SidebarProvider>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <UserLayoutContent>{children}</UserLayoutContent>
    </Suspense>
  );
}
