'use client';

import { Suspense } from 'react';
import { Star } from 'lucide-react';

// Dynamic import for Swiper to avoid SSR issues
// const TestimonialsSwiper = dynamic(
//   () => import('@/components/ui/testimonials-swiper'),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
//     ),
//   }
// );

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[hsl(var(--primary))] mb-6">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Join thousands of satisfied customers who transformed their skin
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              4.8/5 Average Rating
            </span>
            <span>•</span>
            <span>15,000+ Reviews</span>
            <span>•</span>
            <span>98% Satisfaction Rate</span>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="h-64 bg-gray-100 rounded-3xl animate-pulse"></div>
          }
        >
          {/* <TestimonialsSwiper /> */}
        </Suspense>
      </div>
    </section>
  );
}
