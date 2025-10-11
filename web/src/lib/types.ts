// Основной тип User для сервера/клиента
export type User = {
  _id: string;
  firstName: string;
  lastName?: string;
  email?: string;
  password: string;
  orderHistory?: Order[];
  card?: Card;
  isVerified: boolean;
  verificationCode?: string;
  resetToken?: string;
  resetTokenExp?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  address?: string;
  city?: string;
};

// Карта пользователя
export type Card = {
  cardNumber: string;
  expDate: string;
  holderName: string;
};

// Для клиента: только нужные поля для PersonalData
export type UserPersonal = Pick<User, "firstName" | "lastName" | "email" | "phone" | "address" | "city">;

// Для клиента: только email для OrderHistory
export type UserOrders = Pick<User, "email">;

// Для клиента: только карта для BankCards
export type UserCard = Pick<User, "card">;

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
  isBestSeller:boolean;
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