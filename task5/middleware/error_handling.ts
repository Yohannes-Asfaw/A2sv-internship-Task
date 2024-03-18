import { Request, Response, NextFunction } from 'express';
import { CustomError, AppError, BadRequestError, NotFoundError, InternalServerError } from './errors';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status((err as CustomError).status).json({ error: err.message });
  }

  if (err instanceof BadRequestError) {
    return res.status((err as CustomError).status).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status((err as CustomError).status).json({ error: err.message });
  }

  if (err instanceof InternalServerError) {
    return res.status((err as CustomError).status).json({ error: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default errorHandler;
