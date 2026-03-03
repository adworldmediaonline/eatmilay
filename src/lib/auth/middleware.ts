import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserRole, hasRole } from './roles';
import type { Session } from '@/lib/auth';

// Type helper to access user with additionalFields
type UserWithRole = Session['user'] & { role?: string; initials?: string };

/**
 * Get current session server-side
 */
export async function getSession(): Promise<Session | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error('[AUTH] Error getting session:', error);
    return null;
  }
}

/**
 * Require authentication - redirects to sign-in if not authenticated
 */
export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    redirect('/sign-in');
  }
  
  return session;
}

/**
 * Require specific role - redirects if user doesn't have required role
 */
export async function requireRole(requiredRole: UserRole): Promise<Session> {
  const session = await requireAuth();
  const user = session.user as UserWithRole;
  
  if (!hasRole(user.role, requiredRole)) {
    redirect('/unauthorized');
  }
  
  return session;
}

/**
 * Require Super Admin role
 */
export async function requireSuperAdmin(): Promise<Session> {
  return requireRole(UserRole.SUPER_ADMIN);
}

/**
 * Require Admin or Super Admin role
 */
export async function requireAdmin(): Promise<Session> {
  const session = await requireAuth();
  const user = session.user as UserWithRole;
  
  if (!hasRole(user.role, UserRole.ADMIN)) {
    redirect('/unauthorized');
  }
  
  return session;
}

/**
 * Check if user has role (non-blocking)
 */
export async function checkRole(requiredRole: UserRole): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  const user = session.user as UserWithRole;
  return hasRole(user.role, requiredRole);
}

/**
 * Check if sign-up is allowed
 * Only allow if no users exist (first Super Admin) or if current user is Super Admin
 */
export async function checkSignUpAllowed(): Promise<boolean> {
  const session = await getSession();
  
  // If no session, check if any users exist
  if (!session) {
    const { default: prisma } = await import('@/lib/prisma');
    const userCount = await prisma.user.count();
    return userCount === 0; // Only allow if no users exist
  }
  
  // If session exists, only Super Admin can create new users
  const user = session.user as UserWithRole;
  return hasRole(user.role, UserRole.SUPER_ADMIN);
}
