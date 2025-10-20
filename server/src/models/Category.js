import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    hy: { type: String, required: true },
    en: { type: String, required: true },
    ru: { type: String, required: true },
  },
});

export default mongoose.model("Category", categorySchema);
