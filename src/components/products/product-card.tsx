'use client';

import { Eye, Heart, Share, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'showcase' | 'elegant' | 'horizontal';
  showQuickActions?: boolean;
  showWishlist?: boolean;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  className?: string;
}

export default function ProductCard({
  product,
  variant = 'default',
  showQuickActions = true,
  showWishlist = true,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  className = '',
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onAddToCart?.(product.id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onToggleWishlist?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add share functionality here
  };

  const displayImage = product.images[0]?.url || '/placeholder-product.jpg';

  // Horizontal variant - beautiful design with proper brand colors and spacing
  if (variant === 'horizontal') {
    return (
      <div
        className={`group relative bg-card rounded-2xl overflow-hidden font-sans ${className}`}
      >
        <div className="flex flex-col sm:flex-row min-h-[280px] sm:min-h-[240px] lg:min-h-[220px]">
          {/* Image Section - Beautiful gradient background */}
          <div className="relative sm:w-2/5 lg:w-2/5 aspect-[4/3] sm:aspect-auto overflow-hidden brand-gradient-reverse">
            <Link href={`/products/${product.slug}`} className="block h-full">
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className="object-cover p-2 sm:p-3 lg:p-4 drop-shadow-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </Link>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-5 lg:right-5 flex gap-2">
              <button
                onClick={handleToggleWishlist}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 ${product.isWishlisted
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600'
                    }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg"
                aria-label="Share product"
              >
                <Share className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content Section - Beautifully spaced */}
          <div className="sm:w-3/5 lg:w-3/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            {/* Header Section */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest bg-secondary/20 px-2 py-1 rounded-md w-fit">
                      SumNSubstance
                    </span>
                    {product.rating && product.reviewCount && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < Math.floor(product.rating!)
                              ? 'fill-secondary text-secondary'
                              : 'text-gray-200'
                              }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="group/link block"
                  >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground line-clamp-2 group-hover/link:text-primary transition-colors leading-tight mb-2 sm:mb-3">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                    {product.shortDescription ||
                      "Premium skincare product crafted with natural ingredients for your skin's health and beauty."}
                  </p>
                </div>
              </div>
            </div>

            {/* Price & Actions Section */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-md text-xs font-bold">
                        SAVE ₹
                        {(
                          product.originalPrice - product.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-foreground">
                  Quantity
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-8 h-8 sm:w-9 sm:h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    -
                  </button>
                  <div className="w-12 h-8 sm:w-14 sm:h-9 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white">
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 bg-primary text-white rounded-lg flex items-center justify-center font-bold text-sm">
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed text-sm hover:shadow-lg hover:shadow-primary/25 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </div>
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-secondary hover:bg-secondary/90 disabled:bg-muted disabled:text-muted-foreground text-primary font-semibold py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed text-sm hover:shadow-lg hover:shadow-secondary/25 transform hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Buy Now
                  </div>
                </button>
              </div>

              {/* Footer Actions - Better UX */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
                <button
                  onClick={handleQuickView}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  <Eye className="w-4 h-4" />
                  Quick View
                </button>
                <span className="text-border hidden sm:block">•</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  Full Details
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Elegant variant inspired by the reference design - less boxy, more spacious
  if (variant === 'elegant') {
    return (
      <div
        className={`relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 font-sans ${className}`}
      >
        {/* Image Container - More spacious, less constrained */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-t-lg sm:rounded-t-xl lg:rounded-t-2xl">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover p-2 sm:p-3 lg:p-4"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </Link>

          {/* Minimal Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 lg:top-6 lg:left-6">
              <div className="bg-[hsl(var(--primary))] text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">
                Sale
              </div>
            </div>
          )}

          {/* Floating Action Buttons */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 flex gap-2">
            {showWishlist && (
              <button
                onClick={handleToggleWishlist}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 ${product.isWishlisted
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600'
                    }`}
                />
              </button>
            )}
            <button
              onClick={handleShare}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
              aria-label="Share"
            >
              <Share className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-600" />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-full">
                <span className="text-gray-800 font-medium text-sm">
                  Out of Stock
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section - More spacious like the reference */}
        <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
          {/* Brand */}
          <div>
            <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wider">
              SOLVED LABS
            </span>
          </div>

          {/* Product Name - Larger, more prominent */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Price Section - Clean and spacious */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
              <div className="flex items-baseline gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm text-gray-500">MRP</span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  Rs. {(product.price * 1.25).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Rs. {product.price.toFixed(2)}
                </span>
                <span className="bg-[hsl(var(--primary))] text-white px-2 py-1 rounded text-xs font-medium">
                  Sale
                </span>
              </div>
            </div>
            <div className="text-xs sm:text-sm">
              <Link href="#" className="text-gray-600 underline">
                Shipping
              </Link>
              <span className="text-gray-600"> calculated at checkout.</span>
            </div>
          </div>

          {/* Size Selection - More spacious */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-900">Size</div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-[hsl(var(--primary))] text-white rounded-xl text-sm font-medium">
                50ML
              </button>
              <button className="px-5 py-2.5 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] rounded-xl text-sm font-medium hover:bg-[hsl(var(--primary))] hover:text-white transition-colors">
                100ML
              </button>
            </div>
          </div>

          {/* Quantity - Simple design */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-900">Quantity</div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[hsl(var(--primary))] text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg">
                -
              </button>
              <div className="w-12 h-8 sm:w-14 sm:h-9 lg:w-16 lg:h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white">
                <span className="text-sm font-medium">1</span>
              </div>
              <button className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-[hsl(var(--primary))] text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg">
                +
              </button>
            </div>
          </div>

          {/* Action Buttons - More spacious */}
          <div className="space-y-3 sm:space-y-4 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] disabled:bg-gray-300 text-white font-semibold py-3 sm:py-3.5 lg:py-4 rounded-xl transition-all duration-300 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-[hsl(var(--primary))]/30 text-sm sm:text-base"
            >
              Add to cart
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white font-semibold py-3 sm:py-3.5 lg:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base"
            >
              Shop now
            </button>
          </div>

          {/* Footer Actions - Better UX */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-gray-100">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[hsl(var(--primary))] transition-colors py-2"
            >
              <Share className="w-4 h-4" />
              Share
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleQuickView}
                className="flex items-center gap-1 text-sm text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] font-medium transition-colors py-2"
              >
                <Eye className="w-4 h-4" />
                Quick View
              </button>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-[hsl(var(--primary))] transition-colors py-2"
              >
                Full Details
                <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isCompact = variant === 'compact';
  const isShowcase = variant === 'showcase';

  // Dynamic sizing and styling
  const imageHeight = isCompact ? 'h-40' : isShowcase ? 'h-56' : 'h-48';
  const padding = isCompact ? 'p-3' : 'p-4';
  const titleSize = isShowcase
    ? 'text-lg font-semibold'
    : 'text-base font-medium';

  // Deal content commented out - uncomment when deals are back
  // const discount = Math.floor(Math.random() * 31) + 10; // 10-40% discount

  // const originalPrice = product.price / (1 - discount / 100);

  return (
    <div
      className={`relative bg-white rounded-2xl overflow-hidden shadow-sm font-sans flex flex-col h-full ${className}`}
    >
      {/* Image Container */}
      <div className={`relative ${imageHeight} w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white flex-shrink-0`}>
        <Link href={`/products/${product.slug}`} className="block h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes={
              isCompact
                ? '(max-width: 768px) 50vw, 25vw'
                : '(max-width: 768px) 100vw, 33vw'
            }
            priority={isShowcase}
          />
        </Link>

        {/* Modern Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {/* Deal badge commented out - uncomment when deals are back */}
          {/* <div className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            FLAT {discount}% OFF
          </div> */}
          {product.featured && (
            <div className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg">
              ⭐ Featured
            </div>
          )}
        </div>


        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/95 px-4 py-2 rounded-full">
              <span className="text-gray-800 font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={`${padding} flex flex-col flex-1 h-full`}>
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3
            className={`${titleSize} text-gray-900 mb-2 line-clamp-2 leading-snug`}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating & Reviews */}
        {product.rating && product.reviewCount && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating!)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-200'
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          {/* Deal pricing commented out - uncomment when deals are back */}
          {/* <span className="text-sm text-gray-500 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
            {discount}% OFF
          </span> */}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[hsl(var(--primary))] disabled:bg-gray-200 disabled:text-gray-500 text-white font-semibold py-2.5 rounded-xl disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Modern Border Effect */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-200 pointer-events-none"></div>

      {/* Focus Ring for Accessibility */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-[hsl(var(--primary))] ring-offset-2 ring-offset-white opacity-0 focus-within:opacity-100 pointer-events-none"></div>
    </div>
  );
}
