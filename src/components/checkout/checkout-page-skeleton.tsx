import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CheckoutPageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Checkout Section Skeleton */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map(step => (
                <div key={step} className="flex items-center">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="ml-3">
                    <Skeleton className="h-4 w-20" />
                  </div>
                  {step < 3 && <Skeleton className="mx-6 h-0.5 w-16" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Badges Skeleton */}
        <div className="flex items-center justify-center gap-6 py-4">
          {[1, 2, 3].map(badge => (
            <div key={badge} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(field => (
                <div key={field} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>

            {/* Address Fields */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map(field => (
                  <div key={field} className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map(method => (
                  <Skeleton key={method} className="h-16 w-full" />
                ))}
              </div>
            </div>

            {/* Action Button */}
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>

        {/* Back Button Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary Section Skeleton */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Items */}
            <div className="space-y-4">
              {[1, 2, 3].map(item => (
                <div key={item} className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </div>

            <Skeleton className="h-px w-full" />

            {/* Order Summary */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map(line => (
                <div key={line} className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
              <Skeleton className="h-px w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3 pt-4 border-t">
              <Skeleton className="h-4 w-40" />
              <div className="space-y-2">
                {[1, 2, 3].map(indicator => (
                  <div key={indicator} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
