import Joi from "joi";

// Base schema for common fields
const userBaseSchema = {
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validates email format, no TLD restriction
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password cannot exceed 20 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  name: Joi.string().min(1).max(255).optional().allow(null).messages({
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name cannot exceed 255 characters",
  }),
  role: Joi.string()
    .valid("user", "admin") // Restrict to specific roles
    .default("user")
    .messages({
      "any.only": 'Role must be either "user" or "admin"',
    }),
};

// Register schema: email is required, password and name are optional
export const registerSchema = Joi.object({
  email: userBaseSchema.email,
  password: userBaseSchema.password,
  name: userBaseSchema.name,
  role: userBaseSchema.role,
});

// Login schema: email is required, password is optional (for OAuth cases)
export const loginSchema = Joi.object({
  email: userBaseSchema.email,
  password: userBaseSchema.password,
});

// Update schema: all fields are optional, but validated if provided
export const updateUserSchema = Joi.object({
  email: userBaseSchema.email.optional(),
  password: userBaseSchema.password.optional(),
  name: userBaseSchema.name.optional(),
  role: userBaseSchema.role.optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
