'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Play, Star } from 'lucide-react';

interface HeroSectionProps {
  badge?: {
    icon?: React.ReactNode;
    text: string;
  };
  title: string;
  subtitle?: string;
  description: string;
  primaryAction: {
    text: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick?: () => void;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export default function HeroSection({
  badge,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative luxury-dark-gradient text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-[#ffffff]/10 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {badge && (
              <Badge className="inline-flex items-center bg-[#ffffff]/20 text-[#ffffff] hover:bg-[#ffffff]/30 border-[#ffffff]/30">
                {badge.icon && <span className="mr-2">{badge.icon}</span>}
                {badge.text}
              </Badge>
            )}

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                {title}
                {subtitle && (
                  <span className="block text-[#ffffff]">{subtitle}</span>
                )}
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#ffffff] hover:bg-[#ffffff] text-[hsl(var(--primary))] font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
                onClick={primaryAction.onClick}
              >
                {primaryAction.text}
              </Button>

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white hover:bg-white hover:text-[hsl(var(--primary))] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300"
                  onClick={secondaryAction.onClick}
                >
                  <Play className="w-5 h-5 mr-2" />
                  {secondaryAction.text}
                </Button>
              )}
            </div>

            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-[#ffffff]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="relative w-full h-96 lg:h-[600px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/20 to-transparent z-10 rounded-2xl"></div>

              <div className="w-full h-full bg-gradient-to-br from-[#ffffff]/10 to-[#ffffff]/20 rounded-2xl flex items-center justify-center">
                <div className="w-48 h-64 lg:w-64 lg:h-80 bg-white/95 rounded-2xl shadow-2xl flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center text-[hsl(var(--primary))] p-6">
                    <div className="w-16 h-16 bg-[#ffffff] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="w-8 h-8 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Premium Product</h3>
                    <p className="text-sm opacity-70 mb-4">Luxury Skincare</p>
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#ffffff] fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-[#ffffff] text-[hsl(var(--primary))] px-3 py-1 rounded-full text-sm font-bold z-20">
                #1 Best Seller
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
