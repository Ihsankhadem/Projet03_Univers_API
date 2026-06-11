// errors/AppError.ts
export class AppError extends Error {
  statusCode: number; // HTTP status code

  constructor(message: string, statusCode = 500) {
    // Default to 500 if not provided
    super(message);
    this.statusCode = statusCode; // Set the status code
    this.name = "AppError"; // Set the error name for easier identification
  }
}
