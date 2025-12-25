import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { CartStore, CartProduct } from '@/types/cart';

// Enterprise-level Zustand store with middleware
export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        items: [],
        isLoading: false,
        error: null,

        // Core cart actions
        addItem: (product: CartProduct, quantity = 1) => {
          set(state => {
            state.error = null;

            const existingItemIndex = state.items.findIndex(
              item => item.product.id === product.id
            );

            if (existingItemIndex >= 0) {
              // Update existing item quantity
              state.items[existingItemIndex].quantity += quantity;
            } else {
              // Add new item
              state.items.push({
                product,
                quantity,
                addedAt: new Date(),
              });
            }
          });
        },

        removeItem: (productId: string) => {
          set(state => {
            state.error = null;
            state.items = state.items.filter(
              item => item.product.id !== productId
            );
          });
        },

        updateQuantity: (productId: string, quantity: number) => {
          if (quantity <= 0) {
            get().removeItem(productId);
            return;
          }

          set(state => {
            state.error = null;
            const itemIndex = state.items.findIndex(
              item => item.product.id === productId
            );

            if (itemIndex >= 0) {
              state.items[itemIndex].quantity = quantity;
            }
          });
        },

        clearCart: () => {
          set(state => {
            state.items = [];
            state.error = null;
          });
        },

        // Utility functions
        getItem: (productId: string) => {
          return get().items.find(item => item.product.id === productId);
        },

        getItemCount: () => {
          return get().items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          return get().items.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          );
        },

        isInCart: (productId: string) => {
          return get().items.some(item => item.product.id === productId);
        },

        // Loading states
        setLoading: (loading: boolean) => {
          set(state => {
            state.isLoading = loading;
          });
        },

        setError: (error: string | null) => {
          set(state => {
            state.error = error;
          });
        },
      })),
      {
        name: 'cart-storage',
        // Only persist cart items, not loading states
        partialize: state => ({
          items: state.items,
        }),
        // Rehydrate loading states
        onRehydrateStorage: () => state => {
          if (state) {
            state.isLoading = false;
            state.error = null;
          }
        },
      }
    ),
    {
      name: 'cart-store',
    }
  )
);

// Selectors for optimized component re-renders
export const useCartItems = () => useCartStore(state => state.items);
export const useCartItemCount = () =>
  useCartStore(state => state.getItemCount());
export const useCartTotalPrice = () =>
  useCartStore(state => state.getTotalPrice());
export const useCartLoading = () => useCartStore(state => state.isLoading);
export const useCartError = () => useCartStore(state => state.error);

// Action selectors - using individual selectors to prevent infinite loops
export const useAddItem = () => useCartStore(state => state.addItem);
export const useRemoveItem = () => useCartStore(state => state.removeItem);
export const useUpdateQuantity = () =>
  useCartStore(state => state.updateQuantity);
export const useClearCart = () => useCartStore(state => state.clearCart);
export const useGetItem = () => useCartStore(state => state.getItem);
export const useIsInCart = () => useCartStore(state => state.isInCart);
export const useSetCartLoading = () => useCartStore(state => state.setLoading);
export const useSetCartError = () => useCartStore(state => state.setError);
