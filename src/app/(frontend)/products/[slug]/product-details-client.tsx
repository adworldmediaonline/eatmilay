'use client';

import ProductReviews from '@/components/products/product-reviews';
import RelatedProducts from '@/components/products/RelatedProducts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockRelatedProducts } from '@/constants/product-mock-data';
import type { SerializedProductWithCategory } from '@/server/queries/product';
import type { ReviewData, ReviewAggregates } from '@/types/review';
import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';

// Import Swiper core and required modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default function ProductDetailsClient({
  product,
  reviews,
  reviewAggregates,
  canWriteReview,
  isAuthenticated,
}: {
  product: SerializedProductWithCategory;
  reviews: ReviewData[];
  reviewAggregates: ReviewAggregates;
  canWriteReview: boolean;
  isAuthenticated: boolean;
}) {
  // Transform images into array format for gallery display (memoized to prevent re-renders)
  const allImages = useMemo(
    () => [product.mainImage, ...(product.additionalImages || [])].filter(Boolean),
    [product.mainImage, product.additionalImages]
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showStickyCart, setShowStickyCart] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);

  // Cart functionality
  const addItem = useAddItem();
  const router = useRouter();

  const handleAddToCart = () => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      excerpt: product.excerpt || undefined,
      mainImage: product.mainImage,
      category: product.category,
    };

    addItem(cartProduct, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // Add scroll listener for sticky cart
  useEffect(() => {
    const handleScroll = () => {
      const addToCartSection = document.getElementById('add-to-cart-section');
      if (addToCartSection) {
        const rect = addToCartSection.getBoundingClientRect();
        setShowStickyCart(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-4 lg:pb-8 relative overflow-visible">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 lg:mb-8 overflow-x-auto scrollbar-hide">
          <Link href="/" className="hover:text-primary whitespace-nowrap">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href="/products"
            className="hover:text-primary whitespace-nowrap"
          >
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            href={`/categories/${product.category.name.toLowerCase()}`}
            className="hover:text-primary whitespace-nowrap"
          >
            {product.category.name}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-primary font-medium truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-6 lg:mb-10 lg:items-start">
          {/* Product Images - Sticky on desktop */}
          <div className="space-y-3 lg:space-y-4 lg:sticky lg:top-4 lg:self-start">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden group">
              <div
                className={`relative w-full h-full transition-transform duration-300 ${
                  showImageZoom ? 'scale-150' : 'group-hover:scale-105'
                }`}
                onClick={() => setShowImageZoom(!showImageZoom)}
              >
                <Image
                  src={allImages[selectedImageIndex]?.url || ''}
                  alt={allImages[selectedImageIndex]?.altText || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
              </div>

              {/* Zoom indicator - Hidden on mobile */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                🔍 Click to zoom
              </div>

              {/* Image counter */}
              <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 bg-black/60 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium z-20">
                {selectedImageIndex + 1} / {allImages.length}
              </div>

              {/* Badges - Optional for future enhancement */}
              <div className="absolute top-3 lg:top-4 left-3 lg:left-4 flex flex-col gap-2 z-20">
                {/* Badges like "Best Seller" or "New Launch" can be added here based on product metadata */}
              </div>

            </div>

            {/* Mobile Swipe Gallery - Redesigned */}
            <div className="block lg:hidden">
              <Swiper
                modules={[]}
                spaceBetween={6}
                slidesPerView={'auto'}
                centeredSlides={false}
                className="!pb-2 w-full"
                style={{ overflow: 'visible' }}
                breakpoints={{
                  640: {
                    spaceBetween: 8,
                  },
                }}
              >
                {allImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="!w-14 !h-14 sm:!w-16 sm:!h-16"
                  >
                    <button
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation relative ${
                        selectedImageIndex === index
                          ? 'border-primary shadow-sm scale-105'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image?.url || ''}
                        alt={image?.altText || `${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                      {/* Selected indicator */}
                      {selectedImageIndex === index && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                            <svg
                              className="w-1.5 h-1.5 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Thumbnail Gallery */}
            <div className="relative hidden lg:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={8}
                slidesPerView={6}
                navigation={{
                  prevEl: '.thumbnail-prev',
                  nextEl: '.thumbnail-next',
                }}
                breakpoints={{
                  1024: {
                    slidesPerView: 6,
                    spaceBetween: 8,
                  },
                  1280: {
                    slidesPerView: 7,
                    spaceBetween: 10,
                  },
                }}
                className="!pb-0"
              >
                {allImages.map((image, index) => (
                  <SwiperSlide key={index} className="!w-20 !h-20">
                    <button
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all relative ${
                        selectedImageIndex === index
                          ? 'border-primary shadow-sm'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image?.url || ''}
                        alt={image?.altText || `${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation buttons */}
              <Button
                variant="outline"
                size="icon"
                className="thumbnail-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-7 h-7 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all z-10"
              >
                <ChevronLeft className="w-3 h-3" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="thumbnail-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-7 h-7 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all z-10"
              >
                <ChevronRight className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-3 lg:space-y-4">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-2 lg:mb-3 leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-sm lg:text-base text-gray-600 italic mb-2">
                  {product.tagline}
                </p>
              )}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(reviewAggregates.averageRating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2 text-sm">
                    {reviewAggregates.averageRating > 0
                      ? `${reviewAggregates.averageRating.toFixed(1)} (${reviewAggregates.totalReviews} reviews)`
                      : 'No reviews yet'}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 w-fit text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              </div>
              {product.excerpt && (
                <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                  {product.excerpt}
                </p>
              )}
            </div>

            {/* Price - Mobile optimized */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl lg:text-3xl font-bold text-primary">
                  ₹{product.price}
                </span>
              </div>
              <p className="text-xs text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Key Benefits / Why You'll Love It - Mobile optimized */}
            {product.whyLoveIt && (
              <div className="bg-[#ffffff]/10 rounded-xl p-4">
                <h3 className="font-bold text-primary mb-2 flex items-center text-sm lg:text-base">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Why You'll Love It
                </h3>
                <div
                  className="text-gray-700 text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.whyLoveIt }}
                />
              </div>
            )}

            {/* Quantity & Add to Cart - Mobile optimized */}
            <div className="space-y-3 lg:space-y-4" id="add-to-cart-section">
              <div className="space-y-2">
                <span className="font-medium text-gray-700 text-sm lg:text-base">
                  Quantity:
                </span>
                <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-1.5 w-fit mx-auto lg:mx-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 group touch-manipulation"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 lg:w-5 lg:h-5 group-disabled:text-gray-400" />
                  </button>
                  <div className="w-16 lg:w-20 text-center">
                    <span className="text-xl lg:text-2xl font-bold text-primary">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-200 group touch-manipulation"
                  >
                    <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                  </button>
                </div>
              </div>

              {/* Enhanced Action Buttons - Mobile optimized */}
              <div className="space-y-2 lg:space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                  <Button
                    onClick={handleAddToCart}
                    size="lg"
                    className="bg-primary hover:bg-primary text-white py-3 lg:py-4 text-sm lg:text-base font-bold rounded-xl group transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/20 touch-manipulation order-2 sm:order-1"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 lg:py-4 text-sm lg:text-base font-bold rounded-xl transition-all duration-300 touch-manipulation order-1 sm:order-2"
                  >
                    Buy Now
                  </Button>
                </div>

                {/* Wishlist & Share - Mobile optimized */}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-8 lg:mb-12">
          {/* Mobile Tab Navigation */}
          <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
            <nav className="flex space-x-1 lg:space-x-8 min-w-max lg:min-w-0">
              {[
                { id: 'description', label: 'Description' },
                { id: 'usage', label: 'How to Use' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'reviews', label: `Reviews (${reviewAggregates.totalReviews})` },
                { id: 'faq', label: 'FAQ' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 lg:py-4 px-4 lg:px-2 border-b-2 font-medium text-sm lg:text-base transition-colors whitespace-nowrap touch-manipulation ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div className="space-y-4 lg:space-y-6">
                {product.description && (
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 lg:mb-4">
                      Product Description
                    </h3>
                    <div
                      className="text-gray-700 leading-relaxed mb-4 lg:mb-6 text-sm lg:text-base prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {product.whyLoveIt && (
                  <div>
                    <h4 className="text-base lg:text-lg font-semibold text-primary mb-3">
                      Why You'll Love It
                    </h4>
                    <div
                      className="text-gray-700 text-sm lg:text-base prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.whyLoveIt }}
                    />
                  </div>
                )}

                {product.whatsInside && (
                  <div>
                    <h4 className="text-base lg:text-lg font-semibold text-primary mb-3">
                      What's Inside
                    </h4>
                    <div
                      className="text-gray-700 leading-relaxed text-sm lg:text-base prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.whatsInside }}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 lg:mb-4">
                  How to Use
                </h3>
                {product.howToUse ? (
                  <div className="bg-[#ffffff]/10 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <div
                      className="text-gray-700 leading-relaxed text-sm lg:text-base prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: product.howToUse }}
                    />
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">Usage instructions will be available soon.</p>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 lg:mb-4">
                  Ingredients
                </h3>
                {product.ingredients ? (
                  <div
                    className="text-gray-700 leading-relaxed text-sm lg:text-base prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: product.ingredients }}
                  />
                ) : (
                  <p className="text-gray-600 text-sm">Ingredient information will be available soon.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <ProductReviews
                productId={product.id}
                productName={product.name}
                reviews={reviews}
                aggregates={reviewAggregates}
                canWriteReview={canWriteReview}
                isAuthenticated={isAuthenticated}
              />
            )}

            {activeTab === 'faq' && (
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 lg:mb-4">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 text-sm">FAQ section will be available soon.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={mockRelatedProducts} />
      </main>

      {/* Enhanced Sticky Mobile Add to Cart */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transition-all duration-300 lg:hidden ${
          showStickyCart ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Product Image */}
            <div className="flex-shrink-0 relative w-12 h-12">
              <Image
                src={allImages[0]?.url || ''}
                alt={allImages[0]?.altText || product.name}
                fill
                className="object-cover rounded-lg shadow-sm"
                sizes="48px"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-sm leading-tight">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-primary">
                  ₹{product.price}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-3 py-2 font-medium text-sm min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="bg-primary hover:bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-lg transition-all duration-300 touch-manipulation"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="text-sm">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
