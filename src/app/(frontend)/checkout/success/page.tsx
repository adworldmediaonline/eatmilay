import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderSuccessContent } from '@/components/checkout/order-success-content';
import { OrderSuccessSkeleton } from '@/components/checkout/order-success-skeleton';

export const metadata: Metadata = {
  title: 'Order Successful | SumnSubstance',
  description: 'Your order has been placed successfully',
};

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Suspense fallback={<OrderSuccessSkeleton />}>
          <OrderSuccessContent />
        </Suspense>
      </div>
    </div>
  );
}
