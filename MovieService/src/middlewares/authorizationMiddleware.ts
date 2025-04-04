import { Request, Response, NextFunction } from "express";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const role = req.headers["x-user-role"];
  if (!role || role !== "admin") {
    res.status(403).json({ message: "Access denied: Admins only" });
    return;
  }
  next();
};
