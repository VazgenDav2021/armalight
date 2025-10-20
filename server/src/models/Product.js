import mongoose from "mongoose";

const localizedString = {
  hy: { type: String, required: true },
  en: { type: String, required: true },
  ru: { type: String, required: true },
};

const productSchema = new mongoose.Schema({
  name: localizedString,
  description: localizedString,
  specs: {
    type: Map,
    of: {
      hy: { type: String, required: true },
      en: { type: String, required: true },
      ru: { type: String, required: true },
    },
    default: {},
  },
  price: { type: Number, required: true },
  images: [{ type: String }],
  sku: { type: String, unique: true, required: true },
  isBestSeller: { type: Boolean },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
