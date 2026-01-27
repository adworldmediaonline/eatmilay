// Cart-specific types for the application
export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  excerpt?: string;
  mainImage?: {
    url: string;
    publicId: string;
    altText?: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  // Bundle & Save support
  bundleId?: string;
  variantId?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
  addedAt: Date;
}

export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

export interface CartActions {
  // Core cart actions
  addItem: (product: CartProduct, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string, bundleId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string, bundleId?: string) => void;
  clearCart: () => void;

  // Utility actions
  getItem: (productId: string, variantId?: string, bundleId?: string) => CartItem | undefined;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string, variantId?: string, bundleId?: string) => boolean;

  // Loading states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export interface CartStore extends CartState, CartActions {}

// Helper types for components
export interface CartDropdownProps {
  className?: string;
}

export interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  disabled?: boolean;
}
