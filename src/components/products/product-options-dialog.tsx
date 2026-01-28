'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProductOptionsContent } from '@/components/products/product-options-content';
import { getProductBySlugAction } from '@/app/actions/product';
import type { SerializedProductWithCategory } from '@/server/queries/product';

export interface ProductOptionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productSlug: string | null;
}

export function ProductOptionsDialog({
  open,
  onOpenChange,
  productSlug,
}: ProductOptionsDialogProps) {
  const [product, setProduct] = useState<SerializedProductWithCategory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !productSlug) {
      setProduct(null);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProductBySlugAction(productSlug)
      .then((p) => {
        if (!cancelled) {
          setProduct(p);
          if (!p) setError('Product not found.');
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e?.message || 'Failed to load product.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [open, productSlug]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {product ? product.name : 'Product options'}
          </DialogTitle>
        </DialogHeader>
        {loading && (
          <div className="py-12 flex items-center justify-center text-muted-foreground">
            Loading…
          </div>
        )}
        {error && !loading && (
          <div className="py-8 text-center text-destructive">{error}</div>
        )}
        {product && !loading && !error && (
          <ProductOptionsContent
            product={product}
            variant="dialog"
            showBuyNow
            onAfterAddToCart={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
