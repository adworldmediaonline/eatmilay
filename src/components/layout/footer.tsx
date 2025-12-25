'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Shield,
  Truck,
  ChevronRight,
  Globe,
  Gift,
} from 'lucide-react';
import { toast } from 'sonner';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubscribing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Deal message commented out - uncomment when deals are back
    // toast.success(
    //   'Thank you for subscribing! Check your email for 10% off coupon.'
    // );
    toast.success(
      'Thank you for subscribing! Welcome to SumNSubstance community.'
    );
    setEmail('');
    setIsSubscribing(false);
  };

  const trustFeatures = [
    {
      icon: Globe,
      title: 'Worldwide Shipping',
      description: 'International Shipping available Worldwide',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free Shipping on all domestic prepaid orders above Rs. 899',
    },
    {
      icon: Gift,
      title: 'Earn Rewards',
      description: 'Unlock Rewards with each purchase you make',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'All payments are processed securely',
    },
  ];

  const topCategories = [
    { name: 'Serums & Oils', href: '/categories/serums' },
    { name: 'Face Care', href: '/categories/face-care' },
    { name: 'Hair Care', href: '/categories/hair-care' },
    { name: 'Body Care', href: '/categories/body-care' },
    { name: 'Combos', href: '/categories/combos' },
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-conditions' },
    { name: 'Shipping & Cancellation', href: '/shipping-cancellation' },
    { name: 'Returns & Refund', href: '/returns-refund' },
  ];

  const bestSellers = [
    { name: 'Brightening Serum', href: '/products/brightening-serum' },
    { name: 'Under Eye Cream', href: '/products/under-eye-cream' },
    { name: 'Night Repair Combo', href: '/products/night-repair-combo' },
    { name: 'Face Wash', href: '/products/face-wash' },
    { name: 'Hair Growth Oil', href: '/products/hair-growth-oil' },
    { name: 'Body Lotion', href: '/products/body-lotion' },
  ];

  const info = [
    { name: 'Our Story', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'FAQs', href: '/faqs' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className={`bg-white font-sans ${className}`}>
      {/* Trust Features Section */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Brand & Social */}
            <div>
              <div className="flex items-center mb-6">
                <Link href="/" className="block">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    <span className="text-white font-bold">Sum</span>NSubstance
                  </h2>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map(social => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-white/10 hover:bg-white rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <IconComponent className="w-4 h-4 text-white group-hover:text-primary" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Policies
              </h3>
              <ul className="space-y-3">
                {policies.map(policy => (
                  <li key={policy.name}>
                    <Link
                      href={policy.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {policy.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wide">
                Info
              </h3>
              <ul className="space-y-3">
                {info.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-primary py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/60 text-sm">© 2025, Rev Skin Store</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
