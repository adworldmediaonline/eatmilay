import { Metadata } from 'next';
import { Suspense } from 'react';
import { OrderFailureContent } from '@/components/checkout/order-failure-content';

export const metadata: Metadata = {
  title: 'Payment Failed | SumnSubstance',
  description: 'Payment failed - please try again',
};

export default function OrderFailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderFailureContent />
        </Suspense>
      </div>
    </div>
  );
}
