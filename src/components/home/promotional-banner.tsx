'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function PromotionalBanner() {
  return (
    <section className="py-8 bg-gradient-to-r from-[#ffffff]/20 via-white to-[#ffffff]/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-12 items-center">
            {/* Discount Badge Section */}
            <div className="lg:col-span-2 bg-primary text-white p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10"></div>
              <div className="relative text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-sm font-bold">Flat</div>
                    <div className="text-3xl font-black leading-none">20%</div>
                    <div className="text-sm font-bold">OFF</div>
                  </div>
                </div>
                <div className="text-xs opacity-90 font-medium">
                  Limited Time
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#ffffff] rounded-full animate-pulse"></div>
            </div>

            {/* Product Showcase */}
            <div className="lg:col-span-4 p-8 bg-gradient-to-br from-[#ffffff]/10 to-[#ffffff]/20">
              <div className="flex items-center justify-center space-x-4">
                {/* Product 1 */}
                <div className="relative transform hover:scale-110 transition-all duration-300">
                  <div className="w-32 h-40 bg-gradient-to-br from-[#ffffff]/30 to-[#ffffff]/50 rounded-2xl overflow-hidden shadow-lg relative">
                    <Image
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop&crop=center"
                      alt="Night Repair Serum"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[hsl(var(--primary))] text-white text-xs px-2 py-1 rounded-full font-bold">
                    NEW
                  </div>
                </div>

                {/* Product 2 */}
                <div className="relative transform hover:scale-110 transition-all duration-300">
                  <div className="w-28 h-36 bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--primary))]/30 rounded-2xl overflow-hidden shadow-lg relative">
                    <Image
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=400&fit=crop&crop=center"
                      alt="Night Cream"
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Offer Content */}
            <div className="lg:col-span-4 p-8 text-center">
              <div className="mb-4">
                <div className="inline-block bg-gradient-to-r from-[#ffffff] to-[hsl(var(--primary))] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  Product Of The Month
                </div>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-[hsl(var(--primary))] mb-4 leading-tight">
                Night Repair
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-[#ffffff]">
                  Combo
                </span>
              </h2>

              <p className="text-[hsl(var(--primary))]/70 mb-6 font-medium">
                Transform your skin overnight with visible results
              </p>
            </div>

            {/* CTA Section */}
            <div className="lg:col-span-2 bg-primary text-white p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-tl from-transparent to-white/10"></div>
              <div className="relative">
                <div className="mb-4">
                  <div className="text-sm opacity-90 mb-2">Use Code:</div>
                  <div className="bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-xl px-4 py-3">
                    <div className="text-xl font-black tracking-wider">
                      HURRY20
                    </div>
                  </div>
                </div>

                <Button className="bg-[#ffffff] hover:bg-[#ffffff]/90 text-[hsl(var(--primary))] font-bold px-6 py-3 rounded-full w-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
