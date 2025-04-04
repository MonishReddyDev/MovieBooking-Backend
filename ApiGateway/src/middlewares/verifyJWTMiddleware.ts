import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  email: string;
  password: string;
  name: string;
  token: string;
  role: string;
}

export const verifyJWTMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token is missing or invalid" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    // Step 2: Verify the token
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as DecodedToken;

    // Correct way to delete spoofed headers
    delete (req.headers as Record<string, any>)["x-user-id"];
    delete (req.headers as Record<string, any>)["x-user-role"];

    // Inject trusted headers for downstream services
    (req.headers as Record<string, any>)["x-user-id"] = decoded.id;
    (req.headers as Record<string, any>)["x-user-role"] = decoded.role;

    // Optionally: attach to req.user too
    (req as any).user = decoded;

    console.log(decoded);

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
