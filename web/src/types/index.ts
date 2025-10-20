// -------------------------
// Оригинальные интерфейсы
// -------------------------

// Product
export interface Product {
  _id: string;
  name: {
    hy: string;
    en: string;
    ru: string;
  };
  description: {
    hy: string;
    en: string;
    ru: string;
  };
  specs: Record<string, any>;
  price: number;
  finalPrice: number; // динамически с дисконтом
  images: string[];
  sku: string;
  category: string;
}

// Category
export interface Category {
  _id: string;
  name: {
    hy: string;
    en: string;
    ru: string;
  };
}

// Cart
export interface CartItem {
  quantity: number;
  _id: string;
  price: number;
  images: string[];
  name: string;
  description: string;
  specs: any;
  finalPrice: number;
}

export interface Cart {
  _id: string;
  anonymousKey?: string;
  userId?: string;
  items: CartItem[];
  isActive: boolean;
}

// -------------------------
// Локализованные типы для фронта
// -------------------------

export type LocalizedProduct = Omit<
  Product,
  "name" | "description" | "specs"
> & {
  name: string;
  description: string;
  specs: Record<string, any>;
};

export type LocalizedCategory = Omit<Category, "name"> & {
  name: string;
};

// -------------------------
// Вспомогательные типы для services / utils
// -------------------------

export interface GetProductByNameParams {
  name: string;
  locale?: string;
  discount?: number;
}
