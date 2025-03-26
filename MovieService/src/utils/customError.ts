export class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "CustomError";
    Error.captureStackTrace(this, CustomError);
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string = "Database operation failed") {
    super(message, 500);
    this.name = "DatabaseError";
  }
}
export class DuplicateError extends CustomError {
  constructor(message: string = "Resource already exists") {
    super(message, 409); // 409 Conflict
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Resource not found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends CustomError {
  constructor(message: string = "Validation failed") {
    super(message, 400);
    this.name = "ValidationError";
  }
}
