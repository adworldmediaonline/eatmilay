'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Deal } from '@/types/home';

const deals: Deal[] = [
  {
    id: 1,
    title: 'Night Repair Combo',
    description: 'Serum + Moisturizer for overnight transformation',
    price: 1299,
    originalPrice: 1855,
    savings: 556,
    badge: 'FLAT 30% OFF',
    badgeColor: 'bg-[#ffffff] text-[hsl(var(--primary))]',
    borderColor: 'border-[#ffffff]',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Shop Now',
    buttonStyle: 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white',
  },
  {
    id: 2,
    title: 'Face Wash Collection',
    description: 'Mix and match any 3 face washes',
    price: 998,
    originalPrice: 1497,
    savings: 499,
    badge: 'BUY 2 GET 1 FREE',
    badgeColor: 'bg-[hsl(var(--primary))] text-white',
    borderColor: 'border-[hsl(var(--primary))]',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Shop Now',
    buttonStyle: 'bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] text-white',
  },
  {
    id: 3,
    title: 'Under Eye Cream',
    description: 'Dark circles and puffiness solution',
    price: 472,
    originalPrice: 590,
    badge: 'FLASH SALE',
    badgeColor: 'bg-gradient-to-r from-[#ffffff] to-[hsl(var(--primary))] text-white',
    borderColor: 'border-[#ffffff]',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Grab Deal',
    buttonStyle:
      'bg-[#ffffff] hover:bg-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:text-white transition-all duration-300',
    specialNote: 'Only 20% OFF • Limited Stock',
  },
];

export default function DealsSection() {
  return (
    <section className="py-16 bg-[#ffffff]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[hsl(var(--primary))] mb-4">
            Today's Best Deals
          </h2>
          <p className="text-lg text-gray-600">
            Limited time offers you don't want to miss
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map(deal => (
            <div
              key={deal.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${deal.borderColor}`}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#ffffff]/20 to-[#ffffff]/30 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div
                  className={`absolute top-4 left-4 ${deal.badgeColor} px-4 py-2 rounded-full text-sm font-bold`}
                >
                  {deal.badge}
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[hsl(var(--primary))] mb-2">
                  {deal.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">{deal.description}</p>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-[hsl(var(--primary))]">
                    ₹{deal.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{deal.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-[hsl(var(--primary))] font-medium mb-4">
                  {deal.specialNote || `Save ₹${deal.savings} • Free Shipping`}
                </div>
                <Button className={`w-full ${deal.buttonStyle}`}>
                  {deal.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Deal Banner */}
        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">
            🎁 Free Gift with Every Order Above ₹899
          </h3>
          <p className="text-lg mb-4">
            Get a complimentary travel-size serum with your purchase
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ Free Shipping
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ Free Gift
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              ✓ Easy Returns
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
