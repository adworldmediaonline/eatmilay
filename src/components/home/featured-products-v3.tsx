import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles } from 'lucide-react';
import { FeaturedProductsClient } from './featured-products-client';
import type { SerializedProductWithCategory } from '@/lib/serializers';

interface FeaturedProductsProps {
  products: SerializedProductWithCategory[];
}

export default function FeaturedProductsV3({
  products,
}: FeaturedProductsProps) {
  return (
    <section className="py-20 bg-white font-sans relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Featured Products
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our carefully selected skincare essentials, formulated with
            <span className="text-[hsl(var(--primary))] font-semibold">
              {' '}
              science-backed ingredients
            </span>{' '}
            for visible results.
          </p>
        </div>

        {/* Enhanced Product Grid with Gradients */}
        <FeaturedProductsClient products={products} />
      </div>
    </section>
  );
}
