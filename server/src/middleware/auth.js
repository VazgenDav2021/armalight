export const authMiddleware = (req, res, next) => {
  // const userRole = req.cookies?.role;
  // if (!userRole) return res.status(401).json({ message: "Not authorized" });
  next();
};
