import mongoose from "mongoose";

const guestOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    items: [{ type: Object, required: true }],
  },
  { timestamps: true }
);

export const GuestOrder = mongoose.model("GuestOrder", guestOrderSchema);
