import Cart from "../models/Cart.js";
import { computeFinalPrice } from "../utils/computeFinalPrice.js";

const localizeProduct = (product, locale = "hy", discount = 0) => {
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
    finalPrice: computeFinalPrice(product, discount),
  };
};

// Получение корзины с локализованными товарами
export const getCart = async (req, res) => {
  try {
    const discount = req.cookies?.discount || 0;
    const locale = req.query.locale || "hy";

    const cart = await Cart.findById(req.cart._id).populate({
      path: "items.productId",
      model: "Product",
      select: "name description specs price images _id",
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const localizedItems = cart.items.map((item) => ({
      quantity: item.quantity,
      sku: item.sku,
      ...localizeProduct(item.productId.toObject(), locale, discount),
    }));

    res.json({ ...cart.toObject(), items: localizedItems });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Обновление количества товара в корзине с локализацией
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const discount = req.cookies?.discount || 0;
    const locale = req.query.locale || "hy";

    const cart = await Cart.findById(req.cart._id).populate({
      path: "items.productId",
      model: "Product",
      select: "name description specs price images _id",
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const existingIndex = cart.items.findIndex(
      (i) => i.productId._id.toString() === productId
    );

    if (quantity === 0) {
      if (existingIndex !== -1) cart.items.splice(existingIndex, 1);
    } else {
      if (existingIndex !== -1) {
        cart.items[existingIndex].quantity = quantity;
      } else {
        const product = await Product.findById(productId);
        if (!product)
          return res.status(404).json({ message: "Product not found" });

        cart.items.push({ productId: product._id, quantity });
      }
    }

    await cart.save();

    // Поправляем локализацию после сохранения
    const localizedItems = cart.items.map((item) => ({
      quantity: item.quantity,
      sku: item.sku,
      ...localizeProduct(item.productId.toObject(), locale, discount),
    }));

    res.json({ ...cart.toObject(), items: localizedItems });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Error updating cart" });
  }
};

// Добавление товара
export const addItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = req.cart;

  const existing = cart.items.find((i) => i.productId.toString() === productId);
  if (existing) {
    existing.quantity += quantity || 1;
  } else {
    cart.items.push({ productId, quantity: quantity || 1 });
  }

  await cart.save();
  res.json(cart);
};

// Удаление товара
export const removeItem = async (req, res) => {
  const { productId } = req.body;
  const cart = req.cart;
  cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
};

// Checkout
export const checkout = async (req, res) => {
  const cart = req.cart;
  if (!cart.items.length)
    return res.status(400).json({ message: "Cart empty" });

  cart.isActive = false;
  await cart.save();
  res.clearCookie("cartId");
  res.json({ message: "Order submitted" });
};

// Теперь просто возвращаем корзину, созданную middleware
export const getOrCreateCart = async (req, res) => {
  res.json(req.cart);
};
