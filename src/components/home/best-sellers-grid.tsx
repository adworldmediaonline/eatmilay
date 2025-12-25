'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BEST_SELLERS } from '@/constants/home-data';

export default function BestSellersGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50/50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            Our Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handcrafted with natural ingredients, trusted by thousands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {BEST_SELLERS.map(product => (
            <div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 hover:-translate-y-1 border border-gray-100/50 flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#ffffff]/10 via-white to-[hsl(var(--primary))]/5 overflow-hidden relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
                <div
                  className={`absolute top-3 left-3 ${product.badgeColor} px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm`}
                >
                  {product.badge}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[hsl(var(--primary))] mb-2 group-hover:text-[hsl(var(--primary))] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">
                    ({product.reviews?.toLocaleString() || 0})
                  </span>
                </div>

                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-[hsl(var(--primary))]">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {/* Original price commented out - uncomment when deals are back */}
                    {/* {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.originalPrice}
                      </span>
                    )} */}
                  </div>
                  <div className="text-green-600 font-medium text-xs bg-green-50 px-2 py-1 rounded-full">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>

                <Button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white py-2.5 rounded-xl font-medium mt-auto transition-all duration-300 hover:shadow-lg">
                  Add To Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-white px-8 py-3 text-base font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
            asChild
          >
            <Link href="/products">
              View All Products
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
