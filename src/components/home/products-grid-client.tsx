'use client';

import { useAddItem } from '@/store/cart-store';
import { toast } from 'sonner';
import ProductGrid from '../products/product-grid';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt?: string }[];
  rating?: number;
  reviewCount?: number;
  category: { id: string; name: string; slug: string };
  badges?: string[];
  isWishlisted?: boolean;
  inStock?: boolean;
  shortDescription?: string;
}

interface ProductsGridClientProps {
  products: Product[];
}

export default function ProductsGridClient({
  products,
}: ProductsGridClientProps) {
  const addItem = useAddItem();

  const handleAddToCart = (productId: string, quantity: number = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Convert to cart product format
    const cartProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      excerpt: product.shortDescription,
      mainImage: product.images[0] ? {
        url: product.images[0].url,
        publicId: '',
        altText: product.images[0].alt,
      } : undefined,
      category: product.category,
    };

    addItem(cartProduct, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <ProductGrid
      products={products}
      columns={4}
      variant="default"
      onAddToCart={handleAddToCart}
    />
  );
}

