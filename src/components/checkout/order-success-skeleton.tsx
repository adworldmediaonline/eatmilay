import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrderSuccessSkeleton() {
  return (
    <div className="space-y-8">
      {/* Success Header Skeleton */}
      <Card className="text-center">
        <CardContent className="p-8">
          <div className="space-y-4">
            <Skeleton className="mx-auto w-20 h-20 rounded-full" />
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-32" />
            </div>
            <div className="flex justify-center gap-3">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
            <Skeleton className="h-px w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((line) => (
                <Skeleton key={line} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center p-4 border rounded-lg space-y-2">
                <Skeleton className="h-8 w-8 mx-auto rounded" />
                <Skeleton className="h-5 w-24 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}
