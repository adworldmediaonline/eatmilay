'use client';

import ProductReviews from '@/components/products/product-reviews';
import { ProductOptionsContent } from '@/components/products/product-options-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { SerializedProductWithCategory } from '@/server/queries/product';
import type { ReviewData, ReviewAggregates } from '@/types/review';

import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  FileText,
  FlaskConical,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

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
  const [showImageZoom, setShowImageZoom] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-4 lg:pb-8">
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
          <div className="space-y-3 lg:space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* Main Image */}
            <div className="relative w-full bg-gray-50 rounded-2xl lg:rounded-3xl overflow-hidden group aspect-square">
              <div
                className={`relative w-full h-full transition-transform duration-300 ${showImageZoom ? 'scale-150' : 'group-hover:scale-105'
                  }`}
                onClick={() => setShowImageZoom(!showImageZoom)}
              >
                <Image
                  src={allImages[selectedImageIndex]?.url || ''}
                  alt={allImages[selectedImageIndex]?.altText || product.name}
                  fill
                  className="object-contain"
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
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation relative ${selectedImageIndex === index
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
                      className={`w-full h-full rounded-lg overflow-hidden border-2 transition-all relative ${selectedImageIndex === index
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
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(reviewAggregates.averageRating)
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

            <ProductOptionsContent
              product={product}
              variant="inline"
              showBuyNow
              id="add-to-cart-section"
            />

            {/* Product Details Accordion */}
            <div className="mt-6 lg:mt-8">
              <Accordion type="single" collapsible className="w-full space-y-3">
                {/* Description */}
                {product.description && (
                  <AccordionItem
                    value="description"
                    className="border border-gray-200 rounded-xl px-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                  >
                    <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline py-5 [&[data-state=open]]:text-primary">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>Description</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-0 pb-5">
                      <div
                        className="text-gray-700 leading-relaxed text-sm lg:text-base prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Ingredients & Benefits */}
                <AccordionItem
                  value="ingredients"
                  className="border border-gray-200 rounded-xl px-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline py-5 [&[data-state=open]]:text-primary">
                    <div className="flex items-center gap-3">
                      <FlaskConical className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Ingredients & Benefits</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-5">
                    {product.ingredients ? (
                      <div
                        className="text-gray-700 leading-relaxed text-sm lg:text-base prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.ingredients }}
                      />
                    ) : (
                      <p className="text-gray-600 text-sm">Ingredient and benefit information will be available soon.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Reviews */}
                <AccordionItem
                  value="reviews"
                  className="border border-gray-200 rounded-xl px-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline py-5 [&[data-state=open]]:text-primary">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>Reviews ({reviewAggregates.totalReviews})</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-5">
                    <ProductReviews
                      productId={product.id}
                      productName={product.name}
                      reviews={reviews}
                      aggregates={reviewAggregates}
                      canWriteReview={canWriteReview}
                      isAuthenticated={isAuthenticated}
                    />
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ */}
                <AccordionItem
                  value="faq"
                  className="border border-gray-200 rounded-xl px-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <AccordionTrigger className="text-base font-semibold text-gray-900 hover:no-underline py-5 [&[data-state=open]]:text-primary">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>FAQ</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-5">
                    <p className="text-gray-600 text-sm">FAQ section will be available soon.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </div>

        {/* Related Products */}

      </main>
    </div>
  );
}
