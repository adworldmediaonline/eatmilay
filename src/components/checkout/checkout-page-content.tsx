'use client';

import React, { useState } from 'react';
import { CheckoutForm } from '@/components/checkout/checkout-form';
import { CheckoutSummary } from '@/components/checkout/checkout-summary';
import { EmptyCartRedirect } from '@/components/checkout/empty-cart-redirect';
import {
  useCartItems,
} from '@/store/cart-store';
import { authClient } from '@/lib/auth-client';

export function CheckoutPageContent() {
  const { data: session } = authClient.useSession();
  const items = useCartItems();

  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if cart is empty
  if (items.length === 0) {
    return <EmptyCartRedirect />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Checkout Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Checkout Form */}
        <CheckoutForm
          isProcessing={isProcessing}
          onProcessingChange={setIsProcessing}
          user={session?.user}
        />

      </div>

      {/* Order Summary Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
