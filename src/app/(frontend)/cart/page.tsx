import { Metadata } from 'next';
import { Suspense } from 'react';
import { CartPageContent } from '@/components/cart/cart-page-content';
import { CartPageSkeleton } from '@/components/cart/cart-page-skeleton';

export const metadata: Metadata = {
  title: 'Shopping Cart | SumnSubstance',
  description: 'Review and manage items in your shopping cart',
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout when ready
          </p>
        </div>

        {/* Cart Content */}
        <Suspense fallback={<CartPageSkeleton />}>
          <CartPageContent />
        </Suspense>
      </div>
    </div>
  );
}
