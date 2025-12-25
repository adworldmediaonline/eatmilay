'use client';

import React from 'react';
import ProductCard from '@/components/products/product-card';

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
  discount?: number;
  featured?: boolean;
}

// Mock products data
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'SOS Hypochlorous Acid Spray',
    slug: 'sos-hypochlorous-acid-spray',
    price: 399,
    originalPrice: 499,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
        alt: 'SOS Hypochlorous Acid Spray',
      },
    ],
    rating: 4.5,
    reviewCount: 127,
    category: 'Skincare',
    badges: ['Sale'],
    isWishlisted: false,
    inStock: true,
    shortDescription: 'Save Our Skin 72 HRS HYDRATING FACIAL TONER',
    featured: true,
  },
  {
    id: '2',
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-brightening-serum',
    price: 599,
    originalPrice: 799,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
        alt: 'Vitamin C Serum',
      },
    ],
    rating: 4.7,
    reviewCount: 89,
    category: 'Serums',
    badges: ['New'],
    isWishlisted: true,
    inStock: true,
    shortDescription: 'Brightening and anti-aging serum',
    featured: false,
  },
  {
    id: '3',
    name: 'Hydrating Night Cream',
    slug: 'hydrating-night-cream',
    price: 449,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
        alt: 'Night Cream',
      },
    ],
    rating: 4.3,
    reviewCount: 156,
    category: 'Moisturizers',
    badges: [],
    isWishlisted: false,
    inStock: true,
    shortDescription: 'Deep moisturizing night cream',
    featured: true,
  },
  {
    id: '4',
    name: 'Anti-Aging Eye Cream',
    slug: 'anti-aging-eye-cream',
    price: 899,
    originalPrice: 1099,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
        alt: 'Anti-Aging Eye Cream',
      },
    ],
    rating: 4.9,
    reviewCount: 134,
    category: 'Eye Care',
    badges: ['Premium'],
    isWishlisted: false,
    inStock: true,
    shortDescription: 'Advanced eye cream for fine lines and wrinkles',
    featured: true,
  },
  {
    id: '5',
    name: 'Gentle Cleansing Foam',
    slug: 'gentle-cleansing-foam',
    price: 349,
    originalPrice: 449,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
        alt: 'Gentle Cleansing Foam',
      },
    ],
    rating: 4.6,
    reviewCount: 98,
    category: 'Cleansers',
    badges: ['Bestseller'],
    isWishlisted: true,
    inStock: true,
    shortDescription: 'Gentle daily cleanser for all skin types',
    featured: false,
  },
];

export default function FeaturedProducts() {
  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
    // Add cart functionality here
  };

  const handleToggleWishlist = (productId: string) => {
    console.log('Toggle wishlist:', productId);
    // Add wishlist functionality here
  };

  const handleQuickView = (productId: string) => {
    console.log('Quick view:', productId);
    // Add quick view functionality here
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50/30 to-white font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--primary))] mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our premium collection of skincare products, carefully
            crafted with natural ingredients for your skin's health and beauty.
          </p>
        </div>

        {/* Products Grid - Horizontal Layout inspired by client reference */}
        <div className="space-y-6 max-w-6xl mx-auto">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              variant="horizontal"
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-[hsl(var(--primary))] hover:bg-[#1a2e15] text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/30 group">
            <span>Explore All Products</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
