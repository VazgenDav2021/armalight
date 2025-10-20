export const adminMiddleware = (req, res, next) => {
  const userRole = req.cookies?.role;
  if (userRole !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  next();
};
