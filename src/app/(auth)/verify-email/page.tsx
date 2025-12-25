import { Suspense } from 'react';
import { VerifyOTPForm } from '@/components/auth/verify-otp';
import { Skeleton } from '../../../components/ui/skeleton';

export default function SignInPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<VerifyOTPSkeleton />}>
          <VerifyOTPForm />
        </Suspense>
      </div>
    </div>
  );
}

const VerifyOTPSkeleton = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};
