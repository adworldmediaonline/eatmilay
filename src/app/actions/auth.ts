'use server';

import { checkSignUpAllowed } from '@/lib/auth/middleware';
import prisma from '@/lib/prisma';

/**
 * Check if sign-up is currently allowed
 * Returns true if:
 * - No users exist (first Super Admin sign-up)
 * - Current user is Super Admin (creating new users)
 */
export async function isSignUpAllowed(): Promise<boolean> {
  try {
    return await checkSignUpAllowed();
  } catch (error) {
    console.error('[AUTH] Error checking sign-up permission:', error);
    return false;
  }
}

/**
 * Get total user count (for checking if first user)
 */
export async function getUserCount(): Promise<number> {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.error('[AUTH] Error getting user count:', error);
    return 0;
  }
}
