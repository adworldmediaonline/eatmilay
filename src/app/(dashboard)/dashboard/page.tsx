import { redirect } from 'next/navigation';
import { requireAuth } from '@/lib/auth/middleware';
import { UserRole, hasRole } from '@/lib/auth/roles';
import type { Session } from '@/lib/auth';

// Type helper for user with additionalFields
type UserWithRole = Session['user'] & { role?: string; initials?: string };

export default async function DashboardPage() {
  const session = await requireAuth();
  const user = session.user as UserWithRole;
  const role = user.role;

  // Redirect based on role - Admin and Super Admin go to admin dashboard
  if (hasRole(role, UserRole.ADMIN)) {
    redirect('/dashboard/admin');
  }

  // Regular users go to user dashboard
  if (hasRole(role, UserRole.USER)) {
    redirect('/dashboard/user');
  }

  // Default fallback - redirect to sign-in if no valid role
  redirect('/sign-in');
}
