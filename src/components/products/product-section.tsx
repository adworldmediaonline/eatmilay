'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

interface ProductSectionProps {
  title: string;
  products: Product[];
  maxItems?: number;
  viewAllUrl?: string;
  viewAllText?: string;
  variant?: 'default' | 'compact' | 'showcase';
  showQuickActions?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;

  loading?: boolean;
}

export default function ProductSection({
  title,
  products,
  maxItems = 12,
  viewAllUrl,
  viewAllText = 'View All',
  variant = 'default',
  showQuickActions = true,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  className = '',

  loading = false,
}: ProductSectionProps) {
  const displayProducts = products.slice(0, maxItems);
  const hasMoreProducts = products.length > maxItems;

  if (loading) {
    return (
      <section className={`py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="min-h-[360px] bg-gray-200 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>

          {hasMoreProducts && viewAllUrl && (
            <Link
              href={viewAllUrl}
              className="group inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Simple Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              variant={variant}
              showQuickActions={showQuickActions}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
