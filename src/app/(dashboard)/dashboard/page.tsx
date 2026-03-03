import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/middleware';
import { UserRole, hasRole } from '@/lib/auth/roles';
import type { Session } from '@/lib/auth';

type UserWithRole = Session['user'] & { role?: string; initials?: string };

async function DashboardRedirect(): Promise<React.ReactNode> {
  const session = await requireAuth();
  const user = session.user as UserWithRole;
  const role = user.role;

  if (hasRole(role, UserRole.ADMIN)) {
    redirect('/dashboard/admin');
  }
  if (hasRole(role, UserRole.USER)) {
    redirect('/dashboard/user');
  }
  redirect('/sign-in');
  return null;
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <DashboardRedirect />
    </Suspense>
  );
}
