import mongoose from "mongoose";
import bcrypt from "bcrypt";

const cardSchema = new mongoose.Schema(
  {
    cardNumber: { type: String, required: true },
    expDate: { type: String, required: true },
    holderName: { type: String, required: true },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    address: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "GuestOrder" }],
    card: cardSchema,
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    resetToken: { type: String },
    resetTokenExp: { type: Date },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
