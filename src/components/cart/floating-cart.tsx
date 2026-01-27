'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFloatingCart } from '@/hooks/use-floating-cart';
import {
  useCartItems,
  useCartTotalPrice,
} from '@/store/cart-store';
import { CheckCircle, ChevronRight, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function FloatingCart() {
  const { isVisible, dismiss, itemCount } = useFloatingCart();
  const items = useCartItems();
  const totalPrice = useCartTotalPrice();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  // Track recently added items for success animation
  useEffect(() => {
    if (isVisible && items.length > 0) {
      const latestItem = items[items.length - 1];
      setRecentlyAdded(latestItem.product.id);
      setShowSuccess(true);
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
        setIsAnimating(false);
        setRecentlyAdded(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, items.length, items]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isVisible, dismiss]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating Cart Card - Bottom Center */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[90vw] max-w-md z-50 transition-all duration-500 ease-out ${isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-[120%] opacity-0 scale-95 pointer-events-none'
          }`}
        role="dialog"
        aria-label="Shopping cart notification"
        aria-live="polite"
      >
        <div
          className={`relative bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-transform duration-300 ${isAnimating ? 'scale-[1.02]' : 'scale-100'
            }`}
        >
          {/* Compact Layout Container */}
          <Link
            href="/cart"
            className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={dismiss}
          >
            {/* Cart Icon */}
            <div className="w-8 h-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>

            {/* Horizontal Scrollable Items with Overlap */}
            <div className="flex-1 overflow-hidden">
              <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pl-2 py-1">
                {items.map((item, index) => {
                  // Create unique key that includes product, variant, and bundle IDs
                  const uniqueKey = `${item.product.id}-${item.product.variantId || 'no-variant'}-${item.product.bundleId || 'no-bundle'}`;
                  return (
                  <div
                    key={uniqueKey}
                    className="relative"
                    style={{
                      marginLeft: index > 0 ? '-8px' : '0',
                      zIndex: items.length - index,
                    }}
                  >
                    {/* Circular Product Image */}
                    <div
                      className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 border-2 border-white shadow-sm ${recentlyAdded === item.product.id
                        ? 'ring-2 ring-[hsl(var(--primary))] scale-110'
                        : 'hover:scale-105'
                        }`}
                    >
                      {item.product.mainImage ? (
                        <Image
                          src={item.product.mainImage.url}
                          alt={
                            item.product.mainImage.altText ||
                            item.product.name
                          }
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-200">
                          <ShoppingBag className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                    </div>

                    {/* Success Badge */}
                    {recentlyAdded === item.product.id && showSuccess && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                        <CheckCircle className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right">
                <span className="text-xs text-gray-600">₹{totalPrice.toLocaleString()}</span>
                <p className="text-[10px] text-gray-500">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
              </div>
              {/* Arrow Icon */}
              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </Link>

          {/* Close Button - Outside Link */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-400 hover:text-gray-600 z-10"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
}

