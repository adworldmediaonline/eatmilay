'use client';

import { Shield, Award, Truck, Users, Heart, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

const defaultFeatures: Feature[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Clinically Tested',
    description:
      'All products undergo rigorous clinical testing for safety and efficacy',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Award Winning',
    description: 'Recognized by leading beauty and skincare industry experts',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all orders above $50 worldwide',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Expert Support',
    description: '24/7 skincare consultation with certified dermatologists',
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Cruelty Free',
    description: 'Never tested on animals, always ethical and sustainable',
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: 'Natural Ingredients',
    description: '100% natural and organic ingredients sourced responsibly',
  },
];

export default function FeaturesSection({
  title = 'Why Choose Our Products',
  subtitle = 'We believe in the power of nature combined with scientific innovation to deliver exceptional skincare results.',
  features = defaultFeatures,
}: FeaturesSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[hsl(var(--primary))] mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white hover:bg-[#ffffff]/5"
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#ffffff]/10 text-[hsl(var(--primary))] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#ffffff] group-hover:text-[hsl(var(--primary))] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--primary))] mb-4 group-hover:text-[hsl(var(--primary))]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
