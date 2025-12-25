'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';
import ProductCard from '@/components/products/product-card';
import type { SerializedProductWithCategory } from '@/lib/serializers';
import type { ReviewAggregates } from '@/types/review';

interface ProductWithReviews extends SerializedProductWithCategory {
  reviewStats?: ReviewAggregates;
}

interface ProductsGridProps {
  products: ProductWithReviews[];
  totalCount: number;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export default function ProductsGrid({
  products,
  totalCount,
  hasMore,
  loading,
  onLoadMore,
}: ProductsGridProps) {
  const addItem = useAddItem();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      excerpt: product.excerpt || undefined,
      mainImage: product.mainImage,
      category: product.category,
    };

    addItem(cartProduct, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="space-y-6 relative">
      {loading && products.length === 0 && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Searching products...</p>
          </div>
        </div>
      )}

      {/* Header removed per request */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr relative">
        {loading && products.length > 0 && (
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Updating results...</p>
            </div>
          </div>
        )}
        {products.map((product) => {
          const rating = product.reviewStats?.averageRating || 0;
          const reviewCount = product.reviewStats?.totalReviews || 0;

          return (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                images: product.mainImage
                  ? [{ url: product.mainImage.url, alt: product.mainImage.altText }]
                  : [],
                category: product.category?.name,
                inStock: true,
                rating: rating > 0 ? rating : undefined,
                reviewCount: reviewCount > 0 ? reviewCount : undefined,
              }}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </div>

      {hasMore && (
        <div className="flex justify-center py-8">
          <Button
            onClick={onLoadMore}
            disabled={loading}
            variant="outline"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More Products'
            )}
          </Button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-muted-foreground py-8">
          You've reached the end of the catalog
        </p>
      )}

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No products found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
