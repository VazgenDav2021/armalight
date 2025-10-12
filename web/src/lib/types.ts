export type Payment = {
  cardNumber: string;
  expDate: string;
  holderName: string;
};

export type OrderRef = {
  id: string;
  total: number;
  createdAt?: string;
  items: {
    productId: string;
    qty: number;
    price: number;
  }[];
}[];

export type PersonalData = {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
};

export type User = {
  _id: string;
  personalData: PersonalData;
  orders?: OrderRef;
  payment?: Payment;
  password: string;
  verificationCode?: string | null;
  resetToken?: string | null;
  resetTokenExp?: string | Date | null;
  createdAt?: string;
  updatedAt?: string;
};

// Карта пользователя
export type Card = {
  cardNumber: string;
  expDate: string;
  holderName: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  shortDetails: string;
  price: number;
  image: string;
  technical?: Record<string, string | number>;
  attributes?: Record<string, string | number>;
  categoryId: string;
  isBestSeller: boolean;
};

export type Order = {
  id: string;
  userEmail: string;
  items: Array<{ productId: string; qty: number; price: number }>;
  total: number;
  createdAt: string;
};

export type CartItem = {
  _id: string;
  code: string;
  name: string;
  price: number;
  image: string[];
  qty: number;
};
