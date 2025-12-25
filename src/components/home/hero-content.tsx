'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Heart,
  Leaf,
  Shield,
} from 'lucide-react';
import Image from 'next/image';

export default function HeroContent() {
  return (
    <section className="relative min-h-screen bg-primary overflow-hidden">

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-120px)]">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Natural
                <br />
                <span className="text-white font-bold">
                  Beauty
                </span>
              </h1>

              <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-lg">
                Transform your skin with our premium collection of natural,
                organic skincare products designed for radiant, healthy beauty.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-primary px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              DISCOVER MORE
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Right Product Display */}
          <div className="relative flex justify-center items-center">
            {/* Main Product Container */}
            <div className="relative">
              {/* Large background circle */}
              <div className="w-[500px] h-[500px] rounded-full border border-white/20 flex items-center justify-center relative overflow-hidden">
                {/* Product Image */}
                <div className="w-[450px] h-[450px] rounded-full overflow-hidden shadow-2xl relative border-4 border-white/30">
                  <Image
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=800&fit=crop&crop=center"
                    alt="Natural Skincare Product"
                    fill
                    className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                    sizes="450px"
                  />

                  {/* Product highlight rings */}
                  <div className="absolute inset-8 rounded-full border-2 border-white/40 animate-pulse"></div>
                  <div className="absolute inset-16 rounded-full border border-white/30"></div>
                </div>

                {/* Floating natural elements */}
                <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full border-2 border-white/30 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Leaf className="w-12 h-12 text-white" />
                </div>

                <div className="absolute -bottom-12 -right-12 w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Heart className="w-10 h-10 text-white" />
                </div>

                {/* Orbiting elements */}
                <div className="absolute top-16 right-16 w-8 h-8 border-2 border-white rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-16 left-16 w-6 h-6 border-2 border-white/80 rounded-full shadow-lg"></div>
                <div className="absolute top-1/2 left-8 w-4 h-4 border-2 border-white/60 rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-4 h-4 border-2 border-white/60 rounded-full"></div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}

