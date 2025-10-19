import { v4 as uuidv4 } from "uuid";

export const identifyUser = (req, res, next) => {
  const token = req.cookies?.token;
  let anonymousKey = req.cookies?.anonymousKey;

  if (!token && !anonymousKey) {
    anonymousKey = uuidv4();
    res.cookie("anonymousKey", anonymousKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 дней
    });
  }

  req.ownerKey = token || anonymousKey;
  next();
};
