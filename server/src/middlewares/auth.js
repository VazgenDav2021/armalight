import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export default function auth(req, res, next) {
  const header = req.headers.authorization;
  let token = null;
  if (header && header.startsWith("Bearer ")) token = header.slice(7);
  if (!token && req.cookies && req.cookies.token) token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
