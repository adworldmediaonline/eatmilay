import { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutPageContent } from '@/components/checkout/checkout-page-content';
import { CheckoutPageSkeleton } from '@/components/checkout/checkout-page-skeleton';

export const metadata: Metadata = {
  title: 'Checkout | SumnSubstance',
  description:
    'Complete your order securely with our streamlined checkout process',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-600">
            Complete your order with our secure payment process
          </p>
        </div>

        {/* Checkout Content */}
        <Suspense fallback={<CheckoutPageSkeleton />}>
          <CheckoutPageContent />
        </Suspense>
      </div>
    </div>
  );
}
