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
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Utility actions
  getItem: (productId: string) => CartItem | undefined;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: string) => boolean;

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
