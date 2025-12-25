import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CartPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items Section Skeleton */}
      <div className="lg:col-span-2 space-y-6">
        {/* Cart Header Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
            <Skeleton className="h-px w-full" />
          </CardContent>
        </Card>

        {/* Cart Items Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Top Row */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>

                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex items-center gap-0">
                      <Skeleton className="h-8 w-8 rounded-l" />
                      <Skeleton className="h-8 w-12" />
                      <Skeleton className="h-8 w-8 rounded-r" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Skeleton className="h-10 w-40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Summary Section Skeleton */}
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-px w-full" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-18" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
