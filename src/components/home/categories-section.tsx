'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Category } from '@/types/home';

const categories: Category[] = [
  {
    id: 1,
    name: 'Acne & Blemishes',
    description: 'Clear, healthy skin solutions',
    productCount: 12,
    href: '/categories/acne',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#ffffff] text-[hsl(var(--primary))]',
  },
  {
    id: 2,
    name: 'Anti-Aging',
    description: 'Firm, youthful appearance',
    productCount: 8,
    href: '/categories/aging',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[hsl(var(--primary))] text-white',
  },
  {
    id: 3,
    name: 'Brightening',
    description: 'Radiant, glowing complexion',
    productCount: 15,
    href: '/categories/brightening',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#ffffff] text-[hsl(var(--primary))]',
  },
  {
    id: 4,
    name: 'Hydration',
    description: 'Deep moisture & nourishment',
    productCount: 10,
    href: '/categories/hydration',
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[hsl(var(--primary))] text-white',
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(category => (
            <Link key={category.id} href={category.href} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Category Image */}
                <div className="relative h-48 bg-gradient-to-br from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/20 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div
                    className={`absolute top-4 right-4 ${category.badgeColor} px-3 py-1 rounded-full text-xs font-bold`}
                  >
                    {category.productCount} Products
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[hsl(var(--primary))] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="inline-flex items-center text-[hsl(var(--primary))] font-medium text-sm group-hover:text-[#ffffff] transition-colors">
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white px-12 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="/categories">
              View All Categories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
