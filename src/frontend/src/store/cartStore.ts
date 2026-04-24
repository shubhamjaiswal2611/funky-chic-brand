import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/index";

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (
    productId: string,
    variantSize?: string,
    variantColor?: string,
  ) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantSize?: string,
    variantColor?: string,
  ) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

function itemKey(
  productId: string,
  variantSize?: string,
  variantColor?: string,
) {
  return `${productId}__${variantSize ?? ""}__${variantColor ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (incoming) => {
        const qty = incoming.quantity ?? 1;
        set((state) => {
          const key = itemKey(
            incoming.productId,
            incoming.variantSize,
            incoming.variantColor,
          );
          const existing = state.items.find(
            (i) => itemKey(i.productId, i.variantSize, i.variantColor) === key,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.variantSize, i.variantColor) === key
                  ? { ...i, quantity: i.quantity + qty }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...incoming, quantity: qty }] };
        });
      },

      removeItem: (productId, variantSize, variantColor) => {
        const key = itemKey(productId, variantSize, variantColor);
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.variantSize, i.variantColor) !== key,
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantSize, variantColor) => {
        const key = itemKey(productId, variantSize, variantColor);
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(
              (i) =>
                itemKey(i.productId, i.variantSize, i.variantColor) !== key,
            ),
          }));
        } else {
          set((state) => ({
            items: state.items.map((i) =>
              itemKey(i.productId, i.variantSize, i.variantColor) === key
                ? { ...i, quantity }
                : i,
            ),
          }));
        }
      },

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: "zola-cart" },
  ),
);
