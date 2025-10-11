import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, User } from "@/lib/types";
import { Locale } from "@/navigation";
import { ProductLocale } from "@/services/productService";

interface CartState {
  items: CartItem[];
  user: User | null;
  addItem: (p: ProductLocale<Locale>) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  setUser: (u: User) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      user: null,

      addItem: (p) => {
        const items = get().items;
        const found = items.find((i) => i._id === p._id);
        if (found) {
          return set({
            items: items.map((i) =>
              i._id === p._id ? { ...i, qty: i.qty + 1 } : i
            ),
          });
        }
        set({
          items: [
            ...items,
            {
              _id: p._id,
              code: p.code,
              name: p.name,
              price: p.price,
              image: p.image,
              qty: 1,
            },
          ],
        });
      },

      decreaseItem: (_id) => {
        const items = get().items;
        const found = items.find((i) => i._id === _id);
        if (!found) return;
        if (found.qty > 1) {
          set({
            items: items.map((i) =>
              i._id === _id ? { ...i, qty: i.qty - 1 } : i
            ),
          });
        } else {
          set({ items: items.filter((i) => i._id !== _id) });
        }
      },

      removeItem: (_id) =>
        set({ items: get().items.filter((i) => i._id !== _id) }),

      updateQty: (_id, qty) =>
        set({
          items: get().items.map((i) => (i._id === _id ? { ...i, qty } : i)),
        }),

      clear: () => set({ items: [] }),

      setUser: (u) => set({ user: u }),
    }),
    { name: "cart-store" }
  )
);
