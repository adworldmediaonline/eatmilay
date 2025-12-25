'use client';

import React from 'react';
import ProductCard from './product-card';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt?: string }[];
  rating?: number;
  reviewCount?: number;
  category?: string;
  badges?: string[];
  isWishlisted?: boolean;
  inStock?: boolean;
  shortDescription?: string;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4 | 5;
  variant?: 'default' | 'compact' | 'featured' | 'showcase';
  showQuickActions?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  columns = 4,
  variant = 'default',
  showQuickActions = true,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  className = '',
  loading = false,
  emptyMessage = 'No products found',
}: ProductGridProps) {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5:
        return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  const getGap = () => {
    return variant === 'compact' ? 'gap-3' : 'gap-4 lg:gap-6';
  };

  if (loading) {
    return (
      <div className={`grid ${getGridColumns()} ${getGap()} ${className}`}>
        {Array.from({ length: columns * 2 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1m16 0V4a1 1 0 00-1-1H6a1 1 0 00-1 1v1"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridColumns()} ${getGap()} ${className}`}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant === 'featured' ? 'showcase' : variant}
          showQuickActions={showQuickActions}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
