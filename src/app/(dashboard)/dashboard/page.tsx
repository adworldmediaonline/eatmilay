import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

async function DashboardRedirect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    redirect('/sign-in');
  }

  if (session?.user.role === 'admin') {
    redirect('/dashboard/admin');
  }

  if (session?.user.role === 'user') {
    redirect('/dashboard/user');
  }

  return null;
}

export default async function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      }
    >
      <DashboardRedirect />
    </Suspense>
  );
}
