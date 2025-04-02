import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../utils/userValidationSchema";

export const registerSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
    return;
  }

  req.body = value;
  next();
};

export const loginSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = loginSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
    return;
  }

  req.body = value;
  next();
};

export const updateUserSchemaValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = updateUserSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
    return;
  }

  req.body = value;
  next();
};
