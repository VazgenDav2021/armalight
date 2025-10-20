// services/cartService.server.ts
import api from "@/app/utils/axios";
import { Cart } from "@/types";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface UpdateCartItemParams {
  productId: string;
  quantity: number;
}

/**
 * Серверная функция для получения корзины с подстановкой cookies
 */
export const getCartServer = async (
  cookies: ReadonlyRequestCookies
): Promise<Cart> => {
  const cookieHeader = cookies.toString(); // все куки из запроса
  const { data } = await api.get<Cart>("/cart", {
    headers: { cookie: cookieHeader },
    withCredentials: true,
  });
  return data;
};

/**
 * Серверная функция для обновления элемента корзины
 */
export const updateItemServer = async (
  cookies: ReadonlyRequestCookies,
  { productId, quantity }: UpdateCartItemParams
): Promise<Cart> => {
  const cookieHeader = cookies.toString();
  const { data } = await api.post<Cart>(
    "/cart/update-item",
    { productId, quantity },
    {
      headers: { cookie: cookieHeader },
      withCredentials: true,
    }
  );
  return data;
};
