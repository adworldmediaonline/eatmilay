/**
 * Role-based access control utilities
 * Roles: SUPER_ADMIN > ADMIN > USER
 */

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type Role = UserRole | string;

/**
 * Check if a role has permission to perform an action
 */
export function hasRole(userRole: Role | null | undefined, requiredRole: UserRole): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.ADMIN]: 2,
    [UserRole.SUPER_ADMIN]: 3,
  };

  const userLevel = roleHierarchy[userRole as UserRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

/**
 * Check if user is Super Admin
 */
export function isSuperAdmin(role: Role | null | undefined): boolean {
  return role === UserRole.SUPER_ADMIN;
}

/**
 * Check if user is Admin or Super Admin
 */
export function isAdmin(role: Role | null | undefined): boolean {
  return hasRole(role, UserRole.ADMIN);
}

/**
 * Check if user can manage other users
 */
export function canManageUsers(userRole: Role | null | undefined): boolean {
  return hasRole(userRole, UserRole.ADMIN);
}

/**
 * Check if sign-up is allowed
 * Initially, only Super Admin can sign up
 * After first Super Admin is created, only Super Admin can create new users
 */
export async function isSignUpAllowed(): Promise<boolean> {
  // This will be checked server-side
  // For now, return true - the server will handle the restriction
  return true;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: Role | null | undefined): string {
  switch (role) {
    case UserRole.SUPER_ADMIN:
      return 'Super Admin';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.USER:
      return 'User';
    default:
      return 'Unknown';
  }
}
