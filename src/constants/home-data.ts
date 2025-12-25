import { Truck, Shield, Clock, Gift } from 'lucide-react';
import { Product, Category, Deal, TrustBadge } from '@/types/home';

export const BEST_SELLERS: Product[] = [
  {
    id: 1,
    name: 'Milk Drops Brightening Serum',
    description: 'Visible results in 2 weeks | Teenage-friendly',
    price: 640,
    badge: 'Viral Serum',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
    reviews: 1847,
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
    inStock: true,
  },
  {
    id: 2,
    name: 'Under Eye Cream',
    description: 'Dark Circles Control | Reduces fine lines',
    price: 472,
    originalPrice: 590,
    badge: 'FLAT 20% off',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
    reviews: 1240,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center',
    inStock: true,
  },
  {
    id: 3,
    name: 'Hair Growth Oil',
    description: 'Strengthens roots | Reduces hair fall',
    price: 699,
    originalPrice: 750,
    badge: 'New Launch',
    badgeColor: 'bg-[#233f1c] text-white',
    reviews: 2156,
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop&crop=center',
    inStock: true,
  },
  {
    id: 4,
    name: 'Milk Powder Face Wash',
    description: 'Gentle cleansing | Suitable for all skin types',
    price: 499,
    badge: 'Top Rated',
    badgeColor: 'bg-[#233f1c] text-white',
    reviews: 2156,
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center',
    inStock: true,
  },
];

export const CUSTOMER_FAVORITES: Product[] = [
  {
    id: 1,
    name: 'Better Ageing Serum',
    price: 699,
    originalPrice: 750,
    badge: 'Best Seller',
    badgeColor: 'bg-[#233f1c] text-white',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center',
    hasStarIcon: true,
    description: '',
  },
  {
    id: 2,
    name: 'Under Eye Cream (Dark...)',
    price: 590,
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&crop=center',
    description: '',
  },
  {
    id: 3,
    name: 'Aloe Vera Gel',
    price: 379,
    originalPrice: 390,
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop&crop=center',
    description: '',
  },
  {
    id: 4,
    name: 'Milk Drops Brightening...',
    price: 640,
    badge: '20% OFF',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop&crop=center',
    description: '',
  },
  {
    id: 5,
    name: 'Foot Cream',
    price: 375,
    originalPrice: 395,
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center',
    description: '',
  },
  {
    id: 6,
    name: 'Milk Mud Mask 🔥',
    price: 499,
    badge: 'Best Seller',
    badgeColor: 'bg-[#233f1c] text-white',
    image:
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop&crop=center',
    description: '',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Acne & Blemishes',
    description: 'Clear, healthy skin solutions',
    productCount: 12,
    href: '/categories/acne',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
  },
  {
    id: 2,
    name: 'Anti-Aging',
    description: 'Firm, youthful appearance',
    productCount: 8,
    href: '/categories/aging',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#233f1c] text-white',
  },
  {
    id: 3,
    name: 'Brightening',
    description: 'Radiant, glowing complexion',
    productCount: 15,
    href: '/categories/brightening',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
  },
  {
    id: 4,
    name: 'Hydration',
    description: 'Deep moisture & nourishment',
    productCount: 10,
    href: '/categories/hydration',
    image:
      'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=300&fit=crop&crop=center',
    badgeColor: 'bg-[#233f1c] text-white',
  },
];

export const DEALS: Deal[] = [
  {
    id: 1,
    title: 'Night Repair Combo',
    description: 'Serum + Moisturizer for overnight transformation',
    price: 1299,
    originalPrice: 1855,
    savings: 556,
    badge: 'FLAT 30% OFF',
    badgeColor: 'bg-[#ffd469] text-[#233f1c]',
    borderColor: 'border-[#ffd469]',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Shop Now',
    buttonStyle: 'bg-[#233f1c] hover:bg-[#2b3e1a] text-white',
  },
  {
    id: 2,
    title: 'Face Wash Collection',
    description: 'Mix and match any 3 face washes',
    price: 998,
    originalPrice: 1497,
    savings: 499,
    badge: 'BUY 2 GET 1 FREE',
    badgeColor: 'bg-[#233f1c] text-white',
    borderColor: 'border-[#233f1c]',
    image:
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Shop Now',
    buttonStyle: 'bg-[#233f1c] hover:bg-[#2b3e1a] text-white',
  },
  {
    id: 3,
    title: 'Under Eye Cream',
    description: 'Dark circles and puffiness solution',
    price: 472,
    originalPrice: 590,
    badge: 'FLASH SALE',
    badgeColor: 'bg-gradient-to-r from-[#ffd469] to-[#233f1c] text-white',
    borderColor: 'border-[#ffd469]',
    image:
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop&crop=center',
    buttonText: 'Grab Deal',
    buttonStyle:
      'bg-[#ffd469] hover:bg-[#233f1c] text-[#233f1c] hover:text-white transition-all duration-300',
    specialNote: 'Only 20% OFF • Limited Stock',
  },
];

export const TRUST_BADGES: TrustBadge[] = [
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
