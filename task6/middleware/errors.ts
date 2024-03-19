export interface CustomError extends Error {
    status: number;
  }
  
  export class AppError extends Error implements CustomError {
    status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.name = this.constructor.name;
      this.status = status;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class BadRequestError extends AppError {
    constructor(message: string) {
      super(message, 400);
    }
  }
  
  export class NotFoundError extends AppError {
    constructor(message: string) {
      super(message, 404);
    }
  }
  
  export class InternalServerError extends AppError {
    constructor(message: string) {
      super(message, 500);
    }
  }
  