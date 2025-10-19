import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    ownerKey: { type: String, required: true, index: true },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
