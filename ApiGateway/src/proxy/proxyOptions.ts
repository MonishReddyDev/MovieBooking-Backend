// src/proxy/options.ts
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

// Define the proxy options type explicitly
export interface ProxyOptions {
  proxyReqPathResolver: (req: Request) => string;
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction) => void;
}

// Shared proxy options
export const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: (req: Request): string => {
    return req.originalUrl.replace(/^\/v1/, "/api"); // Rewrite /v1 to /api
  },
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction): void => {
    logger.error(`Proxy error: ${err.message}`);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  },
};
