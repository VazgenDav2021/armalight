import api from "@/lib/axios";
import { Locale } from "@/navigation";

export interface TechnicalField {
  hy: string;
  ru: string;
  en: string;
}

export interface Technical {
  power: TechnicalField;
  voltage?: TechnicalField;
  colorTemperature?: TechnicalField;
  lifetime?: TechnicalField;
  material?: TechnicalField;
  protection?: TechnicalField;
  beamAngle?: TechnicalField;
}

export interface Attributes {
  color?: string;
  base?: string;
  mountType?: string;
  shape?: string;
  installation?: string;
}

export interface Translation {
  hy: string;
  ru: string;
  en: string;
}

export interface ProductRaw {
  _id: string;
  code: string;
  name: Translation;
  description?: Translation;
  shortDetails?: Translation;
  price: number;
  image: string[];
  technical?: Technical;
  attributes?: Attributes;
  categoryId: string;
  isBestSeller?: boolean;
}

export type ProductLocale<TLocale extends string | undefined = undefined> =
  TLocale extends string
    ? Omit<ProductRaw, "name" | "description" | "shortDetails"> & {
        name: string;
        description?: string;
        shortDetails?: string;
      }
    : ProductRaw;

export interface GetProductsByCategoryParams {
  slug: string;
  page?: number;
  pageSize?: number;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  locale?: "hy" | "ru" | "en";
}

export interface ProductsByCategoryResponse<TLocale = undefined> {
  total: number;
  items: ProductLocale<Locale>[];
}

export const productService = {
  async createProduct(data: ProductRaw) {
    const res = await api.post("/products", data);
    return res.data;
  },

  async getAllProducts() {
    const res = await api.get("/products");
    return res.data as ProductRaw[];
  },

  async getProductById<TLocale extends Locale | undefined = undefined>(
    id: string,
    locale?: TLocale
  ): Promise<ProductLocale<TLocale>> {
    const query = locale ? `?locale=${locale}` : "";
    const res = await api.get(`/products/${id}${query}`);
    return res.data as ProductLocale<TLocale>;
  },

  async updateProduct(id: string, data: Partial<ProductRaw>) {
    const res = await api.patch(`/products/${id}`, data);
    return res.data as ProductRaw;
  },

  async deleteProduct(id: string) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },

  async getProductsByCategory<Locale>(
    params: GetProductsByCategoryParams
  ): Promise<ProductsByCategoryResponse<Locale>> {
    const { slug, page = 1, pageSize = 12, q, minPrice, maxPrice, locale } = params;
    const query = new URLSearchParams();

    query.append("page", page.toString());
    query.append("pageSize", pageSize.toString());
    if (q) query.append("q", q);
    if (minPrice !== undefined) query.append("min", minPrice.toString());
    if (maxPrice !== undefined) query.append("max", maxPrice.toString());
    if (locale) query.append("locale", locale);

    const res = await api.get<ProductsByCategoryResponse<Locale>>(
      `/categories/${slug}/products?${query.toString()}`
    );
    return res.data;
  },

  async getBestSellerProducts<TLocale extends "hy" | "en" | "ru">(locale?: TLocale) {
    const query = new URLSearchParams();
    if (locale) query.append("locale", locale);

    const res = await api.get<ProductsByCategoryResponse<TLocale>>(
      `/products/best-seller?${query.toString()}`
    );

    return res.data;
  },

};
