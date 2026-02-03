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
        className="max-w-lg flex flex-col overflow-hidden max-h-[90vh] h-[85vh] sm:h-[80vh]"
      >
        <DialogHeader className="shrink-0 py-0">
          <DialogTitle className="sr-only">
            {product ? product.name : 'Product options'}
          </DialogTitle>
        </DialogHeader>
        {loading && (
          <div className="flex-1 min-h-0 py-12 flex items-center justify-center text-muted-foreground">
            Loading…
          </div>
        )}
        {error && !loading && (
          <div className="flex-1 min-h-0 py-8 text-center text-destructive">{error}</div>
        )}
        {product && !loading && !error && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <ProductOptionsContent
              product={product}
              variant="dialog"
              showBuyNow
              onAfterAddToCart={() => onOpenChange(false)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
