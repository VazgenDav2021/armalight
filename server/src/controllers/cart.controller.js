import { Cart } from "../models/Cart.js";
import { Product } from "../models/Product.js";

export const cartController = {
  async getCart(req, res) {
    const { ownerKey } = req;
    if (!ownerKey)
      return res.status(400).json({ message: "Missing identifier" });

    const cart = await Cart.findOne({ ownerKey }).populate("items.productId");
    if (!cart) return res.json({ items: [] });

    res.json(cart);
  },

  async addItem(req, res) {
    const { ownerKey } = req;
    const { productId, qty = 1 } = req.body;

    if (!ownerKey)
      return res.status(400).json({ message: "Missing identifier" });

    let cart = await Cart.findOne({ ownerKey });
    if (!cart) cart = new Cart({ ownerKey, items: [] });

    const existingItem = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.json(populated);
  },

  async updateQty(req, res) {
    const { ownerKey } = req;
    const { productId, qty } = req.body;

    const cart = await Cart.findOne({ ownerKey });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await cart.save();
    res.json(cart);
  },

  async removeItem(req, res) {
    const { ownerKey } = req;
    const { productId } = req.params;

    const cart = await Cart.findOne({ ownerKey });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    await cart.save();
    res.json(cart);
  },

  async clearCart(req, res) {
    const { ownerKey } = req;
    await Cart.findOneAndDelete({ ownerKey });
    res.json({ message: "Cart cleared" });
  },
};
