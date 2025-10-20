import Product from "../models/Product.js";
import { computeFinalPrice } from "../utils/computeFinalPrice.js";

const localizeProduct = (product, locale = "hy") => {
  if (!locale) return product;

  const { name, description, specs, ...rest } = product;

  const localizedSpecs = {};

  if (specs instanceof Map) {
    specs.forEach((value, key) => {
      localizedSpecs[key] = value[locale] ?? value;
    });
  } else if (typeof specs === "object" && specs !== null) {
    Object.entries(specs).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        localizedSpecs[key] = value[locale] ?? value;
      } else {
        localizedSpecs[key] = value;
      }
    });
  }

  return {
    ...rest,
    name: name[locale] ?? name,
    description: description[locale] ?? description,
    specs: localizedSpecs,
  };
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const discount = req.cookies?.discount;
    const locale = req.query.locale;

    const products = await Product.find({ category: categoryId });

    const updated = products.map((p) =>
      localizeProduct(
        { ...p.toObject(), finalPrice: computeFinalPrice(p, discount) },
        locale
      )
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const discount = req.cookies?.discount || 0;
    const locale = req.query.locale;

    const products = await Product.find({ isBestSeller: true });

    const updated = products.map((p) =>
      localizeProduct(
        { ...p.toObject(), finalPrice: computeFinalPrice(p, discount) },
        locale
      )
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching best sellers" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const { name } = req.query; // ищем по ?name=Название
    const locale = req.query.locale || "hy"; // локаль
    const discount = req.cookies?.discount || 0;

    if (!name)
      return res.status(400).json({ message: "Name query is required" });

    const decodedName = decodeURIComponent(name); // декодируем URL
    const filter = {};
    filter[`name.${locale}`] = { $regex: `^${decodedName}$`, $options: "i" };

    const product = await Product.findOne(filter);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const localizedProduct = localizeProduct(
      {
        ...product.toObject(),
        finalPrice: computeFinalPrice(product, discount),
      },
      locale
    );

    res.json(localizedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product by name" });
  }
};
