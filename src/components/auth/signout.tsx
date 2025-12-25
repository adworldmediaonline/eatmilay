'use client';
import { IconLogout } from '@tabler/icons-react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export function SignOut() {
  const router = useRouter();
  return (
    <DropdownMenuItem
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success('Signed out successfully');
              router.push('/sign-in');
            },
            onError: error => {
              toast.error(error.error.message);
            },
          },
        });
      }}
    >
      <IconLogout />
      Log out
    </DropdownMenuItem>
  );
}
