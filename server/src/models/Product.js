import mongoose from "mongoose";

const translationSchema = new mongoose.Schema(
  {
    hy: { type: String, required: true },
    ru: { type: String, required: true },
    en: { type: String, required: true },
  },
  { _id: false }
);

const technicalSchema = new mongoose.Schema(
  {
    power: { type: translationSchema, required: true },
    voltage: { type: translationSchema },
    colorTemperature: { type: translationSchema },
    lifetime: { type: translationSchema },
    material: { type: translationSchema },
    protection: { type: translationSchema },
    beamAngle: { type: translationSchema },
  },
  { _id: false }
);

const attributesSchema = new mongoose.Schema(
  {
    color: { type: String },
    base: { type: String },
    mountType: { type: String },
    shape: { type: String },
    installation: { type: String },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: translationSchema, required: true },
    description: { type: translationSchema },
    shortDetails: { type: translationSchema },
    price: { type: Number, required: true },
    image: [{ type: String }],
    technical: { type: technicalSchema },
    attributes: { type: attributesSchema },
    categoryId: { type: String, required: true },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
