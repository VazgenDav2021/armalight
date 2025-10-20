import api from "@/app/utils/axios";
import { Cart } from "@/types";

interface UpdateCartItemParams {
  productId: string;
  quantity: number;
}

export const cartService = {
  getCart: async (): Promise<Cart> => {
    const { data } = await api.get<Cart>("/cart", { withCredentials: true });
    return data;
  },

  updateItem: async ({
    productId,
    quantity,
  }: UpdateCartItemParams): Promise<Cart> => {
    const { data } = await api.post<Cart>(
      "/cart/update-item",
      {
        productId,
        quantity,
      },
      { withCredentials: true }
    );
    return data;
  },

  checkout: async (): Promise<{ message: string }> => {
    const { data } = await api.post("/cart/checkout");
    return data;
  },
};
