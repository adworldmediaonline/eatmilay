'use client';

import { Truck, Shield, Clock, Gift } from 'lucide-react';
import { TrustBadge } from '@/types/home';

const trustBadges: TrustBadge[] = [
  {
    id: 1,
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹899',
  },
  {
    id: 2,
    icon: Shield,
    title: '100% Authentic',
    description: 'Genuine products only',
  },
  {
    id: 3,
    icon: Clock,
    title: 'Quick Delivery',
    description: '24-48 hours delivery',
  },
  {
    id: 4,
    icon: Gift,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-[hsl(var(--primary))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {trustBadges.map(badge => {
            const IconComponent = badge.icon;
            return (
              <div key={badge.id} className="text-white">
                <div className="w-16 h-16 bg-[#ffffff] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-[hsl(var(--primary))]" />
                </div>
                <h3 className="font-bold text-lg mb-2">{badge.title}</h3>
                <p className="text-white/70">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
