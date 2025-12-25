'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useCartItems } from '@/store/cart-store';

export function useFloatingCart() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastItemCount, setLastItemCount] = useState(0);
  const items = useCartItems();
  const pathname = usePathname();

  const itemCount = items.length;

  // Check if user is on cart or checkout page
  const isCartPage = pathname === '/cart' || pathname === '/checkout';

  // Show floating cart when item is added
  useEffect(() => {
    if (itemCount > lastItemCount && itemCount > 0) {
      // New item added - show cart even if dismissed
      setIsVisible(true);
      setIsDismissed(false);
    } else if (itemCount === 0) {
      // Cart is empty - hide
      setIsVisible(false);
      setIsDismissed(false);
    } else if (itemCount > 0 && !isDismissed && !isCartPage) {
      // Cart has items and not dismissed - show
      setIsVisible(true);
    }

    setLastItemCount(itemCount);
  }, [itemCount, isDismissed, isCartPage, lastItemCount]);

  // Hide when on cart/checkout page
  useEffect(() => {
    if (isCartPage) {
      setIsVisible(false);
    }
  }, [isCartPage]);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    setIsDismissed(true);
  }, []);

  const show = useCallback(() => {
    setIsVisible(true);
    setIsDismissed(false);
  }, []);

  return {
    isVisible,
    dismiss,
    show,
    itemCount,
  };
}

