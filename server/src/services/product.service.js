import { Product } from "../models/Product.js";

function localizeField(field, locale) {
  if (!field || typeof field !== "object") return field;
  if (field[locale]) return field[locale];
  const localized = {};
  for (const key in field) {
    localized[key] = localizeField(field[key], locale);
  }
  return localized;
}

function applyDiscount(price, discountPercent) {
  if (!discountPercent) return price;
  return +(price * (1 - discountPercent / 100)).toFixed(2);
}

export const productService = {
  async createProduct(data) {
    const product = new Product(data);
    return product.save();
  },

  async getAllProducts(filter = {}) {
    return Product.find(filter);
  },

  async getProductById(id, locale, discountPercent) {
    const product = await Product.findById(id).lean();
    if (!product) return null;

    const localized = locale
      ? {
          ...product,
          name: localizeField(product.name, locale),
          description: localizeField(product.description, locale),
          shortDetails: localizeField(product.shortDetails, locale),
          technical: localizeField(product.technical, locale),
        }
      : product;

    return {
      ...localized,
      priceWithDiscount: applyDiscount(product.price, discountPercent),
    };
  },

  async updateProduct(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteProduct(id) {
    return Product.findByIdAndDelete(id);
  },

  async getProductById(id, locale, discountPercent) {
    const product = await Product.findById(id).lean();
    if (!product) return null;

    const localized = locale
      ? {
          ...product,
          name: localizeField(product.name, locale),
          description: localizeField(product.description, locale),
          shortDetails: localizeField(product.shortDetails, locale),
          technical: localizeField(product.technical, locale),
        }
      : product;

    return {
      ...localized,
      priceWithDiscount: applyDiscount(product.price, discountPercent),
    };
  },

  async getProductsByCategory({
    slug,
    page = 1,
    pageSize = 12,
    q,
    minPrice,
    maxPrice,
    locale,
    discountPercent=0,
  }) {
    const filter = { categoryId: slug };
    if (q && locale) filter[`name.${locale}`] = { $regex: q, $options: "i" };
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    const total = await Product.countDocuments(filter);
    const itemsRaw = await Product.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const items = itemsRaw.map((p) => {
      const localized = locale
        ? {
            ...p,
            name: localizeField(p.name, locale),
            description: localizeField(p.description, locale),
            shortDetails: localizeField(p.shortDetails, locale),
            technical: localizeField(p.technical, locale),
          }
        : p;

      return {
        ...localized,
        priceWithDiscount: applyDiscount(p.price, discountPercent),
      };
    });

    return { total, items };
  },

  async getBestSellerProducts({ locale, limit = 12 }) {
    const query = { isBestSeller: true };
    const products = await Product.find(query).limit(limit).lean();
    return products.map((p) =>
      locale
        ? {
            ...p,
            id: p._id.toString(),
            name: localizeField(p.name, locale),
            description: localizeField(p.description, locale),
            shortDetails: localizeField(p.shortDetails, locale),
            technical: localizeField(p.technical, locale),
            priceWithDiscount: applyDiscount(p.price, 0),
          }
        : { ...p, id: p._id.toString() }
    );
  },
};
