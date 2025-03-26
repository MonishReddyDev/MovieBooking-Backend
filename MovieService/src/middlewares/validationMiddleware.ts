import { Request, Response, NextFunction } from "express";
import {
  movieSchema,
  screenSchema,
  showtimeSchema,
  showtimeUpdateSchema,
  theaterSchema,
} from "../utils/validationSchema";

export const validateMovie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = movieSchema.validate(req.body, {
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

export const validateShowTime = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = showtimeSchema.validate(req.body, {
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
  console.log(" req.body = value; passing to controller");
  next();
};

export const validateTheater = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = theaterSchema.validate(req.body, {
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
  console.log(" req.body = value; passing to controller");
  next();
};

export const validateScreen = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = screenSchema.validate(req.body, {
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
  console.log(" req.body = value; passing to controller");
  next();
};

export const validateshowtimeUpdateSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = showtimeUpdateSchema.validate(req.body, {
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
  console.log(" req.body = value; passing to controller");
  next();
};
