import api from "@/lib/axios";

export interface CartItem {
  productId: string;
  qty: number;
}

export interface AddToCartData {
  productId: string;
  qty?: number;
}

export interface UpdateCartItemData {
  productId: string;
  qty: number;
}

export interface Cart {
  _id: string;
  ownerKey: string;
  items: Array<{
    productId: {
      _id: string;
      title: string;
      price: number;
      image?: string;
    };
    qty: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const res = await api.get("/cart", { withCredentials: true });
    return res.data;
  },

  async addItem(data: AddToCartData): Promise<Cart> {
    const res = await api.post("/cart/add", data, { withCredentials: true });
    return res.data;
  },

  async updateItem(data: UpdateCartItemData): Promise<Cart> {
    const res = await api.put("/cart/update", data, { withCredentials: true });
    return res.data;
  },

  async removeItem(productId: string): Promise<Cart> {
    const res = await api.delete(`/cart/remove/${productId}`, {
      withCredentials: true,
    });
    return res.data;
  },

  async clearCart(): Promise<{ message: string }> {
    const res = await api.delete("/cart/clear", { withCredentials: true });
    return res.data;
  },
};
