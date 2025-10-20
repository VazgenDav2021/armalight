import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    anonymousKey: String, // для гостя
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // авторизованный пользователь
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
