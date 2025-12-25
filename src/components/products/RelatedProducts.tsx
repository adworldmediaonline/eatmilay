'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-8 lg:mt-16">
      <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-6 lg:mb-8 text-center">
        You May Also Like
      </h3>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1.2}
          loop={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.related-prev',
            nextEl: '.related-next',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="w-full"
          style={{ overflow: 'visible' }}
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className="h-auto">
              <div className="group bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-[hsl(var(--primary))]/30 to-[hsl(var(--primary))]/50 flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Hover overlay - Hidden on mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block"></div>

                  {/* Quick view button - Hidden on mobile */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-center justify-center">
                    <Button className="bg-white/90 text-primary hover:bg-white hover:text-primary backdrop-blur-sm">
                      Quick View
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 lg:p-6 flex flex-col flex-1">
                  <h4 className="font-bold text-primary mb-2 lg:mb-3 text-sm lg:text-lg group-hover:text-primary transition-colors min-h-[2.5rem] lg:min-h-[3.5rem] flex items-center line-clamp-2">
                    {product.name}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3 lg:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current"
                      />
                    ))}
                    <span className="text-xs lg:text-sm text-gray-600 ml-1 lg:ml-2 font-medium">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
                    <span className="text-lg lg:text-2xl font-bold text-primary">
                      ₹{product.price}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-auto">
                    <Button className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--primary))] text-white py-2 lg:py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm lg:text-base touch-manipulation">
                      <ShoppingCart className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            className="related-prev w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="related-next w-12 h-12 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
