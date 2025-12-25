export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: string;
  reviews?: number;
  image: string;
  inStock?: boolean;
  hasStarIcon?: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  href: string;
  image: string;
  badgeColor: string;
}

export interface Deal {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  savings?: number;
  badge: string;
  badgeColor: string;
  borderColor: string;
  image: string;
  buttonText: string;
  buttonStyle: string;
  specialNote?: string;
}

export interface TrustBadge {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}
