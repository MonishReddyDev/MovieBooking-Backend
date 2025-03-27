import { NextFunction, Response, Request } from "express";
import { ResponseHandler } from "./responseHandler";
import { CustomError } from "./customError";
import logger from "./logger";

// Global error handler
export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof CustomError) {
    logger.error(
      `Error [${error.name}] with status ${error.status}: ${error.message}`,
      {
        stack: error.stack,
        route: req.originalUrl,
        method: req.method,
        // user: req.user ? req.user.id : "Guest", // Assuming you have user info attached
      }
    );
    ResponseHandler.error(res, error);
    return;
  }

  // Optional: Log the error for debugging
  console.error("Global error:", error);
  ResponseHandler.error(res, new Error("Internal Server Error"));
  return;
}
