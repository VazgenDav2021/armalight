import api from "@/app/utils/axios";
import { Product, LocalizedProduct, GetProductByNameParams } from "@/types";

interface GetProductsByCategoryParams {
  categoryId?: string;
  discount?: number;
  locale?: string;
}

interface GetBestSellersParams {
  discount?: number;
  locale?: string;
}

interface CreateProductParams {
  payload: Partial<Product>;
}

interface UpdateProductParams {
  id: string;
  payload: Partial<Product>;
}

interface DeleteProductParams {
  id: string;
}

export const productService = {
  getProductsByCategory: async <
    T extends Product[] | LocalizedProduct[] = Product[]
  >({
    categoryId,
    discount,
    locale,
  }: GetProductsByCategoryParams): Promise<T> => {
    const { data } = await api.get<Product[]>(
      `/products/category/${categoryId}`,
      {
        params: { discount, locale },
      }
    );
    return data as T;
  },

  getBestSellers: async <T extends Product[] | LocalizedProduct[] = Product[]>({
    discount,
    locale,
  }: GetBestSellersParams = {}): Promise<T> => {
    const { data } = await api.get<Product[]>("/products/best-sellers", {
      params: { discount, locale },
    });
    return data as T;
  },

  createProduct: async ({ payload }: CreateProductParams): Promise<Product> => {
    const { data } = await api.post<Product>("/products", payload);
    return data;
  },

  updateProduct: async ({
    id,
    payload,
  }: UpdateProductParams): Promise<Product> => {
    const { data } = await api.put<Product>(`/products/${id}`, payload);
    return data;
  },

  deleteProduct: async ({
    id,
  }: DeleteProductParams): Promise<{ message: string }> => {
    const { data } = await api.delete<{ message: string }>(`/products/${id}`);
    return data;
  },

  getProductByName: async <T extends Product | LocalizedProduct = Product>({
    name,
    locale,
    discount,
  }: GetProductByNameParams): Promise<T> => {
    const { data } = await api.get<Product>("/products/by-name", {
      params: { name, locale, discount },
    });
    return data as T;
  },
};
