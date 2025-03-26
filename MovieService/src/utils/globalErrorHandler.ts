import { NextFunction, Response, Request } from "express";
import { ResponseHandler } from "./responseHandler";
import { CustomError } from "./customError";


// Global error handler
export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof CustomError) {
    ResponseHandler.error(res, error);
    return;
  }

  // Optional: Log the error for debugging
  console.error("Global error:", error);
  ResponseHandler.error(res, new Error("Internal Server Error"));
  return;
}
