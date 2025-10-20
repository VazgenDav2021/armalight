import Cart from "../models/Cart.js";
import { v4 as uuidv4 } from "uuid";

export const cartMiddleware = async (req, res, next) => {
  try {
    let { cartId, anonymousKey } = req.cookies;

    if (!anonymousKey) {
      anonymousKey = uuidv4();
      res.cookie("anonymousKey", anonymousKey, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    let cart = null;

    if (cartId) {
      try {
        cart = await Cart.findById(cartId); // используем cartId из куки
      } catch (err) {
        console.log("Ошибка при поиске cart по cartId:", err);
        cart = null;
      }
    }

    if (!cart) {
      cart = await Cart.findOne({ anonymousKey });
      if (!cart) {
        cart = await Cart.create({ anonymousKey, items: [] });
      }

      res.cookie("cartId", cart._id.toString(), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    req.cart = cart;
    next();
  } catch (err) {
    console.error("Cart middleware error:", err);
    next(err);
  }
};
