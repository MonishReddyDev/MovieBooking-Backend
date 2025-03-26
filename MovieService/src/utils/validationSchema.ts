// validateMovie.ts
import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 1 character",
    "string.max": "Title cannot exceed 255 characters",
    "any.required": "Title is required",
  }),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow(null, "")
    .optional()
    .messages({
      "string.max": "Description cannot exceed 1000 characters",
    }),

  releaseDate: Joi.date().required().messages({
    "date.base": "Release date must be a valid date",
    "any.required": "Release date is required",
  }),

  duration: Joi.number().integer().min(1).required().messages({
    "number.base": "Duration must be a number",
    "number.integer": "Duration must be an integer",
    "number.min": "Duration must be at least 1 minute",
    "any.required": "Duration is required",
  }),

  genres: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "array.base": "Genres must be an array",
    "array.min": "At least one genre is required",
    "any.required": "Genres are required",
  }),

  language: Joi.string().trim().required().messages({
    "string.base": "Language must be a string",
    "string.empty": "Language is required",
    "any.required": "Language is required",
  }),

  ratings: Joi.number().min(0).max(10).default(0.0).optional().messages({
    "number.base": "Ratings must be a number",
    "number.min": "Ratings cannot be less than 0",
    "number.max": "Ratings cannot exceed 10",
  }),

  posterUrl: Joi.string().uri().allow(null, "").optional().messages({
    "string.uri": "Poster URL must be a valid URL",
  }),
});

export const theaterSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required().messages({
    "string.empty": "Theater name cannot be empty",
    "string.min": "Theater name must be at least 1 character long",
    "string.max": "Theater name cannot exceed 255 characters",
    "any.required": "Theater name is required",
  }),
  location: Joi.string().trim().min(1).max(255).required().messages({
    "string.empty": "Location cannot be empty",
    "string.min": "Location must be at least 1 character long",
    "string.max": "Location cannot exceed 255 characters",
    "any.required": "Location is required",
  }),
  totalSeats: Joi.number().integer().min(1).required().messages({
    "number.base": "Total seats must be a number",
    "number.integer": "Total seats must be an integer",
    "number.min": "Total seats must be at least 1",
    "any.required": "Total seats is required",
  }),
});

// Define the ShowType enum values for validation
const showTypeValues = [
  "MORNING_SHOW",
  "MATINEE_SHOW",
  "FIRST_SHOW",
  "SECOND_SHOW",
  "BENEFIT_SHOW",
] as const;

// Joi validation schema for creating a Showtime
export const showtimeSchema = Joi.object({
  startTime: Joi.date()
    .iso() // Ensures ISO date format (e.g., "2025-03-27T10:00:00Z")
    .required()
    .messages({
      "date.base": "startTime must be a valid date",
      "date.iso": "startTime must be in ISO format",
      "any.required": "startTime is required",
    }),

  endTime: Joi.date()
    .iso()
    .greater(Joi.ref("startTime")) // Ensures endTime is after startTime
    .required()
    .messages({
      "date.base": "endTime must be a valid date",
      "date.iso": "endTime must be in ISO format",
      "date.greater": "endTime must be after startTime",
      "any.required": "endTime is required",
    }),

  availableSeats: Joi.number()
    .integer()
    .min(0) // Ensures no negative seats
    .required()
    .messages({
      "number.base": "availableSeats must be a number",
      "number.integer": "availableSeats must be an integer",
      "number.min": "availableSeats cannot be negative",
      "any.required": "availableSeats is required",
    }),

  showType: Joi.string()
    .valid(...showTypeValues) // Restricts to enum values
    .required()
    .messages({
      "string.base": "showType must be a string",
      "any.only":
        "showType must be one of: MORNING_SHOW, MATINEE_SHOW, FIRST_SHOW, SECOND_SHOW, BENEFIT_SHOW",
      "any.required": "showType is required",
    }),

  movieId: Joi.string()
    .uuid() // Validates as a UUID
    .required()
    .messages({
      "string.base": "movieId must be a string",
      "string.uuid": "movieId must be a valid UUID",
      "any.required": "movieId is required",
    }),

  theaterId: Joi.string().uuid().required().messages({
    "string.base": "theaterId must be a string",
    "string.uuid": "theaterId must be a valid UUID",
    "any.required": "theaterId is required",
  }),

  screenId: Joi.string().uuid().required().messages({
    "string.base": "screenId must be a string",
    "string.uuid": "screenId must be a valid UUID",
    "any.required": "screenId is required",
  }),
});

// Joi validation schema for creating a Screen
export const screenSchema = Joi.object({
  number: Joi.number()
    .integer()
    .min(1) // Ensures screen number is a positive integer (e.g., Screen 1)
    .required()
    .messages({
      "number.base": "number must be a number",
      "number.integer": "number must be an integer",
      "number.min": "number must be at least 1",
      "any.required": "number is required",
    }),

  capacity: Joi.number()
    .integer()
    .min(1) // Ensures capacity is a positive integer
    .required()
    .messages({
      "number.base": "capacity must be a number",
      "number.integer": "capacity must be an integer",
      "number.min": "capacity must be at least 1",
      "any.required": "capacity is required",
    }),

  theaterId: Joi.string()
    .uuid() // Validates as a UUID
    .required()
    .messages({
      "string.base": "theaterId must be a string",
      "string.uuid": "theaterId must be a valid UUID",
      "any.required": "theaterId is required",
    }),
});

// Joi validation schema for updating a Showtime
export const showtimeUpdateSchema = Joi.object({
  startTime: Joi.date()
    .iso() // Ensures ISO date format (e.g., "2025-03-27T10:00:00Z")
    .optional()
    .messages({
      "date.base": "startTime must be a valid date",
      "date.iso": "startTime must be in ISO format",
    }),

  endTime: Joi.date()
    .iso()
    .when("startTime", {
      is: Joi.exist(), // If startTime is provided, endTime must be after it
      then: Joi.date().greater(Joi.ref("startTime")),
      otherwise: Joi.date().optional(),
    })
    .messages({
      "date.base": "endTime must be a valid date",
      "date.iso": "endTime must be in ISO format",
      "date.greater": "endTime must be after startTime",
    }),

  availableSeats: Joi.number()
    .integer()
    .min(0) // Ensures no negative seats
    .optional()
    .messages({
      "number.base": "availableSeats must be a number",
      "number.integer": "availableSeats must be an integer",
      "number.min": "availableSeats cannot be negative",
    }),

  showType: Joi.string()
    .valid(...showTypeValues) // Restricts to enum values
    .optional()
    .messages({
      "string.base": "showType must be a string",
      "any.only":
        "showType must be one of: MORNING_SHOW, MATINEE_SHOW, FIRST_SHOW, SECOND_SHOW, BENEFIT_SHOW",
    }),

  movieId: Joi.string()
    .uuid() // Validates as a UUID
    .optional()
    .messages({
      "string.base": "movieId must be a string",
      "string.uuid": "movieId must be a valid UUID",
    }),

  theaterId: Joi.string().uuid().optional().messages({
    "string.base": "theaterId must be a string",
    "string.uuid": "theaterId must be a valid UUID",
  }),

  screenId: Joi.string().uuid().optional().messages({
    "string.base": "screenId must be a string",
    "string.uuid": "screenId must be a valid UUID",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for the update",
  });
